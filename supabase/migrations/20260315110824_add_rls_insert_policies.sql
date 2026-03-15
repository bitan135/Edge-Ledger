-- Allow users to insert their own payment records
CREATE POLICY "Users can insert their own payments" ON public.crypto_payments FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Allow users to insert their own subscription records (for completeness)
CREATE POLICY "Users can insert their own subscription" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
