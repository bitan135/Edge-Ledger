'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Plus, Check, ArrowLeft, Sparkles
} from 'lucide-react';
import { 
  saveTrade, getStrategies, canAddTrade
} from '@/lib/storage';
import { Crown } from 'lucide-react';
import TradeForm from '@/components/TradeForm';

export default function AddTrade() {
  const router = useRouter();
  const [strategies, setStrategies] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      const data = await getStrategies();
      setStrategies(data);
    };
    loadData();
  }, []);

  const handleSubmit = async (formData) => {
    setIsSubmitting(true);
    try {
      let screenshotBeforeUrl = formData.screenshotBefore;
      let screenshotAfterUrl = formData.screenshotAfter;

      const { tradeService } = await import('@/lib/supabase');

      if (formData.screenshotBeforeFile) {
        screenshotBeforeUrl = await tradeService.uploadScreenshot(formData.screenshotBeforeFile, 'before');
      }
      if (formData.screenshotAfterFile) {
        screenshotAfterUrl = await tradeService.uploadScreenshot(formData.screenshotAfterFile, 'after');
      }

      const tradeToSave = {
        instrument: formData.instrument,
        direction: formData.direction,
        entry_price: parseFloat(formData.entryPrice),
        stop_loss: parseFloat(formData.stopLoss),
        take_profit: parseFloat(formData.takeProfit),
        lot_size: parseFloat(formData.lotSize),
        result: formData.result,
        rr: formData.rr,
        pips: formData.pips,
        session: formData.session,
        strategy: formData.strategy,
        smc_tags: formData.smcTags,
        notes: formData.notes,
        screenshot_before: screenshotBeforeUrl,
        screenshot_after: screenshotAfterUrl,
      };

      await saveTrade(tradeToSave);

      setIsSuccess(true);
      setTimeout(() => {
        router.push('/');
      }, 1500);
    } catch (err) {
      console.error('Submission error:', err);
      // Pass error back to form if needed
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-10 max-w-[1400px] mx-auto animate-fade-in pb-32 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[var(--accent)]/5 blur-[120px] rounded-full animate-float"></div>
      
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
            <div>
                <button 
                  onClick={() => router.back()}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-xl glass-effect border-white/5 text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.2em] mb-6 hover:text-white hover:border-white/20 transition-all group"
                >
                  <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
                </button>
                <div className="flex items-center gap-2 mb-3">
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full glass-effect border-white/5 text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.2em]">
                        <Plus size={12} /> Live Entry Log
                    </span>
                    <span className="flex items-center gap-2 px-3 py-1 rounded-full glass-effect border-white/5 text-emerald-400 text-[10px] font-black uppercase tracking-[0.2em] animate-pulse">
                        <Sparkles size={12} /> High-Fidelity
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none text-gradient mb-4">
                    Execution Profile
                </h1>
                <p className="text-[var(--text-secondary)] font-medium">Log your institutional setups with millisecond precision.</p>
            </div>
        </div>

        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-24 glass-card rounded-[48px] animate-scale-in">
            <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20">
              <Check className="text-emerald-500" size={40} />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter mb-2">Committed to Vault</h2>
            <p className="text-[var(--text-secondary)] font-medium">Your sequence has been archived with institutional precision.</p>
          </div>
        ) : (
          <TradeForm 
            strategies={strategies}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            submitLabel="Log Sequence"
          />
        )}

      </div>
    </div>
  );
}
