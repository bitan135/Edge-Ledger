import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getAdminSession } from '@/lib/admin-auth';

function getSb() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);
}

// PATCH: Update partner (status, commission_rate, discount_rate)
export async function PATCH(req, { params }) {
  try {
    const store = await cookies();
    const session = await getAdminSession(store);
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;
    const body = await req.json();
    const sb = getSb();

    const updates = {};
    if (body.status !== undefined && ['active', 'inactive'].includes(body.status)) {
      updates.status = body.status;
    }
    if (body.commissionRate !== undefined) {
      const rate = parseFloat(body.commissionRate);
      if (isNaN(rate) || rate < 0 || rate > 1) {
        return NextResponse.json({ error: 'Commission rate must be between 0 and 1' }, { status: 400 });
      }
      updates.commission_rate = rate;
    }
    if (body.discountRate !== undefined) {
      const rate = parseFloat(body.discountRate);
      if (isNaN(rate) || rate < 0 || rate > 1) {
        return NextResponse.json({ error: 'Discount rate must be between 0 and 1' }, { status: 400 });
      }
      updates.discount_rate = rate;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: 'No valid fields to update' }, { status: 400 });
    }

    const { error } = await sb.from('affiliates').update(updates).eq('id', id);
    if (error) throw error;

    console.log(`[ADMIN] Updated partner ${id}:`, updates);
    return NextResponse.json({ success: true, updates });
  } catch (err) {
    console.error('Admin update partner error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
