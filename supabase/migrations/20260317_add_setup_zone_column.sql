-- Add setup_zone column to trades table
ALTER TABLE public.trades 
ADD COLUMN setup_zone TEXT DEFAULT 'Supply';
