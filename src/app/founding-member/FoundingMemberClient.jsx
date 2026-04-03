'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Crown, Zap, ShieldCheck, Target, Lock, TrendingUp, ChevronRight, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/shared/AuthProvider';

export default function FoundingMemberClient() {
  const [spotsData, setSpotsData] = useState({ total_spots: 10, claimed_spots: 0, is_active: true });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const { data, error } = await supabase
          .from('founding_member_spots')
          .select('total_spots, claimed_spots, is_active')
          .single();
          
        if (data && !error) {
          setSpotsData(data);
        }
      } catch (err) {
        console.error("Spots fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSpots();
  }, []);

  const spotsRemaining = Math.max(0, spotsData.total_spots - spotsData.claimed_spots);
  const isSoldOut = !spotsData.is_active || spotsRemaining === 0;

  const handleClaim = () => {
    if (user) {
      router.push('/checkout/founding-member');
    } else {
      router.push('/login?next=/checkout/founding-member');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-[var(--accent)]/5 blur-[120px] rounded-full pointer-events-none animate-float"></div>
      <div className="absolute bottom-[5%] left-[-10%] w-[35%] h-[35%] bg-indigo-500/5 blur-[100px] rounded-full pointer-events-none delay-700 animate-float"></div>

      <div className="flex-1 w-full max-w-5xl mx-auto px-4 py-20 relative z-10 flex flex-col items-center">
        
        {/* Top Label */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 text-[var(--accent)] text-[10px] font-black tracking-widest uppercase mb-10 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
          <Crown size={14} />
          Limited Early Access Offer
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-[var(--foreground)] text-center tracking-tight leading-tight max-w-3xl mb-6">
          Become a <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-purple-400">Founding Member</span> of SMC Journal
        </h1>
        
        <p className="text-lg text-[var(--text-muted)] text-center max-w-2xl mb-12">
          Secure lifetime access to our Pro analytics and diagnostic tools before they switch to a strict monthly subscription model. 
        </p>

        {/* Dynamic Status Section */}
        <div className="glass-card shadow-premium p-8 rounded-[32px] w-full max-w-3xl mb-16 relative overflow-hidden border border-[var(--border)]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col items-center md:items-start flex-1 min-w-[200px]">
              <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2">Availability</span>
              {isLoading ? (
                <div className="h-10 w-24 bg-[var(--border)] rounded animate-pulse"></div>
              ) : (
                <div className="flex items-baseline gap-2">
                  <span className={`text-5xl font-black ${isSoldOut ? 'text-[var(--loss)]' : 'text-[var(--foreground)]'}`}>
                    {isSoldOut ? '0' : spotsRemaining}
                  </span>
                  <span className="text-xl text-[var(--text-muted)] font-medium">/ 10 spots</span>
                </div>
              )}
            </div>

            <div className="h-px md:h-24 w-full md:w-px bg-[var(--border)]" />

            <div className="flex-1 flex flex-col items-center w-full">
              {isSoldOut ? (
                <div className="flex flex-col items-center w-full">
                  <span className="text-lg font-bold text-[var(--loss)] mb-4">All Spots Claimed</span>
                  <a 
                    href="mailto:beta@smcjournal.app?subject=Waitlist%20for%20Founding%20Member"
                    className="w-full py-4 rounded-[20px] glass-effect border border-[var(--glass-border)] text-[var(--foreground)] font-black text-sm tracking-[0.2em] uppercase hover:bg-[var(--card-hover)] transition-all flex items-center justify-center gap-2"
                  >
                    Join the Waitlist
                  </a>
                </div>
              ) : (
                <div className="flex flex-col items-center w-full">
                  <span className="text-2xl font-bold text-[var(--foreground)] mb-4">$79 <span className="text-sm font-medium text-[var(--text-muted)]">One-time payment</span></span>
                  <button 
                    onClick={handleClaim}
                    disabled={isLoading}
                    className="w-full py-4 rounded-[20px] bg-[var(--accent)] text-white font-black text-sm tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-xl shadow-[var(--accent)]/20"
                  >
                    Claim Your Spot
                    <ChevronRight size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl mb-16">
          <div className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-3xl group hover:border-[var(--accent)]/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center mb-6 text-[var(--accent)] group-hover:scale-110 transition-transform">
              <TrendingUp size={24} />
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">Lifetime Pro Diagnostics</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Never pay a monthly subscription. Secure permanent access to advanced streak analysis, edge identification, and session optimization tools.
            </p>
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-3xl group hover:border-[var(--profit)]/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[var(--profit)]/10 flex items-center justify-center mb-6 text-[var(--profit)] group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">AI Playbook Mode</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Founding members will get baseline access to our future AI-powered setup recognition feature before anyone else.
            </p>
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-3xl group hover:border-purple-500/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
              <Target size={24} />
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">Direct Product Input</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              As a founder, your feature requests get prioritized. Help us shape the ultimate logging tool tailored strictly for SMC traders.
            </p>
          </div>

          <div className="bg-[var(--card)] border border-[var(--border)] p-8 rounded-3xl group hover:border-[var(--text-primary)]/50 transition-colors">
            <div className="w-12 h-12 rounded-2xl bg-[var(--border)] flex items-center justify-center mb-6 text-[var(--foreground)] group-hover:scale-110 transition-transform">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-xl font-bold text-[var(--foreground)] mb-3">Locked-In Price</h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              This $79 price point is experimental. When we transition to $20/month later this year, you will never be charged again.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
