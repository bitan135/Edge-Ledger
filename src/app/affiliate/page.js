'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Users, 
  Target, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2,
  Globe,
  Zap,
  DollarSign
} from 'lucide-react';

export default function AffiliatePublicPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    channelUrl: '',
    platform: 'YouTube',
    audienceSize: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/affiliate/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) setIsSuccess(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[var(--accent)]/30">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[var(--accent)] to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <TrendingUp size={22} className="text-white" />
            </div>
            <span className="text-xl font-black tracking-tighter">SMC JOURNAL</span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/affiliate/login" className="text-sm font-bold text-white/60 hover:text-white transition-colors">
              Partner Login
            </Link>
            <Link href="#apply" className="px-5 py-2.5 rounded-xl bg-[var(--accent)] text-black text-sm font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-lg shadow-[var(--accent)]/20">
              Become a Partner
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 text-center mb-32">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 border border-[var(--accent)]/20 mb-8 animate-fade-in">
            <Users size={16} className="text-[var(--accent)]" />
            <span className="text-[10px] font-black uppercase tracking-widest text-[var(--accent)]">Official Partner Program</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">
            Empower Your Audience.<br/>
            <span className="text-gradient">Earn Lifetime Rewards.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-white/50 font-medium mb-12">
            Join the most advanced quantitative trading journal community. Help SMC traders master their psychology and get rewarded for every successful conversion.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="#apply" className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-black text-base font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl">
              Apply Now
            </Link>
            <div className="flex items-center gap-4 text-white/40">
              <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-zinc-800" />
                ))}
              </div>
              <span className="text-xs font-bold font-mono">50+ Partners Joined</span>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: DollarSign, title: 'High Commission', desc: 'Earn up to 20% on every subscription. No caps on earnings.' },
              { icon: ShieldCheck, title: 'Lifetime Attribution', desc: 'Our cookies never expire. Once they sign up, they are yours for life.' },
              { icon: Zap, title: 'Instant Payouts', desc: 'Secure monthly payouts via Stripe or PayPal once you hit the threshold.' }
            ].map((b, i) => (
              <div key={i} className="p-8 rounded-[32px] glass-card border-white/5 hover:border-[var(--accent)]/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <b.icon size={28} className="text-[var(--accent)]" />
                </div>
                <h3 className="text-xl font-bold mb-4">{b.title}</h3>
                <p className="text-white/40 leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Application Form */}
        <section id="apply" className="max-w-3xl mx-auto px-6">
          <div className="relative p-8 md:p-12 rounded-[40px] glass-card border-white/5 overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--accent)]/10 blur-[100px] -z-10" />
            
            {isSuccess ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-8 animate-bounce">
                  <CheckCircle2 size={40} className="text-emerald-500" />
                </div>
                <h2 className="text-3xl font-black mb-4">Application Received!</h2>
                <p className="text-white/50 mb-8">Our team will review your channel and get back to you within 48 hours via email.</p>
                <button onClick={() => setIsSuccess(false)} className="text-[var(--accent)] font-bold hover:underline">Send another application</button>
              </div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-3xl font-black mb-4">Partner Application</h2>
                  <p className="text-white/40">Tell us about your audience and how you plan to promote SMC Journal.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Full Name</label>
                      <input 
                        required
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-[var(--accent)]/50 focus:bg-white/[0.08] transition-all outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Email Address</label>
                      <input 
                        required
                        type="email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-[var(--accent)]/50 focus:bg-white/[0.08] transition-all outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Platform</label>
                      <select 
                        value={formData.platform}
                        onChange={e => setFormData({...formData, platform: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-[#111] border border-white/10 focus:border-[var(--accent)]/50 transition-all outline-none appearance-none"
                      >
                        <option>YouTube</option>
                        <option>Instagram</option>
                        <option>Twitter / X</option>
                        <option>Telegram</option>
                        <option>Trading Blog</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Audience Size</label>
                      <input 
                        type="text" 
                        value={formData.audienceSize}
                        onChange={e => setFormData({...formData, audienceSize: e.target.value})}
                        className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-[var(--accent)]/50 transition-all outline-none"
                        placeholder="e.g. 10k subscribers"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Channel / Profile URL</label>
                    <input 
                      required
                      type="url" 
                      value={formData.channelUrl}
                      onChange={e => setFormData({...formData, channelUrl: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-[var(--accent)]/50 transition-all outline-none"
                      placeholder="https://youtube.com/@yourchannel"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Message (Optional)</label>
                    <textarea 
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-[var(--accent)]/50 transition-all outline-none h-32 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <button 
                    disabled={isSubmitting}
                    className="w-full py-5 rounded-2xl bg-[var(--accent)] text-black font-black uppercase tracking-widest hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    {!isSubmitting && <ArrowRight size={20} />}
                  </button>
                </form>
              </>
            )}
          </div>
        </section>
      </main>

      <footer className="border-t border-white/5 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3 opacity-50">
            <TrendingUp size={18} />
            <span className="text-sm font-bold tracking-tight">SMC Journal Partner Program</span>
          </div>
          <p className="text-white/20 text-xs font-medium">© 2026 SMC Journal. All rights reserved.</p>
          <div className="flex items-center gap-8">
            <Link href="/terms" className="text-xs text-white/30 hover:text-white transition-colors">Terms</Link>
            <Link href="/privacy" className="text-xs text-white/30 hover:text-white transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
