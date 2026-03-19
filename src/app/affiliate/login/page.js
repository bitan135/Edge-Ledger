'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { TrendingUp, Lock, ArrowRight, Loader2, ShieldCheck, Mail } from 'lucide-react';

export default function AffiliateLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

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

  if (!mounted) return <div className="min-h-screen bg-background" />;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 selection:bg-accent/30 font-sans relative overflow-hidden">
      {/* Premium Ambience Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 z-0 opacity-[0.02] pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <div className="w-full max-w-md relative z-10 animate-fade-in">
        <div className="text-center mb-12">
          <Link href="/affiliate" className="inline-flex items-center gap-3 mb-8 group">
            <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center shadow-2xl shadow-accent/20 group-hover:scale-110 transition-transform">
              <TrendingUp size={28} className="text-white" />
            </div>
          </Link>
          <h1 className="text-4xl font-black tracking-tightest mb-4 text-text-primary">Partner Portal</h1>
          <p className="text-lg font-medium text-text-secondary">Secure login for the elite SMC partners.</p>
        </div>

        <div className="p-10 rounded-[48px] glass-card border-border-custom shadow-premium bg-card/10 backdrop-blur-3xl">
          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-2">Institutional Email</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors">
                  <Mail size={18} />
                </div>
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/[0.03] border border-border-custom focus:border-accent focus:bg-white/[0.08] transition-all outline-none font-bold text-text-primary placeholder:text-text-muted/30"
                  placeholder="partner@example.com"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-muted ml-2">Secure Passkey</label>
              <div className="relative group">
                <div className="absolute left-6 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-accent transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 rounded-2xl bg-white/[0.03] border border-border-custom focus:border-accent focus:bg-white/[0.08] transition-all outline-none font-bold text-text-primary placeholder:text-text-muted/30"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-black text-center animate-shake uppercase tracking-widest">
                {error}
              </div>
            )}

            <button 
              disabled={isLoading}
              className="w-full py-6 rounded-2xl bg-accent text-white font-black uppercase tracking-[0.2em] text-xs hover:bg-accent-hover hover:scale-[1.02] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3 shadow-2xl shadow-accent/20 border-none"
            >
              {isLoading ? (
                <Loader2 size={24} className="animate-spin" />
              ) : (
                <>Sign In to Vault <ArrowRight size={20} /></>
              )}
            </button>
          </form>
        </div>

        <div className="mt-12 text-center space-y-6">
          <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck size={14} /> 256-bit Partner Encryption
          </p>
          <div>
            <Link href="/affiliate" className="text-text-muted hover:text-text-primary transition-colors text-[10px] font-black uppercase tracking-[0.2em] border-b border-transparent hover:border-text-primary pb-1">
              ← Back to Affiliate Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
