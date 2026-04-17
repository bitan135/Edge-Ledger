'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, LogOut, Users, Users as UsersIcon, Handshake } from 'lucide-react';
import AffiliatesSection from './components/AffiliatesSection';
import UsersSection from './components/UsersSection';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('affiliates'); // 'affiliates' | 'users'
  
  const [stats, setStats] = useState(null);
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = useCallback(async () => {
    try {
      const [meRes, statsRes, partnersRes] = await Promise.all([
        fetch('/api/admin/me'),
        fetch('/api/admin/stats'),
        fetch('/api/admin/partners'),
      ]);

      if (!meRes.ok) { router.push('/admin/login'); return; }

      if (statsRes.ok) setStats(await statsRes.json());
      if (partnersRes.ok) {
        const d = await partnersRes.json();
        setPartners(d.partners || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-20">
      {/* Header */}
      <nav className="border-b border-white/5 bg-black/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <ShieldAlert size={18} className="text-amber-500" />
            </div>
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-amber-500 leading-none">Super Admin</p>
              <p className="text-sm font-bold text-white/60 leading-tight">Control Center</p>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold hover:bg-red-500/10 hover:text-red-400 transition-all">
            <LogOut size={14} /> Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-6 border-t border-white/5 pt-3 pb-3">
          <button 
            onClick={() => setActiveTab('affiliates')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'affiliates' 
                ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            <Handshake size={14} /> Affiliate Partners
          </button>
          <button 
            onClick={() => setActiveTab('users')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
              activeTab === 'users' 
                ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' 
                : 'text-white/40 hover:text-white/80'
            }`}
          >
            <UsersIcon size={14} /> User CRM
          </button>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-8">
        {activeTab === 'affiliates' ? (
          <AffiliatesSection 
            stats={stats} 
            partners={partners} 
            loading={loading} 
            fetchData={fetchData} 
          />
        ) : (
          <UsersSection />
        )}
      </main>
    </div>
  );
}
