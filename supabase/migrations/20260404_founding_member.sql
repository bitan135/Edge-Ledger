-- Migration: 20260404_founding_member
-- Description: Adds profile attributes for lifetime memberships and tracking table for the 10 spots.

-- 1. Add new attributes to the `profiles` table directly.
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS plan_type TEXT DEFAULT 'free',
ADD COLUMN IF NOT EXISTS is_pro BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS subscription_start_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS subscription_end_date TIMESTAMP WITH TIME ZONE,
ADD COLUMN IF NOT EXISTS is_founding_member BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS founding_member_claimed_at TIMESTAMP WITH TIME ZONE;

-- 2. Create the `founding_member_spots` tracking table
CREATE TABLE IF NOT EXISTS public.founding_member_spots (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    total_spots INTEGER NOT NULL DEFAULT 10,
    claimed_spots INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Insert the exact single row constraint logic needed to hold the 10 spots
-- Use a safely guarded insert logic to prevent duplicate initialization
INSERT INTO public.founding_member_spots (total_spots, claimed_spots, is_active)
SELECT 10, 0, TRUE
WHERE NOT EXISTS (
    SELECT 1 FROM public.founding_member_spots
);

-- 4. Enable Row Level Security on the tracker table
ALTER TABLE public.founding_member_spots ENABLE ROW LEVEL SECURITY;

-- 5. Policies
-- Anyone can read the remaining spots
CREATE POLICY "Public can select founding member spots" 
ON public.founding_member_spots FOR SELECT 
USING (true);

-- Only service role can modify it (this will automatically route via our backend webhooks)
-- Bypasses normally required because service_role gets absolute authority, but keeping it explicit:
CREATE POLICY "Service Role can update founding member spots" 
ON public.founding_member_spots FOR UPDATE 
USING (auth.jwt() ->> 'role' = 'service_role');
