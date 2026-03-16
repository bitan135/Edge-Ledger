-- Normalize plans and ensure all users have a free plan
-- Renaming pro_monthly to pro for cleaner ID matching

-- 1. Update existing subscriptions
UPDATE public.subscriptions 
SET plan_id = 'pro' 
WHERE plan_id = 'pro_monthly';

-- 2. Update existing crypto payments
UPDATE public.crypto_payments 
SET plan_id = 'pro' 
WHERE plan_id = 'pro_monthly';

-- 3. Ensure all users have a subscription record (defaulting to free)
INSERT INTO public.subscriptions (user_id, plan_id)
SELECT id, 'free' FROM auth.users
ON CONFLICT (user_id) DO NOTHING;

-- 4. Double check any 'free' plans that might have been null or different
UPDATE public.subscriptions
SET plan_id = 'free'
WHERE plan_id IS NULL OR plan_id = '';
