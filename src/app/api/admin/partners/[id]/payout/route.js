import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminSession } from '@/lib/admin-auth';

function getSb() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// POST: Mark payout as completed for a partner
export async function POST(req, { params }) {
  try {
    const store = await cookies();
    const session = await getAdminSession(store);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const { amount, note } = await req.json();

    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      return NextResponse.json({ error: 'Valid payout amount required' }, { status: 400 });
    }

    const sb = getSb();
    const payoutAmount = parseFloat(parseFloat(amount).toFixed(2));

    // Mark all unpaid referral commissions as paid up to this amount
    const { data: unpaidReferrals } = await sb
      .from('affiliate_referrals')
      .select('id, commission_earned')
      .eq('affiliate_id', id)
      .eq('commission_paid', false)
      .order('created_at', { ascending: true });

    if (!unpaidReferrals || unpaidReferrals.length === 0) {
      return NextResponse.json({ error: 'No unpaid commissions found' }, { status: 400 });
    }

    let remaining = payoutAmount;
    const markedIds = [];

    for (const ref of unpaidReferrals) {
      if (remaining <= 0) break;
      const earned = Number(ref.commission_earned) || 0;
      if (earned <= remaining) {
        markedIds.push(ref.id);
        remaining -= earned;
      }
    }

    if (markedIds.length > 0) {
      await sb
        .from('affiliate_referrals')
        .update({ commission_paid: true })
        .in('id', markedIds);
    }

    // Record the payout event
    await sb.from('affiliate_payouts').insert({
      affiliate_id: id,
      amount: payoutAmount,
      note: note || null,
      paid_at: new Date().toISOString(),
      paid_by: session.email,
    });

    console.log(`[ADMIN] Payout recorded: partner=${id} amount=$${payoutAmount} refs_marked=${markedIds.length}`);

    return NextResponse.json({
      success: true,
      amount: payoutAmount,
      referralsMarked: markedIds.length,
    });
  } catch (err) {
    console.error('Admin payout error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
