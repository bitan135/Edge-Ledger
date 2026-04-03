'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/shared/AuthProvider';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Loader2, CheckCircle2, ChevronRight, Lock } from 'lucide-react';
import Link from 'next/link';

export default function FoundingMemberCheckout() {
  const { user, profile, isLoading: authLoading } = useAuth();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      router.replace('/login?next=/checkout/founding-member');
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
        <Loader2 className="animate-spin text-[var(--accent)]" size={32} />
      </div>
    );
  }

  const handleCheckout = async () => {
    try {
      setIsProcessing(true);
      setError(null);

      const res = await fetch('/api/payments/create-founding-member', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Checkout initiation failed');
      }

      if (data.invoice_url) {
        window.location.href = data.invoice_url;
      } else {
        throw new Error('Invalid payment gateway response');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] py-20 px-4 flex flex-col items-center">
      <div className="w-full max-w-2xl">
        <div className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8 font-black uppercase tracking-widest">
            <Link href="/" className="hover:text-[var(--foreground)] transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[var(--accent)]">Secure Checkout</span>
        </div>

        <div className="glass-card shadow-premium p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 blur-[80px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          
          <div className="flex items-center gap-4 mb-10 pb-10 border-b border-[var(--border)]">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-purple-600 flex items-center justify-center shadow-lg shadow-[var(--accent)]/20">
              <ShieldCheck className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] tracking-tight">Complete Your Order</h1>
              <p className="text-[var(--text-muted)] text-sm mt-1">Founding Member Lifetime Access</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              <h2 className="text-xs font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">Order Summary</h2>
              
              <ul className="space-y-4">
                {[
                  "Lifetime Access to SMC Journal Pro",
                  "Advanced Quantitative Analytics Unlocked",
                  "AI Session Insights & Playbook Modeling",
                  "Priority Feature Request Pipeline"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="text-[var(--accent)] shrink-0 mt-0.5" size={18} />
                    <span className="text-sm text-[var(--foreground)] font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[var(--card)] border border-[var(--border)] p-6 rounded-3xl self-start sticky top-24">
              <div className="flex justify-between items-center mb-6">
                <span className="text-sm font-bold text-[var(--text-muted)]">Total Due Today</span>
                <span className="text-4xl font-black text-[var(--foreground)]">$79</span>
              </div>

              {error && (
                <div className="mb-6 p-4 bg-[#EF444410] border border-[#EF444420] rounded-2xl text-[13px] text-[#EF4444] font-medium animate-slide-up">
                  {error}
                </div>
              )}

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full py-4 rounded-[20px] bg-[var(--accent)] text-white font-black text-sm tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Processing...
                  </>
                ) : (
                  <>
                    <Lock size={16} />
                    Pay with Crypto
                  </>
                )}
              </button>
              
              <p className="text-[10px] text-center text-[var(--text-muted)] mt-5 font-medium flex items-center justify-center gap-1.5">
                <ShieldCheck size={12} className="text-[var(--profit)]" />
                Payments processed securely via NOWPayments
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
