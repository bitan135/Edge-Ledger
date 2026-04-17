'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Users, Crown, Search, Filter, Loader2, ChevronDown, ChevronUp,
  Settings, CheckCircle2, XCircle, Trash2, ShieldAlert
} from 'lucide-react';

export default function UsersSection() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(20);
  
  // Filters
  const [search, setSearch] = useState('');
  const [planFilter, setPlanFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const [expandedUser, setExpandedUser] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [extendUserId, setExtendUserId] = useState(null);
  const [extendMonths, setExtendMonths] = useState(1);

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/users?page=${page}&limit=${limit}&search=${encodeURIComponent(search)}&plan=${planFilter}&status=${statusFilter}`);
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
        setStats(data.stats);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, planFilter, statusFilter]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleUpdateUser = async (id, updates) => {
    if (!confirm('Are you sure you want to update this user?')) return;
    setActionLoading(true);
    await fetch(`/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    setActionLoading(false);
    fetchUsers();
  };

  const handleExtendPro = async (id) => {
    if (!extendMonths || isNaN(extendMonths) || extendMonths < 1) return;
    setActionLoading(true);
    const res = await fetch(`/api/admin/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ extendMonths: Number(extendMonths) }),
    });
    setActionLoading(false);
    if (res.ok) {
      alert(`Successfully extended Pro plan by ${extendMonths} months.`);
      setExtendUserId(null);
      fetchUsers();
    } else {
      alert('Failed to extend Pro plan.');
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm('CRITICAL: Are you sure you want to completely DELETE this user? This cannot be undone.')) return;
    setActionLoading(true);
    await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
    setActionLoading(false);
    fetchUsers();
  };

  if (loading && !stats) {
    return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-amber-500" /></div>;
  }

  const s = stats || {};

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { l: 'Total Users', v: s.totalUsers || 0, c: 'text-amber-400', icon: Users },
          { l: 'Free Users', v: s.freeUsers || 0, c: 'text-white/60', icon: Users },
          { l: 'Pro Users', v: s.proUsers || 0, c: 'text-emerald-400', icon: Crown },
          { l: 'Lifetime Users', v: s.lifetimeUsers || 0, c: 'text-purple-400', icon: ShieldAlert },
        ].map((st, i) => (
          <div key={i} className="p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-white/25">{st.l}</span>
              <st.icon size={14} className="text-white/10 shrink-0" />
            </div>
            <p className={`text-xl sm:text-2xl font-black tracking-tight ${st.c}`}>{st.v}</p>
          </div>
        ))}
      </div>

      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" />
          <input
            type="text"
            placeholder="Search by email, name, or coupon code..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-white text-sm outline-none focus:border-amber-500/50"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={planFilter}
            onChange={(e) => { setPlanFilter(e.target.value); setPage(1); }}
            className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-white/60 text-sm outline-none focus:border-amber-500/50"
          >
            <option value="all">All Plans</option>
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="lifetime">Lifetime</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            className="px-4 py-3 rounded-xl bg-white/[0.02] border border-white/5 text-white/60 text-sm outline-none focus:border-amber-500/50"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
        <div className="divide-y divide-white/5">
          {users.length === 0 ? (
            <div className="p-12 text-center text-white/20 font-medium tracking-wide">No users found</div>
          ) : (
            users.map(u => (
              <div key={u.id} className="group hover:bg-white/[0.02] transition-colors relative">
                <div
                  className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 cursor-pointer"
                  onClick={() => setExpandedUser(expandedUser === u.id ? null : u.id)}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${u.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white truncate flex items-center gap-2">
                        {u.name}
                        {u.plan === 'lifetime' && <span className="px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-400 text-[8px] uppercase tracking-widest font-black">Lifetime</span>}
                        {(u.plan === 'pro' || u.plan === 'pro_monthly') && <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-400 text-[8px] uppercase tracking-widest font-black">Pro</span>}
                      </p>
                      <p className="text-[10px] text-white/30 font-mono truncate">{u.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 text-xs shrink-0 flex-wrap">
                    <div className="text-center w-24">
                      <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-0.5">Joined</p>
                      <p className="font-mono text-white/40">{new Date(u.joinDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-center w-24 hidden sm:block">
                      <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-0.5">Last Login</p>
                      <p className="font-mono text-white/40">{u.lastLogin ? new Date(u.lastLogin).toLocaleDateString() : 'Never'}</p>
                    </div>
                    <div className="text-center w-24">
                      <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-0.5">Referred By</p>
                      <p className="font-bold text-amber-400 truncate max-w-[80px] leading-tight">{u.couponCode || '--'}</p>
                    </div>
                    {expandedUser === u.id ? <ChevronUp size={14} className="text-white/20" /> : <ChevronDown size={14} className="text-white/20" />}
                  </div>
                </div>

                {expandedUser === u.id && (
                  <div className="px-4 sm:px-6 pb-5 pt-3 bg-white/[0.01] border-t border-white/5 animate-in slide-in-from-top-2 duration-100">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-white/30 block mb-1">User ID (Auth)</span>
                        <code className="text-xs font-mono text-white/50 bg-black/50 px-2 py-1 rounded">{u.id}</code>
                      </div>
                      <div>
                        <span className="text-[8px] font-black uppercase tracking-widest text-white/30 block mb-1">Affiliate Partner</span>
                        <p className="text-xs font-bold text-white/70">{u.partnerName || 'None'}</p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 mt-4 pt-4 border-t border-white/5">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/20 mr-2 flex items-center gap-1"><Settings size={12}/> Admin Actions:</span>
                      
                      {/* Plan Modifiers */}
                      {u.plan !== 'lifetime' && (
                        <button disabled={actionLoading} onClick={() => handleUpdateUser(u.id, { plan: 'lifetime', isPro: true })} className="px-3 py-2 rounded bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[9px] font-black uppercase tracking-widest hover:bg-purple-500/20 transition-all">
                          Grant Lifetime
                        </button>
                      )}
                      
                      {u.plan !== 'lifetime' && extendUserId === u.id ? (
                        <div className="flex items-center gap-2">
                          <input 
                            type="number" min="1" max="120"
                            value={extendMonths}
                            onChange={e => setExtendMonths(e.target.value)}
                            className="w-16 px-2 py-1.5 rounded bg-white/5 border border-white/10 text-white text-xs font-bold outline-none focus:border-amber-500/50"
                          />
                          <span className="text-[9px] font-black uppercase tracking-widest text-white/30 mr-1">Months</span>
                          <button disabled={actionLoading} onClick={() => handleExtendPro(u.id)} className="px-3 py-2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-black uppercase tracking-widest hover:bg-amber-500/20 transition-all">
                            Confirm
                          </button>
                          <button onClick={() => setExtendUserId(null)} className="px-2 py-2 rounded bg-white/5 text-white/30 text-[9px] font-black uppercase tracking-widest hover:bg-white/10">
                            ✕
                          </button>
                        </div>
                      ) : (
                        u.plan !== 'lifetime' && (
                          <button onClick={() => { setExtendUserId(u.id); setExtendMonths(1); }} className="px-3 py-2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-black uppercase tracking-widest hover:bg-amber-500/20 transition-all">
                            Extend Pro Plan
                          </button>
                        )
                      )}

                      {u.plan !== 'free' && (
                        <button disabled={actionLoading} onClick={() => handleUpdateUser(u.id, { plan: 'free', isPro: false })} className="px-3 py-2 rounded bg-white/5 text-white/40 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                          Downgrade Free
                        </button>
                      )}

                      <div className="h-4 w-px bg-white/10 mx-1"></div>

                      {/* Status Modifiers */}
                      <button 
                        disabled={actionLoading} 
                        onClick={() => handleUpdateUser(u.id, { status: u.status === 'active' ? 'inactive' : 'active' })} 
                        className={`px-3 py-2 rounded text-[9px] font-black uppercase tracking-widest transition-all ${
                          u.status === 'active' ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                        }`}
                      >
                        {u.status === 'active' ? 'Deactivate' : 'Activate'}
                      </button>

                      {/* Delete */}
                      <button disabled={actionLoading} onClick={() => handleDeleteUser(u.id)} className="px-3 py-2 rounded bg-red-500/10 text-red-400 border border-red-500/20 text-[9px] font-black uppercase tracking-widest hover:bg-red-500/20 transition-all flex items-center gap-1.5 ml-auto">
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-[10px] uppercase font-black tracking-widest text-white/30">Page {page} of {totalPages}</p>
          <div className="flex gap-2">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-xs font-bold hover:bg-white/5 disabled:opacity-50">Prev</button>
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-4 py-2 rounded-lg bg-white/[0.02] border border-white/5 text-xs font-bold hover:bg-white/5 disabled:opacity-50">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
