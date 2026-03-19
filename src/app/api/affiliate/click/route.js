import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { code } = await req.json();
    if (!code) return NextResponse.json({ ok: false });

    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data: aff } = await sb
      .from('affiliates')
      .select('id')
      .eq('coupon_code', code.toUpperCase())
      .eq('status', 'active')
      .single();

    if (!aff) return NextResponse.json({ ok: false });

    await sb.from('affiliate_clicks').insert({
      affiliate_id: aff.id,
      coupon_code: code.toUpperCase(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false });
  }
}
