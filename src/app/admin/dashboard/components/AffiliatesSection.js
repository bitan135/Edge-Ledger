'use client';

import { useState } from 'react';
import {
  Users, DollarSign, MousePointer2, TrendingUp, Plus, Loader2,
  Copy, CheckCircle2, ChevronDown, ChevronUp, Eye, EyeOff, XCircle, CreditCard
} from 'lucide-react';

export default function AffiliatesSection({ stats, partners, loading, fetchData }) {
  const [showCreate, setShowCreate] = useState(false);
  const [expandedPartner, setExpandedPartner] = useState(null);
  const [payoutModal, setPayoutModal] = useState(null);
  const [credentials, setCredentials] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState('');

  // Form state
  const [newPartner, setNewPartner] = useState({
    name: '', email: '', couponCode: '',
    commissionRate: '0.10', discountRate: '0.10',
    channelName: '', channelUrl: '',
  });
  const [createLoading, setCreateLoading] = useState(false);
  const [createError, setCreateError] = useState('');

  // Payout form
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutNote, setPayoutNote] = useState('');
  const [payoutLoading, setPayoutLoading] = useState(false);

  // Edit rate
  const [editingRate, setEditingRate] = useState(null);
  const [editRateValue, setEditRateValue] = useState('');
  const [editRateLoading, setEditRateLoading] = useState(false);

  const copyText = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);
  };

  const handleCreatePartner = async (e) => {
    e.preventDefault();
    setCreateLoading(true);
    setCreateError('');
    setCredentials(null);

    try {
      const res = await fetch('/api/admin/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPartner),
      });
      const data = await res.json();
      if (res.ok) {
        setCredentials(data.credentials);
        setNewPartner({ name: '', email: '', couponCode: '', commissionRate: '0.10', discountRate: '0.10', channelName: '', channelUrl: '' });
        fetchData();
      } else {
        setCreateError(data.error || 'Failed to create');
      }
    } catch {
      setCreateError('Connection failed');
    } finally {
      setCreateLoading(false);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    await fetch(`/api/admin/partners/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchData();
  };

  const handleSaveRate = async (id) => {
    setEditRateLoading(true);
    await fetch(`/api/admin/partners/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ commissionRate: parseFloat(editRateValue) }),
    });
    setEditingRate(null);
    setEditRateLoading(false);
    fetchData();
  };

  const handlePayout = async (id) => {
    setPayoutLoading(true);
    const res = await fetch(`/api/admin/partners/${id}/payout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: parseFloat(payoutAmount), note: payoutNote }),
    });
    if (res.ok) {
      setPayoutModal(null);
      setPayoutAmount('');
      setPayoutNote('');
      fetchData();
    }
    setPayoutLoading(false);
  };

  if (loading) {
    return <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-amber-500" /></div>;
  }

  const s = stats?.stats || {};

  return (
    <div className="space-y-8 animate-in fade-in zoom-in-95 duration-200">
      {/* Overview Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          { l: 'Active Partners', v: s.activePartners || 0, c: 'text-amber-400', icon: Users },
          { l: 'Total Clicks', v: s.totalClicks || 0, c: 'text-blue-400', icon: MousePointer2 },
          { l: 'Conversions', v: s.totalConversions || 0, c: 'text-emerald-400', icon: TrendingUp },
          { l: 'Commissions Owed', v: `$${(s.owedCommissions || 0).toFixed(2)}`, c: 'text-rose-400', icon: DollarSign },
        ].map((st, i) => (
          <div key={i} className="p-4 sm:p-6 rounded-2xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-white/25 whitespace-nowrap truncate">{st.l}</span>
              <st.icon size={14} className="text-white/10 shrink-0" />
            </div>
            <p className={`text-xl sm:text-2xl font-black tracking-tight ${st.c} whitespace-nowrap truncate`}>{st.v}</p>
          </div>
        ))}
      </div>

      {/* Secondary Stats Row */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4">
        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10 text-center">
          <p className="text-[8px] font-black uppercase tracking-widest text-emerald-500/50 mb-1">Total Paid</p>
          <p className="text-lg font-black text-emerald-400">${(s.paidCommissions || 0).toFixed(2)}</p>
        </div>
        <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 text-center">
          <p className="text-[8px] font-black uppercase tracking-widest text-amber-500/50 mb-1">Total Commissions</p>
          <p className="text-lg font-black text-amber-400">${(s.totalCommissions || 0).toFixed(2)}</p>
        </div>
        <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/10 text-center">
          <p className="text-[8px] font-black uppercase tracking-widest text-purple-500/50 mb-1">Applications</p>
          <p className="text-lg font-black text-purple-400">{s.pendingApplications || 0}</p>
        </div>
      </div>

      {/* Create Partner Section */}
      <div>
        <button
          onClick={() => { setShowCreate(!showCreate); setCredentials(null); setCreateError(''); }}
          className="flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 transition-all"
        >
          <Plus size={16} /> {showCreate ? 'Close Form' : 'Create New Partner'}
        </button>

        {showCreate && (
          <div className="mt-4 p-6 rounded-2xl bg-white/[0.02] border border-white/5">
            <form onSubmit={handleCreatePartner} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Partner Name', key: 'name', type: 'text', placeholder: 'John Doe', required: true },
                { label: 'Email', key: 'email', type: 'email', placeholder: 'partner@example.com', required: true },
                { label: 'Coupon Code', key: 'couponCode', type: 'text', placeholder: 'JOHN20', required: true },
                { label: 'Channel Name', key: 'channelName', type: 'text', placeholder: 'YouTube / Discord' },
                { label: 'Channel URL', key: 'channelUrl', type: 'text', placeholder: 'https://...' },
                { label: 'Commission Rate (0-1)', key: 'commissionRate', type: 'number', placeholder: '0.10' },
                { label: 'Discount Rate (0-1)', key: 'discountRate', type: 'number', placeholder: '0.10' },
              ].map(f => (
                <div key={f.key}>
                  <label className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1 block">{f.label}</label>
                  <input
                    required={f.required} type={f.type} placeholder={f.placeholder}
                    value={newPartner[f.key]}
                    onChange={e => setNewPartner({ ...newPartner, [f.key]: e.target.value })}
                    step={f.type === 'number' ? '0.01' : undefined}
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-bold outline-none focus:border-amber-500/50 transition-colors placeholder:text-white/15"
                  />
                </div>
              ))}
              <div className="md:col-span-2 flex items-center gap-4">
                <button disabled={createLoading} type="submit" className="px-6 py-3 rounded-lg bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-amber-400 disabled:opacity-50 transition-all flex items-center gap-2">
                  {createLoading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Create Partner
                </button>
                {createError && <span className="text-red-400 text-xs font-bold">{createError}</span>}
              </div>
            </form>

            {credentials && (
              <div className="mt-6 p-5 rounded-xl bg-emerald-500/5 border border-emerald-500/20 animate-in fade-in flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-400" />
                  <span className="text-sm font-black text-emerald-400">Partner Created — Share These Credentials</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/30 block mb-1">Email</span>
                    <div className="flex items-center gap-2">
                      <code className="text-amber-400 font-mono text-xs">{credentials.email}</code>
                      <button onClick={() => copyText(credentials.email, 'email')} className="p-1 rounded hover:bg-white/10 transition-colors">
                        {copied === 'email' ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} className="text-white/30" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/30 block mb-1">Password</span>
                    <div className="flex items-center gap-2">
                      <code className="text-amber-400 font-mono text-xs">{showPassword ? credentials.password : '••••••••••••'}</code>
                      <button onClick={() => setShowPassword(!showPassword)} className="p-1 rounded hover:bg-white/10 transition-colors">
                        {showPassword ? <EyeOff size={12} className="text-white/30" /> : <Eye size={12} className="text-white/30" />}
                      </button>
                      <button onClick={() => copyText(credentials.password, 'pass')} className="p-1 rounded hover:bg-white/10 transition-colors">
                        {copied === 'pass' ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} className="text-white/30" />}
                      </button>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/30 block mb-1">Login URL</span>
                    <div className="flex items-center gap-2">
                      <code className="text-white/50 font-mono text-xs">{credentials.loginUrl}</code>
                      <button onClick={() => copyText(credentials.loginUrl, 'url')} className="p-1 rounded hover:bg-white/10 transition-colors">
                        {copied === 'url' ? <CheckCircle2 size={12} className="text-emerald-400" /> : <Copy size={12} className="text-white/30" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Partners Table */}
      <div className="rounded-2xl bg-white/[0.02] border border-white/5 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-lg font-black tracking-tight">All Partners ({partners.length})</h2>
        </div>

        <div className="divide-y divide-white/5">
          {partners.length === 0 ? (
            <div className="p-12 text-center text-white/20 font-medium">No partners yet</div>
          ) : (
            partners.map(p => (
              <div key={p.id} className="group">
                {/* Partner Row */}
                <div
                  className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 cursor-pointer hover:bg-white/[0.02] transition-colors"
                  onClick={() => setExpandedPartner(expandedPartner === p.id ? null : p.id)}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className={`w-2 h-2 rounded-full shrink-0 ${p.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-white truncate">{p.name}</p>
                      <p className="text-[10px] text-white/30 font-mono truncate">{p.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 sm:gap-6 text-xs shrink-0 flex-wrap">
                    <div className="text-center w-20">
                      <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-0.5">Code</p>
                      <p className="font-mono font-bold text-amber-400 whitespace-nowrap">{p.coupon_code}</p>
                    </div>
                    <div className="text-center w-12 hidden sm:block">
                      <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-0.5">Sales</p>
                      <p className="font-bold text-white/60">{p.stats.conversions}</p>
                    </div>
                    <div className="text-center w-16">
                      <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-0.5">Earned</p>
                      <p className="font-bold text-emerald-400">${p.stats.totalCommission.toFixed(2)}</p>
                    </div>
                    <div className="text-center w-16">
                      <p className="text-[8px] font-black uppercase tracking-widest text-white/20 mb-0.5">Owed</p>
                      <p className="font-bold text-rose-400">${p.stats.pendingCommission.toFixed(2)}</p>
                    </div>
                    {expandedPartner === p.id ? <ChevronUp size={14} className="text-white/20" /> : <ChevronDown size={14} className="text-white/20" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedPartner === p.id && (
                  <div className="px-4 sm:px-6 pb-5 pt-1 bg-white/[0.01] border-t border-white/5 animate-in slide-in-from-top-2 duration-100">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4 text-xs">
                      <div><span className="text-white/25 block text-[8px] font-black uppercase tracking-widest">ID</span><span className="font-mono text-white/40 break-all text-[10px]">{p.id}</span></div>
                      <div><span className="text-white/25 block text-[8px] font-black uppercase tracking-widest">Clicks</span><span className="font-bold">{p.stats.clicks}</span></div>
                      <div><span className="text-white/25 block text-[8px] font-black uppercase tracking-widest">Signups</span><span className="font-bold">{p.stats.signups}</span></div>
                      <div><span className="text-white/25 block text-[8px] font-black uppercase tracking-widest">Paid Out</span><span className="font-bold text-emerald-400">${p.stats.paidCommission.toFixed(2)}</span></div>
                    </div>

                    <div className="flex flex-wrap gap-2 items-center">
                      {/* Toggle Status */}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleStatus(p.id, p.status); }}
                        className={`px-3 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 ${
                          p.status === 'active'
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 hover:bg-emerald-500/20'
                        }`}
                      >
                        {p.status === 'active' ? <><XCircle size={12} /> Deactivate</> : <><CheckCircle2 size={12} /> Activate</>}
                      </button>

                      {/* Edit Commission Rate */}
                      {editingRate === p.id ? (
                        <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
                          <input
                            type="number" step="0.01" min="0" max="1"
                            value={editRateValue}
                            onChange={e => setEditRateValue(e.target.value)}
                            className="w-20 px-2 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-bold outline-none focus:border-amber-500/50"
                          />
                          <button
                            disabled={editRateLoading}
                            onClick={() => handleSaveRate(p.id)}
                            className="px-3 py-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-black uppercase tracking-widest hover:bg-amber-500/20 transition-all"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingRate(null)}
                            className="px-2 py-2 rounded-lg bg-white/5 text-white/30 text-[9px] font-black uppercase tracking-widest hover:bg-white/10"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={(e) => { e.stopPropagation(); setEditingRate(p.id); setEditRateValue(String(p.commission_rate || 0.10)); }}
                          className="px-3 py-2 rounded-lg bg-white/5 text-white/40 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white/10 transition-all"
                        >
                          Rate: {((p.commission_rate || 0.10) * 100).toFixed(0)}% — Edit
                        </button>
                      )}

                      {/* Payout Button */}
                      {p.stats.pendingCommission > 0 && (
                        <button
                          onClick={(e) => { e.stopPropagation(); setPayoutModal(p.id); setPayoutAmount(String(p.stats.pendingCommission)); }}
                          className="px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500/20 transition-all flex items-center gap-1.5"
                        >
                          <CreditCard size={12} /> Mark Payout
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Payout Modal */}
      {payoutModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={() => setPayoutModal(null)}>
          <div className="w-full max-w-sm bg-[#111] border border-white/10 rounded-2xl p-6" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-black mb-4 flex items-center gap-2"><CreditCard size={18} className="text-emerald-400" /> Record Payout</h3>
            <div className="space-y-4">
              <div>
                <label className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1 block">Amount ($)</label>
                <input
                  type="number" step="0.01" value={payoutAmount}
                  onChange={e => setPayoutAmount(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-bold outline-none focus:border-emerald-500/50"
                />
              </div>
              <div>
                <label className="text-[8px] font-black uppercase tracking-widest text-white/30 mb-1 block">Note (optional)</label>
                <input
                  type="text" value={payoutNote} placeholder="e.g. PayPal transfer"
                  onChange={e => setPayoutNote(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-bold outline-none focus:border-emerald-500/50 placeholder:text-white/15"
                />
              </div>
              <div className="flex gap-3">
                <button
                  disabled={payoutLoading || !payoutAmount}
                  onClick={() => handlePayout(payoutModal)}
                  className="flex-1 py-3 rounded-lg bg-emerald-500 text-black text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {payoutLoading ? <Loader2 size={14} className="animate-spin" /> : 'Confirm Payout'}
                </button>
                <button onClick={() => setPayoutModal(null)} className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest hover:bg-white/10">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
