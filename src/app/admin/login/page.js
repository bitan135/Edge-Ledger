'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, ShieldAlert, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch {
      setError('Connection failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 font-sans">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mx-auto mb-6">
            <ShieldAlert size={28} className="text-amber-500" />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white mb-2">Admin Access</h1>
          <p className="text-xs font-bold text-white/30 uppercase tracking-widest">Restricted — Super Admin Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-2 block">Email</label>
            <input
              required type="email" value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-amber-500/50 transition-colors text-sm placeholder:text-white/15"
              placeholder="admin@smcjournal.app"
            />
          </div>
          <div>
            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 mb-2 block">Password</label>
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
              <input
                required type="password" value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full pl-11 pr-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-bold outline-none focus:border-amber-500/50 transition-colors text-sm placeholder:text-white/15"
                placeholder="••••••••••"
              />
            </div>
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold text-center">
              {error}
            </div>
          )}

          <button
            disabled={loading}
            className="w-full py-4 rounded-xl bg-amber-500 text-black font-black uppercase tracking-widest text-[11px] hover:bg-amber-400 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : 'Authenticate'}
          </button>
        </form>

        <p className="text-center text-[9px] text-white/15 font-bold uppercase tracking-widest mt-8">
          This panel is not publicly linked
        </p>
      </div>
    </div>
  );
}
