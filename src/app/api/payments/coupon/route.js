import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Code is required' }, { status: 400 });
    }

    const normalizedCoupon = code.toUpperCase().trim().replace(/[^A-Z0-9_-]/g, '').slice(0, 32);

    if (normalizedCoupon === 'SMC2026') {
      return NextResponse.json({ valid: true, discountRate: 0.20 });
    }

    const supabase = await createClient(); // Validating using RLS bypass via admin not needed if public table or just check standard access
    // Wait, affiliates table might be protected! We should query it using an admin client to just check the coupon existence securely without leaking logic.
    // However, we can construct the query in server side.
    const { createClient: createAdminClient } = await import('@supabase/supabase-js');
    const adminSb = createAdminClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: affiliate, error } = await adminSb
      .from('affiliates')
      .select('discount_rate')
      .eq('coupon_code', normalizedCoupon)
      .eq('status', 'active')
      .single();

    if (affiliate) {
      return NextResponse.json({ 
        valid: true, 
        discountRate: affiliate.discount_rate || 0.10 
      });
    }

    return NextResponse.json({ valid: false, error: 'Invalid or expired coupon code.' }, { status: 404 });
  } catch (err) {
    console.error('Coupon validation error:', err);
    return NextResponse.json({ valid: false, error: 'Server error parsing coupon.' }, { status: 500 });
  }
}
