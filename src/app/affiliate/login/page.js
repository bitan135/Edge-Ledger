'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TrendingUp, Lock, ArrowRight, Loader2, ShieldCheck } from 'lucide-react';

export default function AffiliateLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/affiliate/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (res.ok) {
        router.push('/affiliate/dashboard');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      setError('Connection failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 selection:bg-[var(--accent)]/30">
      <div className="w-full max-w-md relative">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-[var(--accent)]/10 blur-[100px] -z-10 animate-pulse" />
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-purple-600/10 blur-[100px] -z-10 animate-pulse" />

        <div className="text-center mb-12">
          <Link href="/affiliate" className="inline-flex items-center gap-3 mb-8 group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent)] to-purple-600 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
              <TrendingUp size={24} className="text-white" />
            </div>
          </Link>
          <h1 className="text-3xl font-black tracking-tighter mb-2">Partner Portal</h1>
          <p className="text-white/40 font-medium tracking-tight">Access your affiliate toolkit and stats.</p>
        </div>

        <div className="p-8 md:p-10 rounded-[40px] glass-card border-white/5 shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Email Address</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-[var(--accent)]/50 focus:bg-white/[0.08] transition-all outline-none"
                placeholder="partner@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-2">Password</label>
              <div className="relative">
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-6 py-4 rounded-2xl bg-white/5 border border-white/10 focus:border-[var(--accent)]/50 focus:bg-white/[0.08] transition-all outline-none pr-12"
                  placeholder="••••••••"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20">
                    <Lock size={18} />
                </div>
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold text-center animate-shake">
                {error}
              </div>
            )}

            <button 
              disabled={isLoading}
              className="w-full py-5 rounded-2xl bg-[var(--accent)] text-black font-black uppercase tracking-widest hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl shadow-[var(--accent)]/10"
            >
              {isLoading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <>Sign In <ArrowRight size={20} /></>
              )}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center space-y-4">
          <p className="text-white/30 text-xs font-bold flex items-center justify-center gap-2">
            <ShieldCheck size={14} className="text-[var(--accent)]" /> 
            Secure Partner Authentication
          </p>
          <Link href="/" className="inline-block text-white/20 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
            ← Back to SMC Journal
          </Link>
        </div>
      </div>
    </div>
  );
}
