'use client';

import Link from 'next/link';
import { 
  Plus, 
  BarChart3, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  BrainCircuit, 
  MousePointer2,
  Binary,
  ArrowRight,
  ChevronRight,
  Quote,
  CheckCircle2,
  XCircle,
  Sparkles
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] selection:bg-[var(--accent)] selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[var(--accent)] flex items-center justify-center">
              <span className="text-white font-black text-lg">S</span>
            </div>
            <span className="font-black text-xl tracking-tighter">SMC JOURNAL</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#features" className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Features</Link>
            <Link href="#insights" className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Insight Engine</Link>
            <Link href="/pricing" className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors">Pricing</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-xs font-black uppercase tracking-widest text-[var(--text-muted)] hover:text-[var(--foreground)] transition-colors px-4">Login</Link>
            <Link href="/signup" className="px-6 py-3 bg-[var(--foreground)] text-[var(--background)] rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-black/10">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        
        {/* Phase 1: Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,var(--accent-muted),transparent_60%)] opacity-30" />
          
          <div className="max-w-7xl mx-auto px-6 text-center space-y-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.2em] animate-fade-in">
              <Zap size={14} className="animate-pulse" /> The Institutional Gold Standard
            </div>
            
            <div className="space-y-6 max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] animate-slide-up">
                Trade Like an <span className="text-gradient">Institution</span>, Not a Retail Gambler.
              </h1>
              <p className="text-lg md:text-xl text-[var(--text-muted)] font-medium max-w-2xl mx-auto leading-relaxed animate-slide-up [animation-delay:200ms]">
                Stop repeating execution mistakes. SMC Journal provides the quantitative proof you need to refine your edge and master market discipline.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 animate-slide-up [animation-delay:400ms]">
              <Link href="/signup" className="w-full sm:w-auto px-10 py-5 bg-[var(--accent)] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[12px] hover:scale-105 transition-all shadow-2xl shadow-[var(--accent)]/30 group">
                Start My Sequence <ArrowRight size={18} className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="#demo" className="w-full sm:w-auto px-10 py-5 glass-card border-[var(--glass-border)] text-[var(--foreground)] rounded-2xl font-black uppercase tracking-[0.2em] text-[12px] hover:bg-[var(--card-hover)] transition-all">
                See Product Tour
              </Link>
            </div>

            {/* Product Screenshot Placeholder */}
            <div className="mt-20 relative max-w-6xl mx-auto group animate-fade-in [animation-delay:600ms]">
              <div className="absolute -inset-4 bg-gradient-to-r from-[var(--accent)] to-purple-600 rounded-[4rem] blur-3xl opacity-10 group-hover:opacity-20 transition-opacity" />
              <div className="relative glass-card rounded-[2.5rem] border border-[var(--glass-border)] p-4 shadow-2xl overflow-hidden aspect-[16/9] flex items-center justify-center bg-[var(--card-hover)]">
                 <div className="text-center space-y-4">
                    <div className="w-20 h-20 rounded-3xl bg-[var(--background)] flex items-center justify-center mx-auto shadow-xl">
                        <TrendingUp size={32} className="text-[var(--accent)]" />
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">
                        [DASHBOARD_PREVIEW_SCREENSHOT]
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 2: Product Demo Section */}
        <section id="demo" className="py-32 bg-[var(--card-hover)]/30">
          <div className="max-w-7xl mx-auto px-6 space-y-24">
            <div className="text-center space-y-4">
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter">See Your Trading <span className="text-gradient">Clearly</span></h2>
              <p className="text-[var(--text-muted)] font-medium max-w-xl mx-auto">Proof over intuition. High-fidelity data capture for the professional SMC practitioner.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[var(--accent)]/10 flex items-center justify-center border border-[var(--accent)]/20">
                    <Binary size={24} className="text-[var(--accent)]" />
                  </div>
                  <h3 className="text-3xl font-black tracking-tight">Log Trades With Structure</h3>
                  <p className="text-[var(--text-muted)] font-medium leading-relaxed">
                    Stop guessing. Capture every institutional detail—entry timeframes, multi-timeframe bias, risk exposure, and strategy convergence—in seconds.
                  </p>
                </div>
                <div className="space-y-4">
                   <div className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                      <span className="text-xs font-bold uppercase tracking-widest">Timeframe Bias Tracking</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                      <span className="text-xs font-bold uppercase tracking-widest">Institutional Narrative Capture</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                      <span className="text-xs font-bold uppercase tracking-widest">Image Proof for Every Execution</span>
                   </div>
                </div>
              </div>
              <div className="glass-card rounded-[32px] border-[var(--glass-border)] aspect-square flex items-center justify-center p-8 bg-[var(--background)] shadow-xl rotate-2">
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">
                    [ADD_TRADE_FORM_SCREENSHOT]
                 </p>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 3: Problem -> Solution Section */}
        <section className="py-32 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
             <div className="glass-card rounded-[50px] border-[var(--glass-border)] p-12 md:p-24 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--accent)]/5 to-transparent" />
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                   <div className="space-y-12">
                      <div className="space-y-4">
                         <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Why Traders <span className="text-rose-500">Fail</span></h2>
                         <p className="text-[var(--text-muted)] font-medium">Retail habits lead to retail results. Break the cycle.</p>
                      </div>

                      <div className="space-y-8">
                         <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center border border-rose-500/20">
                               <XCircle size={24} className="text-rose-500" />
                            </div>
                            <div className="space-y-2">
                               <p className="text-sm font-black uppercase tracking-widest text-[var(--foreground)]">Repeating Execution Mistakes</p>
                               <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">Most traders track P&L but ignore the behavioral patterns that destroy their accounts.</p>
                            </div>
                         </div>
                         <div className="flex gap-6">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center border border-[var(--accent)]/20">
                               <CheckCircle2 size={24} className="text-[var(--accent)]" />
                            </div>
                            <div className="space-y-2">
                               <p className="text-sm font-black uppercase tracking-widest text-[var(--foreground)]">The Systematic Solution</p>
                               <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">Our engine identifies exactly which behavioral triggers lead to your losses, so you can stop them.</p>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="relative group">
                      <div className="absolute -inset-2 bg-[var(--accent)] rounded-[40px] blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
                      <div className="relative glass-card rounded-[40px] border-[var(--glass-border)] bg-[var(--card-hover)] aspect-[4/5] flex items-center justify-center p-8 -rotate-3 group-hover:rotate-0 transition-transform duration-700">
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--text-muted)]">
                            [PERFORMANCE_ANALYTICS_SCREENSHOT]
                          </p>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </section>

        {/* Phase 4: Insight Engine Highlight */}
        <section id="insights" className="py-32 bg-black text-white selection:bg-white selection:text-black">
           <div className="max-w-7xl mx-auto px-6 text-center space-y-20">
              <div className="space-y-6 max-w-3xl mx-auto">
                 <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em]">
                   <Sparkles size={14} className="text-amber-400" /> The Insight Engine
                 </div>
                 <h2 className="text-5xl md:text-8xl font-black tracking-tighter">See exactly what is <span className="text-[var(--accent)]">working</span></h2>
                 <p className="text-white/60 font-medium text-lg leading-relaxed">
                   Unlock quantitative alpha. As your journal grows, our engine identifies your highest-probability setups, timeframes, and sessions automatically.
                 </p>
              </div>

              <div className="relative max-w-5xl mx-auto">
                 <div className="absolute inset-0 bg-[var(--accent)] rounded-[3rem] blur-[100px] opacity-20" />
                 <div className="relative bg-[#111] rounded-[3rem] border border-white/10 p-6 aspect-[16/10] flex items-center justify-center group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                        [INSIGHT_ENGINE_UNLOCKED_SCREENSHOT]
                    </p>
                    <div className="absolute bottom-12 inset-x-0 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-700">
                        <span className="px-8 py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px]">Explore Quantitative Alpha</span>
                    </div>
                 </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                 <div className="space-y-4">
                    <p className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
                       <Zap size={14} className="text-amber-400" /> Statistical Significance
                    </p>
                    <p className="text-white/40 text-sm leading-relaxed">Proprietary logic requires 30 trades to establish a baseline and 100+ for high-fidelity edge modeling.</p>
                 </div>
                 <div className="space-y-4">
                    <p className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
                       <BrainCircuit size={14} className="text-blue-400" /> Behavior Mapping
                    </p>
                    <p className="text-white/40 text-sm leading-relaxed">Correlate your emotional state with execution results to identify "Red Flag" days before they happen.</p>
                 </div>
                 <div className="space-y-4">
                    <p className="text-white font-black uppercase tracking-widest text-xs flex items-center gap-2">
                       <ShieldCheck size={14} className="text-emerald-400" /> Account Hardening
                    </p>
                    <p className="text-white/40 text-sm leading-relaxed">Reduce drawdown by identifying exactly which setups consistently fail in specific market sessions.</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Phase 5: Feature Visuals Section */}
        <section id="features" className="py-32">
           <div className="max-w-7xl mx-auto px-6 space-y-32">
              <div className="text-center space-y-4">
                 <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Everything You Need to <span className="text-gradient">Scale</span></h2>
                 <p className="text-[var(--text-muted)] font-medium max-w-xl mx-auto">The complete operating system for the modern SMC trader.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="glass-card rounded-[40px] border-[var(--glass-border)] p-8 space-y-8 flex flex-col group hover:border-[var(--accent)]/40 transition-all">
                    <div className="space-y-4">
                       <p className="text-[10px] font-black text-[var(--accent)] uppercase tracking-widest">Trade Logging</p>
                       <h3 className="text-2xl font-black tracking-tight">Structured <br /> Data Capture</h3>
                       <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">Capture the "Why" behind every trade, not just the "How". Structured fields ensure clean data for analytics.</p>
                    </div>
                    <div className="flex-1 bg-[var(--background)] border border-[var(--glass-border)] rounded-3xl aspect-[4/3] flex items-center justify-center p-4 shadow-inner">
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] text-center opacity-50">
                           [LOGGING_UI_MINI_PREVIEW]
                        </p>
                    </div>
                 </div>
                 <div className="glass-card rounded-[40px] border-[var(--glass-border)] p-8 space-y-8 flex flex-col group hover:border-[var(--accent)]/40 transition-all">
                    <div className="space-y-4">
                       <p className="text-[10px] font-black text-purple-500 uppercase tracking-widest">Analytics</p>
                       <h3 className="text-2xl font-black tracking-tight">Performance <br /> Pulse Dashboard</h3>
                       <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">Real-time equity curves, win-rate segmentation, and risk-reward optimization dials at a glance.</p>
                    </div>
                    <div className="flex-1 bg-[var(--background)] border border-[var(--glass-border)] rounded-3xl aspect-[4/3] flex items-center justify-center p-4 shadow-inner">
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] text-center opacity-50">
                           [DASHBOARD_UI_MINI_PREVIEW]
                        </p>
                    </div>
                 </div>
                 <div className="glass-card rounded-[40px] border-[var(--glass-border)] p-8 space-y-8 flex flex-col group hover:border-[var(--accent)]/40 transition-all">
                    <div className="space-y-4">
                       <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Strategies</p>
                       <h3 className="text-2xl font-black tracking-tight">Strategy <br /> Edge Auditing</h3>
                       <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">Define your setups and let our engine calculate exactly which model has the highest expectancy.</p>
                    </div>
                    <div className="flex-1 bg-[var(--background)] border border-[var(--glass-border)] rounded-3xl aspect-[4/3] flex items-center justify-center p-4 shadow-inner">
                        <p className="text-[8px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] text-center opacity-50">
                           [STRATEGY_UI_MINI_PREVIEW]
                        </p>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Phase 6: CTA Section */}
        <section className="py-32 relative">
           <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
              <div className="space-y-6">
                 <h2 className="text-5xl md:text-7xl font-black tracking-tighter">Ready to Master <span className="text-gradient">Your Narrative?</span></h2>
                 <p className="text-lg text-[var(--text-muted)] font-medium">Join 500+ SMC traders refining their edge every day.</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                 <Link href="/signup" className="w-full sm:w-auto px-12 py-6 bg-[var(--accent)] text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[14px] hover:scale-110 transition-all shadow-2xl shadow-[var(--accent)]/30">
                    Improve My Trading Now <ArrowRight className="inline-block ml-2" size={20} />
                 </Link>
                 <Link href="/pricing" className="text-sm font-black uppercase tracking-widest text-[var(--foreground)] hover:text-[var(--accent)] transition-colors underline-offset-8 underline decoration-[var(--accent)]/30">
                    See Professional Plans
                 </Link>
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[var(--text-muted)] pt-8">
                 Free 7-Day sequence. No high-frequency risk.
              </p>
           </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="py-20 border-t border-[var(--glass-border)]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[var(--accent)] flex items-center justify-center">
                  <span className="text-white font-black text-sm">S</span>
                </div>
                <span className="font-black text-sm tracking-tighter">SMC JOURNAL</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
                The institutional standard for professional trader documentation and performance analysis.
              </p>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]">Product</p>
              <nav className="flex flex-col gap-2">
                <Link href="#features" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Features</Link>
                <Link href="#insights" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Insight Engine</Link>
                <Link href="/pricing" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Pricing</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]">Legal</p>
              <nav className="flex flex-col gap-2">
                <Link href="/terms" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Terms of Service</Link>
                <Link href="/privacy" className="text-xs text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors">Privacy Policy</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <p className="text-[10px] font-black uppercase tracking-widest text-[var(--foreground)]">Mission</p>
              <p className="text-xs text-[var(--text-muted)] font-medium leading-relaxed">
                Dedicated to helping traders achieve consistent profitability through quantitative discipline.
              </p>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-[var(--glass-border)] flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">
              © 2026 SMC Journal. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
               <MousePointer2 size={16} className="text-[var(--text-muted)]" />
               <span className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)]">Institutional Grade</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
