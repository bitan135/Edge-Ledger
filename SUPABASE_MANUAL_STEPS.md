# Supabase Manual SQL Steps

Run these SQL statements in your Supabase Dashboard → SQL Editor in this exact order:

## Step 1: Psychology Columns
```sql
-- Migration: Add psychology tracking columns to trades table
-- Date: 2026-03-17
-- Purpose: Track trader psychology per trade for pattern analysis.

ALTER TABLE public.trades
ADD COLUMN IF NOT EXISTS emotional_state TEXT 
  CHECK (emotional_state IN ('Focused', 'Fear', 'Greed', 'FOMO', 'Neutral', 'Revenge'));

ALTER TABLE public.trades
ADD COLUMN IF NOT EXISTS discipline_score INTEGER 
  CHECK (discipline_score >= 1 AND discipline_score <= 5);

ALTER TABLE public.trades
ADD COLUMN IF NOT EXISTS rule_adherence BOOLEAN DEFAULT TRUE;

-- Index for psychology analytics queries
CREATE INDEX IF NOT EXISTS idx_trades_emotional_state ON public.trades(emotional_state);
CREATE INDEX IF NOT EXISTS idx_trades_rule_adherence ON public.trades(rule_adherence);
```

## Step 2: Delete User RPC
```sql
-- Migration: Add delete_user RPC function
-- Required for account self-deletion from the client

CREATE OR REPLACE FUNCTION public.delete_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Delete all user data (cascade handles trades, strategies, profiles)
  DELETE FROM auth.users WHERE id = auth.uid();
END;
$$;

-- Grant execution rights to authenticated users only
REVOKE ALL ON FUNCTION public.delete_user() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.delete_user() TO authenticated;
```

## Verification Queries
```sql
-- Confirm columns exist:
SELECT column_name, data_type FROM information_schema.columns 
WHERE table_name = 'trades' 
AND column_name IN ('trade_date', 'emotional_state', 'discipline_score', 'rule_adherence');

-- Confirm RPC exists:
SELECT routine_name FROM information_schema.routines 
WHERE routine_name = 'delete_user';

## Step 3: Affiliate System
```sql
-- Migration: Affiliate System
-- Date: 2026-03-19

CREATE TABLE IF NOT EXISTS public.affiliates (
  id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  referral_code TEXT UNIQUE NOT NULL,
  total_referrals INTEGER DEFAULT 0,
  total_earnings_usd DECIMAL(12, 2) DEFAULT 0.00,
  withdrawal_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.referrals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  affiliate_id UUID NOT NULL REFERENCES public.affiliates(id) ON DELETE CASCADE,
  referred_user_id UUID UNIQUE REFERENCES public.profiles(id) ON DELETE SET NULL,
  status TEXT CHECK (status IN ('pending', 'completed', 'cancelled')) DEFAULT 'pending',
  commission_amount_usd DECIMAL(12, 2) DEFAULT 0.00,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS referred_by UUID REFERENCES public.affiliates(id);

ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referrals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own affiliate profile" ON public.affiliates FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update their own affiliate profile" ON public.affiliates FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Affiliates can view their own referrals" ON public.referrals FOR SELECT USING (auth.uid() = affiliate_id);

GRANT ALL ON public.affiliates TO service_role;
GRANT ALL ON public.referrals TO service_role;

CREATE INDEX IF NOT EXISTS idx_affiliates_referral_code ON public.affiliates(referral_code);
CREATE INDEX IF NOT EXISTS idx_profiles_referred_by ON public.profiles(referred_by);
```
```
