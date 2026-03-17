-- SMC Journal Security Patch v1.0
-- Tightens RLS policies and Storage privacy for institutional data integrity.

-- 1. Storage Privacy: Secure the Trade Screenshots bucket
UPDATE storage.buckets 
SET public = false 
WHERE id = 'trade-screenshots';

-- 2. Storage Policies: Restrict SELECT to owner only
DROP POLICY IF EXISTS "Users can view all screenshots" ON storage.objects;
CREATE POLICY "Users can view their own screenshots"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'trade-screenshots' AND (auth.uid())::text = (storage.foldername(name))[1]);

-- Verify folder ownership on INSERT too (Security hardening)
DROP POLICY IF EXISTS "Authenticated users can upload screenshots" ON storage.objects;
CREATE POLICY "Users can upload to their own folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'trade-screenshots' AND (auth.uid())::text = (storage.foldername(name))[1]);

-- 3. Subscriptions Hardening: Prevent manual plan tampering
-- We drop the 'insert' policy for subscriptions because it's handled by the handle_new_user trigger.
-- This prevents users from manually inserting a Pro plan record.
DROP POLICY IF EXISTS "Users can insert their own subscription" ON public.subscriptions;

-- Ensure SELECT is strictly filtered (already exists but good to re-assert)
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own subscription" ON public.subscriptions;
CREATE POLICY "Users can view their own subscription" 
ON public.subscriptions FOR SELECT 
USING (auth.uid() = user_id);

-- 4. Payments Hardening: Ensure users can only see their own settlement records
ALTER TABLE public.crypto_payments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can view their own payments" ON public.crypto_payments;
CREATE POLICY "Users can view their own payments" 
ON public.crypto_payments FOR SELECT 
USING (auth.uid() = user_id);
