-- SMC Journal Affiliate System v2
-- Correct architecture: external partner accounts, not app users

-- Drop old wrong tables if they exist
DROP TABLE IF EXISTS public.referrals CASCADE;
DROP TABLE IF EXISTS public.affiliates CASCADE;

-- Remove wrong column from profiles
ALTER TABLE public.profiles DROP COLUMN IF EXISTS referred_by;

-- 1. Affiliates table — external partner accounts (NOT tied to auth.users)
CREATE TABLE IF NOT EXISTS public.affiliates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  coupon_code TEXT UNIQUE NOT NULL,
  commission_rate NUMERIC DEFAULT 0.10,
  discount_rate NUMERIC DEFAULT 0.10,
  channel_name TEXT,
  channel_url TEXT,
  platform TEXT DEFAULT 'YouTube',
  status TEXT DEFAULT 'active'
    CHECK (status IN ('active', 'paused', 'pending')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 2. Affiliate referrals — tracks conversions from coupon codes
CREATE TABLE IF NOT EXISTS public.affiliate_referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_id UUID REFERENCES public.affiliates(id) ON DELETE CASCADE,
  coupon_code TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  signup_date TIMESTAMPTZ DEFAULT now(),
  plan_purchased TEXT,
  revenue_amount NUMERIC DEFAULT 0,
  commission_earned NUMERIC DEFAULT 0,
  commission_paid BOOLEAN DEFAULT FALSE,
  payment_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Click tracking
CREATE TABLE IF NOT EXISTS public.affiliate_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate_id UUID REFERENCES public.affiliates(id) ON DELETE CASCADE,
  coupon_code TEXT NOT NULL,
  clicked_at TIMESTAMPTZ DEFAULT now(),
  converted BOOLEAN DEFAULT FALSE
);

-- 4. Applications from landing page form
CREATE TABLE IF NOT EXISTS public.affiliate_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  channel_url TEXT,
  platform TEXT,
  audience_size TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 5. Store referral tracking on profiles
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS referral_code TEXT,
  ADD COLUMN IF NOT EXISTS referral_date TIMESTAMPTZ;

-- 6. RLS — all affiliate tables are service-role only (no public access)
ALTER TABLE public.affiliates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.affiliate_applications ENABLE ROW LEVEL SECURITY;

-- 7. Indexes
CREATE INDEX IF NOT EXISTS idx_aff_referrals_coupon ON public.affiliate_referrals(coupon_code);
CREATE INDEX IF NOT EXISTS idx_aff_clicks_coupon ON public.affiliate_clicks(coupon_code);
CREATE INDEX IF NOT EXISTS idx_aff_code ON public.affiliates(coupon_code);
CREATE INDEX IF NOT EXISTS idx_profiles_ref_code ON public.profiles(referral_code);

-- 8. Service role grants
GRANT ALL ON public.affiliates TO service_role;
GRANT ALL ON public.affiliate_referrals TO service_role;
GRANT ALL ON public.affiliate_clicks TO service_role;
GRANT ALL ON public.affiliate_applications TO service_role;
