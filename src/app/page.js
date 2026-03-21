'use client';

import Link from 'next/link';
import Image from 'next/image';
import { 
  TrendingUp, 
  BarChart3, 
  Target, 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Search,
  AlertCircle,
  MousePointer2,
  ShieldCheck
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-white" />;

  const loginLink = user ? '/dashboard' : '/login';
  const signupLink = user ? '/dashboard' : '/signup';

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-indigo-100 font-sans relative">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled ? 'bg-white/90 backdrop-blur-md border-slate-200 py-4' : 'bg-transparent border-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
              <TrendingUp size={18} className="text-white" />
            </div>
            <span className="text-lg font-black tracking-tighter text-slate-900">SMC JOURNAL</span>
          </div>
          
          <div className="flex items-center gap-4">
            <Link href={loginLink} className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors px-4">
              {user ? 'Dashboard' : 'Log In'}
            </Link>
            <Link href={signupLink} className="text-xs font-black uppercase tracking-widest py-3 px-6 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-all shadow-lg active:scale-95">
              {user ? 'Open Cockpit' : 'Get Started'}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-8">
              <Zap size={12} />
              The Institutional Standard
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1] mb-8 tracking-tighter">
              Quantify Your SMC Edge. <br />
              <span className="text-indigo-600">Master Your Discipline.</span>
            </h1>
            
            <p className="text-xl text-slate-600 font-medium mb-12 leading-relaxed">
              The institutional-grade journal built exclusively for serious SMC traders. Stop repeating execution mistakes and start logging with professional structure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href={signupLink} className="px-10 py-5 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-indigo-200">
                Initialize Your Journal
                <ArrowRight size={16} />
              </Link>
              <button onClick={() => document.getElementById('problem').scrollIntoView({ behavior: 'smooth' })} className="px-10 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-slate-400 transition-all">
                Why SMC Journal?
              </button>
            </div>
            
            <div className="mt-12 flex items-center gap-6">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                ))}
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Joined by 1,200+ Professional Operators</p>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-indigo-600/5 blur-3xl rounded-[48px] group-hover:bg-indigo-600/10 transition-all duration-700" />
            <div className="relative border border-slate-200 bg-white rounded-[32px] overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                  <div className="w-3 h-3 rounded-full bg-slate-200" />
                </div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">Performance Overview</div>
              </div>
              <div className="p-2">
                 <Image 
                  src="/smc_app_preview_1774108825460.png" 
                  alt="SMC Journal Dashboard Preview" 
                  width={1400} 
                  height={1400} 
                  className="rounded-2xl"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section id="problem" className="py-32 px-6 border-y border-slate-100 bg-slate-50/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-8 tracking-tighter text-slate-900">
            Unstructured data is the <br /><span className="text-red-500">silent edge killer.</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-16 font-medium">
            Theory alone won't scale you. High-stakes SMC trading requires rigorous data capture. Most traders fail because they can't see the repeating patterns in their own mistakes.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                <AlertCircle size={24} />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Repeating Errors</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">You take the same low-probability setups across different pairs because you lack a centralized audit of your performance.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                <MousePointer2 size={24} />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Hidden Biases</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">Without structure, your session bias and emotional triggers remain invisible, slowly draining your capital.</p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center text-red-500">
                <Search size={24} />
              </div>
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">No Proof</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">You don't actually know if your CHoCH or BOS entries have a positive expectancy. You're trading on hope, not data.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div className="order-2 lg:order-1 relative">
               <div className="absolute -inset-10 bg-indigo-600/5 blur-[100px] rounded-full" />
               <div className="relative border border-slate-200 bg-white p-8 rounded-[40px] shadow-xl">
                  <div className="space-y-6">
                     <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
                        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white">
                           <ShieldCheck size={20} />
                        </div>
                        <div>
                           <div className="text-xs font-black uppercase tracking-widest text-slate-900">Setup Verified</div>
                           <div className="text-[10px] font-bold text-slate-400">Institutional Confidence Score: 88%</div>
                        </div>
                     </div>
                     <div className="space-y-3">
                        <div className="h-2 bg-slate-100 rounded-full w-full" />
                        <div className="h-2 bg-slate-100 rounded-full w-5/6" />
                        <div className="h-2 bg-slate-100 rounded-full w-2/3" />
                     </div>
                     <div className="pt-4 grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                           <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Entry Trigger</div>
                           <div className="text-sm font-black text-slate-900">M15 CHoCH</div>
                        </div>
                        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                           <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Market Bias</div>
                           <div className="text-sm font-black text-slate-900">H4 Bullish</div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-slate-900 leading-[1.1]">
                The standard for <br />institutional scaling.
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-12 font-medium">
                SMC Journal provides the definitive framework for institutional scaling. We transform fragmented theory into a high-probability trading machine.
              </p>
              
              <ul className="space-y-6">
                {[
                  "Tag confluences like H4 Bias, M15 CHoCH, and FVG Tap in seconds.",
                  "Automated win-rate calculation for specific setup permutations.",
                  "Identify precisely which mistakes lead to your drawdowns.",
                  "Export-ready reports for performance auditing."
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-4">
                    <div className="mt-1 w-5 h-5 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 shrink-0">
                      <CheckCircle2 size={14} />
                    </div>
                    <span className="text-slate-700 font-bold text-sm tracking-tight">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-40 px-6 bg-slate-900 text-white rounded-[64px] mx-6 mb-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Everything you need. <br />Nothing you don't.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center mb-10 shadow-lg shadow-indigo-500/20">
                <BarChart3 size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tighter">Advanced Analytics</h3>
              <p className="text-white/60 leading-relaxed font-medium">Deep dive into setup-specific win rates, session bias, and behavioral psychology logs.</p>
            </div>

            <div className="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-indigo-500 flex items-center justify-center mb-10 shadow-lg shadow-indigo-500/20">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tighter">Strategy Vault</h3>
              <p className="text-white/60 leading-relaxed font-medium">Manage and test your confluences. Verify your CHoCH and BOS setups with data-driven proof.</p>
            </div>

            <div className="p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-10 border border-white/20">
                <Search size={28} />
              </div>
              <h3 className="text-2xl font-black mb-4 tracking-tighter">Instant Search</h3>
              <p className="text-white/60 leading-relaxed font-medium">Access any trade, screenshot, or realization in milliseconds. Universal library for your edge.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiator Section */}
      <section className="py-40 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest mb-8">
            Our Core Belief
          </div>
          <h2 className="text-4xl md:text-7xl font-black mb-12 tracking-tighter text-slate-900 leading-[1]">
             Logging is basic. <br /><span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">Auditing is elite.</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-600 font-medium mb-16 leading-relaxed italic">
            "SMC Journal doesn't just store your trades. It audits your execution discipline to ensure you are trading your system—and nothing else."
          </p>
          <div className="h-1 bg-slate-100 w-24 mx-auto rounded-full" />
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-40 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-8xl font-black mb-12 tracking-tighter text-slate-900 leading-none">
            Scale Your <br /> Alpha.
          </h2>
          <Link href={signupLink} className="inline-flex items-center gap-6 px-16 py-8 bg-indigo-600 text-white rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-2xl shadow-indigo-200 active:scale-95 border-none">
            Start Your Elite Journal
            <ArrowRight size={24} />
          </Link>
          <div className="mt-12 text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
             Trusted by Professionals worldwide.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-2 opacity-40 grayscale">
            <div className="w-6 h-6 rounded bg-slate-900 flex items-center justify-center">
              <TrendingUp size={14} className="text-white" />
            </div>
            <span className="text-sm font-black tracking-tighter text-slate-900">SMC JOURNAL</span>
          </div>
          
          <div className="flex gap-8">
            <Link href="/privacy" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">Privacy</Link>
            <Link href="/terms" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">Terms</Link>
            <Link href="/affiliate" className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-all">Partners</Link>
          </div>

          <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">© 2026 SMC Journal. Engineered for Alpha.</p>
        </div>
      </footer>
    </div>
  );
}
