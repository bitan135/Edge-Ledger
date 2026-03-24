-- 20260324100000_deep_logic_audit.sql
-- Migration to enforce strict data integrity rules mathematically at the DB layer.

-- 1. Enforce mathematical boundaries on trade prices
ALTER TABLE public.trades 
  ADD CONSTRAINT chk_sl_neq_entry CHECK (stop_loss IS NULL OR stop_loss != entry_price),
  ADD CONSTRAINT chk_tp_neq_entry CHECK (take_profit IS NULL OR take_profit != entry_price);

-- 2. Scoped Analytics: Enforce that poi_type ONLY exists for Supply/Demand strategies
-- Case-insensitive check just in case, or exact string match.
ALTER TABLE public.trades
  ADD CONSTRAINT chk_poi_type_scope CHECK (
    poi_type IS NULL OR 
    (poi_type IS NOT NULL AND strategy IN ('Supply Zone', 'Demand Zone', 'Supply/Demand'))
  );

-- 3. Enforce Strict Plan Types in Profiles
-- Previously profiles could have any text, we lock it to our 3 modes.
-- We must drop the constraint if it exists, or just add.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'chk_plan_type'
    ) THEN
        ALTER TABLE public.profiles
        ADD CONSTRAINT chk_plan_type CHECK (plan_type IN ('free', 'pro', 'lifetime'));
    END IF;
END $$;

-- 4. Optimizing Indexes for Deep Analytics Queries
-- Accelerate filtering by strategy and result for heavy Insight engine calculations.
CREATE INDEX IF NOT EXISTS idx_trades_strategy ON public.trades(strategy);
CREATE INDEX IF NOT EXISTS idx_trades_result ON public.trades(result);
CREATE INDEX IF NOT EXISTS idx_trades_session ON public.trades(session);

