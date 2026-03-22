-- 20260322_monetization_and_poi.sql
-- Migration to support Insights monetization and improved POI data quality

-- 1. Add plan_type to profiles for easy access control
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS plan_type TEXT DEFAULT 'free';

-- 2. Add poi_type to trades for Supply/Demand analysis
ALTER TABLE public.trades 
ADD COLUMN IF NOT EXISTS poi_type TEXT;

-- 3. Sync plan_type from existing subscriptions table if available
DO $$
BEGIN
    IF EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'subscriptions') THEN
        UPDATE public.profiles p
        SET plan_type = s.plan_id
        FROM public.subscriptions s
        WHERE p.id = s.user_id;
    END IF;
END $$;

-- 4. Add index for poi_type to optimize future analytics
CREATE INDEX IF NOT EXISTS idx_trades_poi_type ON public.trades(poi_type);

-- 5. Trigger to keep plan_type in sync automatically
CREATE OR REPLACE FUNCTION public.sync_profile_plan_type()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.profiles
    SET plan_type = NEW.plan_id
    WHERE id = NEW.user_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_sync_profile_plan_type ON public.subscriptions;
CREATE TRIGGER tr_sync_profile_plan_type
    AFTER INSERT OR UPDATE OF plan_id ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION public.sync_profile_plan_type();
