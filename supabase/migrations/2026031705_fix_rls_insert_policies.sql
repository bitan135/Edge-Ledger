-- Fix: Explicit INSERT policies for trades and strategies
-- This addresses the issue where users could not add new records despite having 'ALL' policies.

-- 1. Trades Table
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert their own trades" ON public.trades;
CREATE POLICY "Users can insert their own trades"
ON public.trades FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own trades" ON public.trades;
CREATE POLICY "Users can update their own trades"
ON public.trades FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own trades" ON public.trades;
CREATE POLICY "Users can delete their own trades"
ON public.trades FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- 2. Strategies Table
ALTER TABLE public.strategies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can insert their own strategies" ON public.strategies;
CREATE POLICY "Users can insert their own strategies"
ON public.strategies FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own strategies" ON public.strategies;
CREATE POLICY "Users can update their own strategies"
ON public.strategies FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own strategies" ON public.strategies;
CREATE POLICY "Users can delete their own strategies"
ON public.strategies FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- 3. Profiles Table (Ensure users can update their own profile)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
ON public.profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);
