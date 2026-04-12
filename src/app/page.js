'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BarChart3, 
  Target, 
  TrendingUp, 
  BrainCircuit, 
  Binary,
  ArrowRight,
  CheckCircle2,
  Activity,
  ChevronRight,
  Menu,
  X,
  Mail,
  Sparkles,
  HelpCircle,
  Zap
} from 'lucide-react';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-500 selection:text-white font-sans antialiased overflow-x-hidden pt-12">
      
      {/* Founding Member Top Banner */}
      <Link href="/founding-member" className="fixed top-0 w-full z-[60] bg-indigo-600 hover:bg-indigo-700 transition-colors text-white text-center py-3 px-4 flex items-center justify-center gap-2 group cursor-pointer border-b border-indigo-500 shadow-md">
        <Sparkles size={16} className="text-indigo-200" />
        <span className="text-[11px] font-black uppercase tracking-widest leading-none">Founding Member Offer Is Live</span>
        <span className="text-[12px] font-medium opacity-80 hidden sm:inline ml-2">• Secure Lifetime Pro Access For $79</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform opacity-70 ml-2" />
      </Link>

      {/* Navigation */}
      <nav className="fixed top-12 w-full z-50 backdrop-blur-xl bg-white/80 border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-indigo-800 flex items-center justify-center shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform duration-500">
              <TrendingUp size={20} className="text-white" />
            </div>
            <span className="font-black text-lg sm:text-xl tracking-tighter text-slate-900">SMC JOURNAL</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/features" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 hover:text-indigo-600 transition-colors">Features</Link>
            <Link href="/insight-engine" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 hover:text-indigo-600 transition-colors">Insight Engine</Link>
            <Link href="/pricing" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 hover:text-indigo-600 transition-colors">Pricing</Link>
            <Link href="/affiliate" className="text-xs font-black uppercase tracking-[0.15em] text-slate-500 hover:text-indigo-600 transition-colors">Affiliate</Link>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/login" className="hidden sm:block text-xs font-black uppercase tracking-[0.15em] text-slate-500 hover:text-indigo-600 transition-colors px-4">Login</Link>
            <Link href="/signup" className="px-4 sm:px-6 py-2.5 sm:py-3 bg-slate-900 text-white rounded-lg text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-xl shadow-slate-900/10">
              Get Started
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] bg-white/95 backdrop-blur-xl border-t border-slate-100 ${mobileMenuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="px-6 py-4 space-y-1">
            {[
              { href: '/features', label: 'Features' },
              { href: '/insight-engine', label: 'Insight Engine' },
              { href: '/pricing', label: 'Pricing' },
              { href: '/affiliate', label: 'Affiliate' },
              { href: '/login', label: 'Login' },
            ].map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-3 px-4 rounded-xl text-sm font-bold text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="pt-16 sm:pt-20">
        
        {/* Minimalist Hero Section */}
        <section className="relative pt-16 sm:pt-32 pb-16 sm:pb-40 overflow-hidden flex flex-col items-center justify-center min-h-[70vh] sm:min-h-[85vh] bg-white border-b border-slate-200">
          {/* Subtle Grid Background */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
               style={{ backgroundImage: 'linear-gradient(rgba(15,23,42,1) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
          />
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-50 rounded-bl-full opacity-60 pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 text-center space-y-10 relative z-10">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-[0.25em] mx-auto shadow-sm">
              <Activity size={12} className="text-indigo-600" /> Professional Trade Analytics
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.95] text-slate-900">
                The Journal Built for <br />
                <span className="text-indigo-600">Smart Money Concepts.</span>
              </h1>
              <p className="text-lg md:text-xl font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed tracking-tight">
                Generic retail journals log entry and exit prices. We log structural narrative, Fair Value Gaps, mitigating order blocks, and liquidity sweeps. 
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link href="/signup" className="w-full sm:w-auto px-10 py-5 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-[0.15em] text-xs hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-600/20 hover:scale-105 flex items-center justify-center gap-3">
                Start Journaling <ArrowRight size={16} />
              </Link>
              <Link href="#features" className="w-full sm:w-auto px-10 py-5 bg-white border border-slate-200 text-slate-700 rounded-xl font-black uppercase tracking-[0.15em] text-xs hover:bg-slate-50 transition-all shadow-sm">
                Explore The Tool
              </Link>
            </div>
          </div>
        </section>

        {/* Phase 2: Feature Breakdown */}
        <section id="features" className="py-20 md:py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
               {/* Context Column */}
               <div className="lg:col-span-5 space-y-8 sticky top-32">
                  <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight text-slate-900">
                     Track Structural Intent, <span className="text-indigo-600">Not Just Prices.</span>
                  </h2>
                  <div className="space-y-6 text-slate-500 font-medium leading-relaxed">
                     <p>
                        Most trading journals fail because they treat SMC strategies like simple indicator crosses. If you cannot track the specific killzone a setup occurred in or the HTF POI it reacted from, your data is incomplete.
                     </p>
                     <p>
                        Our platform is engineered exclusively to quantify structural variables. Find out exactly which setups provide a legitimate edge and which are emotional leaks.
                     </p>
                  </div>
               </div>

               {/* Bento Box Grid */}
               <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-indigo-300 transition-all shadow-sm group">
                     <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100 mb-6 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-colors">
                        <Binary size={22} className="text-indigo-600 group-hover:text-white transition-colors" />
                     </div>
                     <h3 className="text-xl font-black tracking-tight mb-3 text-slate-900">Narrative Tracking</h3>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">Log Break of Structure, Change of Character, and exact mitigation points on every execution.</p>
                  </div>
                  <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-emerald-300 transition-all shadow-sm group md:translate-y-8">
                     <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100 mb-6 group-hover:bg-emerald-600 group-hover:border-emerald-600 transition-colors">
                        <BarChart3 size={22} className="text-emerald-600 group-hover:text-white transition-colors" />
                     </div>
                     <h3 className="text-xl font-black tracking-tight mb-3 text-slate-900">Edge Expectancy</h3>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">Instantly calculate the mathematical expectancy of specific chart models.</p>
                  </div>
                  <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-rose-300 transition-all shadow-sm group">
                     <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center border border-rose-100 mb-6 group-hover:bg-rose-500 group-hover:border-rose-500 transition-colors">
                        <BrainCircuit size={22} className="text-rose-500 group-hover:text-white transition-colors" />
                     </div>
                     <h3 className="text-xl font-black tracking-tight mb-3 text-slate-900">Behavioral Audits</h3>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">Tag executions with psychological states to isolate the exact financial cost of undisciplined trading.</p>
                  </div>
                  <div className="bg-white border border-slate-200 p-8 rounded-2xl hover:border-amber-300 transition-all shadow-sm group md:translate-y-8">
                     <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center border border-amber-100 mb-6 group-hover:bg-amber-500 group-hover:border-amber-500 transition-colors">
                        <Target size={22} className="text-amber-600 group-hover:text-white transition-colors" />
                     </div>
                     <h3 className="text-xl font-black tracking-tight mb-3 text-slate-900">Session Logic</h3>
                     <p className="text-sm text-slate-500 font-medium leading-relaxed">Correlate win rates against specific liquidity windows like Asian sweep or NY Open.</p>
                  </div>
               </div>
            </div>
          </div>
        </section>

        {/* Phase 3: Premium Insight Engine Visual */}
        <section id="insight-engine" className="py-24 md:py-40 bg-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
          
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
                  <Sparkles size={12} /> The Insight Engine
                </div>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900 leading-[0.95]">
                  Institutional Logic. <br />
                  <span className="text-indigo-600">Quantified.</span>
                </h2>
                <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-xl">
                  Most journals give you a P&L curve. We give you a structural diagnostic. The Insight Engine audits every execution against HTF narrative, liquidity sweeps, and Fair Value Gaps to isolate your true edge.
                </p>
                
                <div className="space-y-4 pt-4">
                   {[
                     { t: "Structural Sync Analysis", d: "Correlation between HTF bias and LTF execution." },
                     { t: "Liquidity Window Audits", d: "Performance metrics filtered by session killzones." },
                     { t: "Psychological Leak Detection", d: "The financial cost of emotional vs. logical trades." }
                   ].map((item, i) => (
                     <div key={i} className="flex gap-4">
                        <div className="mt-1 w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                           <CheckCircle2 size={12} className="text-white" />
                        </div>
                        <div className="space-y-1">
                           <h4 className="text-sm font-bold text-slate-900 leading-none">{item.t}</h4>
                           <p className="text-xs text-slate-500 font-medium">{item.d}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>

              {/* High-Fidelity Dashboard Mockup (Matching Live Prod App) */}
              <div className="relative group perspective-1000">
                <div className="absolute -inset-4 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-[40px] blur-2xl group-hover:blur-3xl transition-all duration-700" />
                <div className="relative bg-white/60 backdrop-blur-xl rounded-[32px] border border-slate-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] p-6 md:p-8 overflow-hidden flex flex-col gap-5 h-full group-hover:bg-white/80 transition-colors duration-700">

                   {/* Header matching App */}
                   <div className="flex flex-col gap-2 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50/50 border border-indigo-100 text-indigo-600 text-[9px] font-black uppercase tracking-[0.2em] shadow-sm">
                              <Sparkles size={10} /> Institutional Intelligence
                          </span>
                      </div>
                      <h3 className="text-3xl font-black text-slate-900 tracking-tighter title-gradient">Execution Analytics</h3>
                   </div>

                   {/* Top Level KPIs */}
                   <div className="grid grid-cols-2 gap-3">
                       <div className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                           <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Vault Expectancy</span>
                           <span className="text-lg md:text-xl font-black text-slate-900">1.8R</span>
                       </div>
                       <div className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col items-center justify-center shadow-sm hover:shadow-md transition-shadow">
                           <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Max Drawdown</span>
                           <span className="text-lg md:text-xl font-black text-rose-500">-3R</span>
                       </div>
                   </div>

                   {/* Secondary Metrics Grid */}
                   <div className="grid grid-cols-2 gap-3">
                      {[
                        { l: "TOTAL NET R", v: "+12.4R", c: "text-emerald-500" },
                        { l: "WIN RATE", v: "68%", c: "text-slate-900" },
                        { l: "ACTIVE STREAK", v: "4W", c: "text-emerald-500" },
                        { l: "BEST/WORST", v: "+4R / -1R", c: "text-slate-900" }
                      ].map((m, i) => (
                        <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 flex flex-col justify-center shadow-sm hover:shadow-md transition-shadow">
                           <span className="text-[7.5px] md:text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2 whitespace-nowrap truncate">{m.l}</span>
                           <span className={`text-base md:text-lg font-black whitespace-nowrap truncate ${m.c}`}>{m.v}</span>
                        </div>
                      ))}
                   </div>

                   {/* Chart Area */}
                   <div className="flex-grow bg-white border border-slate-100 rounded-2xl p-5 flex flex-col justify-between shadow-sm relative overflow-hidden min-h-[140px]">
                      <div className="relative z-10 flex justify-between items-center mb-4">
                         <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Equity Trajectory</span>
                         <span className="text-[8px] font-black text-indigo-500 uppercase tracking-widest bg-indigo-50 px-2 py-1 rounded">Live DB Sync</span>
                      </div>
                      
                      {/* Smooth Area Curve Chart */}
                      <div className="h-full w-full relative z-10 flex items-end translate-y-1">
                         <svg width="100%" height="100%" viewBox="0 0 100 40" preserveAspectRatio="none" className="overflow-visible">
                            <defs>
                                <linearGradient id="mockCurve" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.25}/>
                                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.01}/>
                                </linearGradient>
                            </defs>
                            <path d="M0,35 C10,35 15,25 20,25 C30,25 35,32 40,30 C50,25 55,10 60,15 C65,20 70,12 80,8 C90,5 95,2 100,0" fill="none" stroke="#4f46e5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm" />
                            <path d="M0,35 C10,35 15,25 20,25 C30,25 35,32 40,30 C50,25 55,10 60,15 C65,20 70,12 80,8 C90,5 95,2 100,0 L100,40 L0,40 Z" fill="url(#mockCurve)" />
                            <circle cx="100" cy="0" r="2.5" fill="#4f46e5" className="animate-pulse shadow-[0_0_8px_#4f46e5]" />
                         </svg>
                      </div>
                   </div>

                </div>

                {/* Floating Aesthetic Labels */}
                <div className="absolute -top-5 -right-5 bg-white border border-slate-200 px-4 py-2.5 rounded-[14px] shadow-xl flex items-center gap-2 animate-bounce-slow z-20">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest whitespace-nowrap">Model Confirmed</span>
                </div>
                <div className="absolute -bottom-5 -left-5 bg-indigo-600 text-white px-4 py-2.5 rounded-[14px] shadow-xl flex items-center gap-2 z-20 group-hover:scale-105 transition-transform">
                   <Zap size={14} className="fill-white/20" />
                   <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Auto-Audited</span>
                </div>
              </div>
            </div>
          </div>
          
          <style jsx>{`
            @keyframes bounce-slow {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            .animate-bounce-slow {
              animation: bounce-slow 4s ease-in-out infinite;
            }
          `}</style>
        </section>

        {/* Phase 4: Extreme SEO Targeting Section */}
        <section className="py-16 md:py-24 bg-slate-50">
           <div className="max-w-4xl mx-auto px-6 space-y-12">
              <div className="text-center">
                 <h2 className="text-3xl font-black tracking-tight text-slate-900 mb-6">A Trading Journal Designed for Smart Money Concepts</h2>
                 <p className="text-slate-500 leading-relaxed font-medium">
                    SMC Journal provides the technical framework necessary for forex, crypto, and indices traders adopting the structural logic of smart money. Standard tracking applications focus solely on price delivery; our architecture inherently requires you to categorize structural intent, ensuring your analytical data precisely mirrors the reality of institutional market operations.
                 </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-12 border-t border-slate-200 text-left">
                 <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-3 mb-4">
                       <CheckCircle2 size={16} className="text-indigo-600" /> Forex Performance Tracker
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">Log complex setups across critical volatility sessions, engineered with specific instrument analytics perfect for forex price action.</p>
                 </div>
                 <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
                    <h3 className="text-lg font-black text-slate-900 flex items-center gap-3 mb-4">
                       <CheckCircle2 size={16} className="text-indigo-600" /> Structural Bias Analytics
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed font-medium">Calculate how consistently your higher timeframe narrative analysis aligns with lower timeframe execution outcomes.</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Phase 4.5: Support/Contact */}
        <section className="py-20 md:py-32 bg-white border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
               <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-black uppercase tracking-[0.25em] mx-auto shadow-sm mb-6">
                 <Mail size={12} className="text-indigo-600" /> Always Here To Help
               </span>
               <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900 mb-6">Contact Us Directly</h2>
               <p className="text-lg font-medium text-slate-500 max-w-2xl mx-auto leading-relaxed">
                 We operate with full transparency. Whether you need an enterprise solution, found a bug, or just want to say hi, reach out to the right channel below.
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
               {/* General */}
               <a href="mailto:hello@smcjournal.app" className="block p-8 border border-slate-200 rounded-2xl bg-white hover:border-indigo-300 transition-all group shadow-sm hover:shadow-md hover:-translate-y-1">
                 <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center border border-indigo-100 mb-6 group-hover:bg-indigo-600 transition-colors">
                   <Mail size={22} className="text-indigo-600 group-hover:text-white transition-colors" />
                 </div>
                 <h3 className="text-xl font-black tracking-tight mb-2 text-slate-900 group-hover:text-indigo-600 transition-colors">General & Partners</h3>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                   General inquiries, partnership opportunities, or just want to chat about the markets.
                 </p>
                 <div className="text-xs font-black uppercase tracking-[0.1em] text-slate-400 group-hover:text-indigo-600 transition-colors">
                   hello@smcjournal.app
                 </div>
               </a>

               {/* Beta */}
               <a href="mailto:beta@smcjournal.app" className="block p-8 border border-slate-200 rounded-2xl bg-white hover:border-emerald-300 transition-all group shadow-sm hover:shadow-md hover:-translate-y-1">
                 <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center border border-emerald-100 mb-6 group-hover:bg-emerald-600 transition-colors">
                   <Sparkles size={22} className="text-emerald-600 group-hover:text-white transition-colors" />
                 </div>
                 <h3 className="text-xl font-black tracking-tight mb-2 text-slate-900 group-hover:text-emerald-600 transition-colors">Beta & Feedback</h3>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                   Submit bug reports, request new analytics features, or ask for Insight Engine early access.
                 </p>
                 <div className="text-xs font-black uppercase tracking-[0.1em] text-slate-400 group-hover:text-emerald-600 transition-colors">
                   beta@smcjournal.app
                 </div>
               </a>

               {/* Support */}
               <a href="mailto:support@smcjournal.app" className="block p-8 border border-slate-200 rounded-2xl bg-white hover:border-rose-300 transition-all group shadow-sm hover:shadow-md hover:-translate-y-1">
                 <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center border border-rose-100 mb-6 group-hover:bg-rose-500 transition-colors">
                   <HelpCircle size={22} className="text-rose-500 group-hover:text-white transition-colors" />
                 </div>
                 <h3 className="text-xl font-black tracking-tight mb-2 text-slate-900 group-hover:text-rose-500 transition-colors">Technical Support</h3>
                 <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">
                   Account recovery, urgent technical issues, billing questions, or refund requests.
                 </p>
                 <div className="text-xs font-black uppercase tracking-[0.1em] text-slate-400 group-hover:text-rose-500 transition-colors">
                   support@smcjournal.app
                 </div>
               </a>
            </div>
          </div>
        </section>

        {/* 🚀 Founding Member Beta Launch Section */}
        <section className="relative overflow-hidden border-b border-slate-200">
          {/* Dark gradient backdrop */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-24 md:py-32 relative">
            {/* Animated glow orbs */}
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/15 rounded-full blur-[100px] pointer-events-none" />
            {/* Grid overlay */}
            <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />

            <div className="max-w-6xl mx-auto px-6 relative z-10">
              {/* Top badges row */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /> Beta Launch — Limited Window
                </span>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <Target size={10} /> Only 10 Spots Total
                </span>
              </div>

              {/* Main headline */}
              <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-[0.95] mb-6">
                  Lock In <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Lifetime Pro</span> Before It's Gone.
                </h2>
                <p className="text-lg text-slate-400 font-medium leading-relaxed max-w-2xl mx-auto">
                  We're launching SMC Journal with a one-time founding offer. Pay <span className="text-white font-black">$79 once</span> and never pay again — no monthly fees, no annual renewals, no price increases. Ever.
                </p>
              </div>

              {/* Two-column layout */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left: Value proposition */}
                <div className="space-y-6">
                  {/* Price comparison */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    <div className="flex items-baseline gap-4 mb-6">
                      <span className="text-5xl font-black text-white">$79</span>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-500 line-through">$240/yr</span>
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Save $161+ Year 1</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      {[{label: 'Year 1', monthly: '$240', you: '$79'}, {label: 'Year 2', monthly: '$480', you: '$79'}, {label: 'Year 3', monthly: '$720', you: '$79'}].map((y, i) => (
                        <div key={i} className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                          <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">{y.label}</div>
                          <div className="text-xs font-bold text-slate-500 line-through mb-1">{y.monthly}</div>
                          <div className="text-lg font-black text-emerald-400">{y.you}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* What you get */}
                  <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Everything Included Forever</h3>
                    <ul className="space-y-4">
                      {[
                        { text: "Full Pro Access — All analytics, drawdown curves, monthly P&L", hot: false },
                        { text: "Every future Pro feature — AI Playbook, advanced backtesting", hot: true },
                        { text: "Founding Member badge on your profile", hot: false },
                        { text: "Priority feature requests & direct developer access", hot: false },
                        { text: "Zero recurring charges — pay once, own it forever", hot: true },
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2 size={16} className={`shrink-0 mt-0.5 ${item.hot ? 'text-amber-400' : 'text-indigo-400'}`} />
                          <span className="text-sm font-medium text-slate-300 leading-relaxed">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Right: CTA card */}
                <div className="relative">
                  {/* Glow behind card */}
                  <div className="absolute -inset-4 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 rounded-[40px] blur-2xl pointer-events-none" />
                  <div className="relative bg-white rounded-[28px] p-8 md:p-10 shadow-2xl">
                    {/* Urgency badge */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-amber-500/30 whitespace-nowrap">
                      🔥 Spots Closing Fast
                    </div>

                    <div className="text-center mt-4 mb-8">
                      <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">Founding Member Access</h3>
                      <p className="text-sm text-slate-500 font-medium">One payment. Lifetime Pro. No strings.</p>
                    </div>

                    {/* Spot tracker visual */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Spots Remaining</span>
                        <span className="text-[10px] font-black text-rose-500 uppercase tracking-widest">Limited to 10</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full transition-all" style={{ width: '70%' }} />
                      </div>
                    </div>

                    {/* Social proof */}
                    <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 mb-8">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                        <CheckCircle2 size={16} className="text-emerald-600" />
                      </div>
                      <p className="text-xs font-bold text-emerald-700">Early traders are already locking in — don't miss the beta window.</p>
                    </div>

                    {/* CTA Button */}
                    <Link href="/founding-member" className="block w-full py-5 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-2xl font-black uppercase tracking-[0.15em] text-xs text-center hover:from-indigo-700 hover:to-indigo-800 transition-all shadow-xl shadow-indigo-600/30 hover:shadow-2xl hover:shadow-indigo-600/40 hover:scale-[1.02] active:scale-[0.98]">
                      Claim Your Founding Spot →
                    </Link>

                    <p className="text-center text-[10px] text-slate-400 font-bold mt-4 uppercase tracking-wider">
                      Crypto Payment • Instant Activation • No Subscription
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Phase 5: CTA */}
        <section className="py-20 md:py-32 bg-indigo-600 text-white relative overflow-hidden">
           <div className="max-w-4xl mx-auto px-6 text-center space-y-10 relative z-10">
              <div className="space-y-6">
                 <h2 className="text-4xl md:text-6xl font-black tracking-tighter">Start Logging Structural Data.</h2>
                 <p className="text-xl font-medium text-indigo-100 max-w-2xl mx-auto">Build discipline, discover your true expectancy, and treat your trading like a probability business.</p>
              </div>
              <Link href="/signup" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-indigo-900 rounded-xl font-black uppercase tracking-[0.15em] text-xs hover:scale-105 transition-transform shadow-2xl">
                 Create Your Account <ChevronRight size={16} />
              </Link>
           </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 py-12 text-center md:text-left">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <TrendingUp size={20} className="text-white" />
            <span className="font-black text-lg tracking-tighter text-white">SMC JOURNAL</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            © 2026 SMC Journal. Built for disciplined traders.
          </p>
        </div>
      </footer>
    </div>
  );
}
