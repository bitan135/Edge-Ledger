-- Enable RLS
ALTER TABLE public.trades ENABLE ROW LEVEL SECURITY;

-- Select Policy
CREATE POLICY "Users can view their own trades" ON public.trades
FOR SELECT USING (auth.uid() = user_id);

-- Insert Policy
CREATE POLICY "Users can create their own trades" ON public.trades
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Update Policy  
CREATE POLICY "Users can update their own trades" ON public.trades
FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Delete Policy
CREATE POLICY "Users can delete their own trades" ON public.trades
FOR DELETE USING (auth.uid() = user_id);
