import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, channelUrl, platform, audienceSize, message } = body;
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email required' }, { status: 400 });
    }

    const sb = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    await sb.from('affiliate_applications').insert({
      name,
      email: email.toLowerCase().trim(),
      channel_url: channelUrl,
      platform,
      audience_size: audienceSize,
      message,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Affiliate apply error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
