import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminSession } from '@/lib/admin-auth';
import bcrypt from 'bcryptjs';

function getSb() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// GET: List all partners
export async function GET() {
  try {
    const store = await cookies();
    const session = await getAdminSession(store);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const sb = getSb();
    const { data: partners, error } = await sb
      .from('affiliates')
      .select('id, name, email, coupon_code, commission_rate, discount_rate, status, channel_name, channel_url, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;

    // For each partner, get referral + click stats
    const enriched = await Promise.all((partners || []).map(async (p) => {
      const { data: referrals } = await sb
        .from('affiliate_referrals')
        .select('commission_earned, commission_paid, plan_purchased')
        .eq('affiliate_id', p.id);

      const { count: clicks } = await sb
        .from('affiliate_clicks')
        .select('*', { count: 'exact', head: true })
        .eq('affiliate_id', p.id);

      const refs = referrals || [];
      const totalCommission = refs.reduce((s, r) => s + (Number(r.commission_earned) || 0), 0);
      const paidCommission = refs.filter(r => r.commission_paid).reduce((s, r) => s + (Number(r.commission_earned) || 0), 0);
      const conversions = refs.filter(r => r.plan_purchased).length;

      return {
        ...p,
        stats: {
          clicks: clicks || 0,
          signups: refs.length,
          conversions,
          totalCommission: parseFloat(totalCommission.toFixed(2)),
          paidCommission: parseFloat(paidCommission.toFixed(2)),
          pendingCommission: parseFloat((totalCommission - paidCommission).toFixed(2)),
        }
      };
    }));

    return NextResponse.json({ partners: enriched });
  } catch (err) {
    console.error('Admin partners list error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

// POST: Create new partner
export async function POST(req) {
  try {
    const store = await cookies();
    const session = await getAdminSession(store);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { name, email, couponCode, commissionRate, discountRate, channelName, channelUrl } = await req.json();

    if (!name || !email || !couponCode || typeof couponCode !== 'string') {
      return NextResponse.json({ error: 'Name, email, and a valid coupon code are required' }, { status: 400 });
    }

    const normalizedCoupon = couponCode.toUpperCase().trim().replace(/[^A-Z0-9_-]/g, '').slice(0, 32);

    // Generate a secure random password
    const rawPassword = Array.from(crypto.getRandomValues(new Uint8Array(12)))
      .map(b => b.toString(36).padStart(2, '0'))
      .join('')
      .slice(0, 16);

    const passwordHash = await bcrypt.hash(rawPassword, 12);

    const sb = getSb();

    // Check for duplicate email or coupon
    const { data: existingEmail } = await sb.from('affiliates').select('id').eq('email', email.toLowerCase().trim()).limit(1);
    if (existingEmail && existingEmail.length > 0) {
      return NextResponse.json({ error: 'Email already registered' }, { status: 409 });
    }

    const { data: existingCode } = await sb.from('affiliates').select('id').eq('coupon_code', normalizedCoupon).limit(1);
    if (existingCode && existingCode.length > 0) {
      return NextResponse.json({ error: 'Coupon code already in use' }, { status: 409 });
    }

    const { data: newPartner, error } = await sb
      .from('affiliates')
      .insert({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password_hash: passwordHash,
        coupon_code: normalizedCoupon,
        commission_rate: (commissionRate !== undefined && commissionRate !== '') ? parseFloat(commissionRate) : 0.10,
        discount_rate: (discountRate !== undefined && discountRate !== '') ? parseFloat(discountRate) : 0.10,
        status: 'active',
        channel_name: channelName || null,
        channel_url: channelUrl || null,
      })
      .select('id, name, email, coupon_code')
      .single();

    if (error) throw error;

    console.log(`[ADMIN] Created partner: ${newPartner.email} (${newPartner.id})`);

    return NextResponse.json({
      success: true,
      partner: newPartner,
      credentials: {
        email: newPartner.email,
        password: rawPassword,
        loginUrl: 'https://smcjournal.app/affiliate/login',
      }
    });
  } catch (err) {
    console.error('Admin create partner error:', err);
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
