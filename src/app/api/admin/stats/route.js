import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminSession } from '@/lib/admin-auth';

function getSb() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// GET: Overview stats for affiliate program
export async function GET() {
  try {
    const store = await cookies();
    const session = await getAdminSession(store);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const sb = getSb();

    // Total partners
    const { count: totalPartners } = await sb
      .from('affiliates')
      .select('*', { count: 'exact', head: true });

    const { count: activePartners } = await sb
      .from('affiliates')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'active');

    // All referrals
    const { data: allReferrals } = await sb
      .from('affiliate_referrals')
      .select('commission_earned, commission_paid, plan_purchased');

    const refs = allReferrals || [];
    const totalCommissions = refs.reduce((s, r) => s + (Number(r.commission_earned) || 0), 0);
    const paidCommissions = refs.filter(r => r.commission_paid).reduce((s, r) => s + (Number(r.commission_earned) || 0), 0);
    const totalConversions = refs.filter(r => r.plan_purchased).length;

    // Total clicks
    const { count: totalClicks } = await sb
      .from('affiliate_clicks')
      .select('*', { count: 'exact', head: true });

    // Total payouts
    const { data: payouts } = await sb
      .from('affiliate_payouts')
      .select('amount, paid_at, affiliate_id')
      .order('paid_at', { ascending: false })
      .limit(20);

    // Pending applications
    const { count: pendingApplications } = await sb
      .from('affiliate_applications')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      stats: {
        totalPartners: totalPartners || 0,
        activePartners: activePartners || 0,
        totalClicks: totalClicks || 0,
        totalSignups: refs.length,
        totalConversions,
        totalCommissions: parseFloat(totalCommissions.toFixed(2)),
        paidCommissions: parseFloat(paidCommissions.toFixed(2)),
        owedCommissions: parseFloat((totalCommissions - paidCommissions).toFixed(2)),
        pendingApplications: pendingApplications || 0,
      },
      recentPayouts: payouts || [],
    });
  } catch (err) {
    console.error('Admin stats error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
