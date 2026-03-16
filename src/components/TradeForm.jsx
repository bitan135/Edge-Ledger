'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, Camera, Check, Target, TrendingUp, Binary, BarChart3, AlertCircle 
} from 'lucide-react';
import { 
  INSTRUMENTS, SESSIONS, SMC_TAGS, 
  calculateRR, calculatePips 
} from '@/lib/storage';

export default function TradeForm({ initialData = null, onSubmit, isSubmitting, submitLabel = 'Log Sequence', strategies = [] }) {
  const [formData, setFormData] = useState({
    instrument: 'EURUSD',
    direction: 'Buy',
    entryPrice: '',
    stopLoss: '',
    takeProfit: '',
    lotSize: '0.01',
    result: 'Win',
    session: 'London',
    strategy: '',
    smcTags: [],
    notes: '',
    screenshotBefore: null,
    screenshotAfter: null,
    ...initialData,
    // Ensure numeric values are strings for input fields if they exist
    entryPrice: initialData?.entry_price || initialData?.entryPrice || '',
    stopLoss: initialData?.stop_loss || initialData?.stopLoss || '',
    takeProfit: initialData?.take_profit || initialData?.takeProfit || '',
    lotSize: initialData?.lot_size || initialData?.lotSize || '0.01',
    smcTags: initialData?.smc_tags || initialData?.smcTags || [],
    screenshotBefore: initialData?.screenshot_before || initialData?.screenshotBefore || null,
    screenshotAfter: initialData?.screenshot_after || initialData?.screenshotAfter || null,
  });

  const [errors, setErrors] = useState({});
  const [autoCalc, setAutoCalc] = useState({ rr: 0, pips: 0 });

  useEffect(() => {
    if (strategies.length > 0 && !formData.strategy) {
      setFormData(prev => ({ ...prev, strategy: strategies[0] }));
    }
  }, [strategies]);

  useEffect(() => {
    if (formData.entryPrice && formData.stopLoss && formData.takeProfit) {
      const rr = calculateRR(formData.entryPrice, formData.stopLoss, formData.takeProfit, formData.direction);
      const pips = calculatePips(formData.entryPrice, formData.stopLoss, formData.instrument);
      setAutoCalc({ rr, pips });
    }
  }, [formData.entryPrice, formData.stopLoss, formData.takeProfit, formData.direction, formData.instrument]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleTagToggle = (tag) => {
    setFormData(prev => {
      const newTags = prev.smcTags.includes(tag)
        ? prev.smcTags.filter(t => t !== tag)
        : [...prev.smcTags, tag];
      return { ...prev, smcTags: newTags };
    });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, [field]: reader.result, [`${field}File`]: file }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.entryPrice) newErrors.entryPrice = 'Required';
    if (!formData.stopLoss) newErrors.stopLoss = 'Required';
    if (!formData.takeProfit) newErrors.takeProfit = 'Required';
    if (!formData.strategy) newErrors.strategy = 'Required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validate() || isSubmitting) return;
    
    // Prepare data for submission
    const finalData = {
      ...formData,
      rr: autoCalc.rr,
      pips: autoCalc.pips,
    };
    
    onSubmit(finalData);
  };

  return (
    <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column: Core Data */}
      <div className="lg:col-span-2 space-y-8">
        {/* Section 1: Instrument & Direction */}
        <div className="glass-card rounded-[40px] border-white/5 p-8 shadow-premium stagger-children">
          <h3 className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
            <Target size={14} /> Configuration
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Asset Pair</label>
              <select
                name="instrument"
                value={formData.instrument}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-black text-white outline-none focus:border-[var(--accent)] focus:bg-white/[0.08] transition-all appearance-none cursor-pointer"
              >
                {INSTRUMENTS.map(i => <option key={i} value={i} className="bg-[#0A0A0B]">{i}</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Order Flow</label>
              <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/10 h-[58px]">
                {['Buy', 'Sell'].map(d => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, direction: d }))}
                    className={`flex-1 flex items-center justify-center gap-2 text-[11px] font-black rounded-xl transition-all ${
                      formData.direction === d 
                        ? d === 'Buy' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                        : 'text-[var(--text-muted)] hover:text-white'
                    }`}
                  >
                    <TrendingUp size={14} className={d === 'Sell' ? 'rotate-180' : ''} />
                    {d.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Pricing Logic */}
        <div className="glass-card rounded-[40px] border-white/5 p-8 shadow-premium stagger-children">
          <h3 className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
            <Binary size={14} /> Execution Math
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { label: 'Institutional Entry', name: 'entryPrice', placeholder: '1.08540' },
              { label: 'Safety Cut (SL)', name: 'stopLoss', placeholder: '1.08320' },
              { label: 'Final Target (TP)', name: 'takeProfit', placeholder: '1.08980' },
            ].map(field => (
              <div key={field.name} className="space-y-3">
                <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">{field.label}</label>
                <input
                  type="number"
                  step="any"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  className={`w-full bg-white/5 border ${errors[field.name] ? 'border-rose-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-sm font-bold text-white placeholder:text-white/10 outline-none focus:border-[var(--accent)] focus:bg-white/[0.08] transition-all`}
                />
              </div>
            ))}
          </div>
          
          {/* Real-time Analytics Panel */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/[0.03] rounded-3xl p-6 border border-white/5 group hover:border-[var(--accent)]/30 transition-all">
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2 flex items-center gap-2">
                <BarChart3 size={12} className="text-[var(--accent)]" /> Performance Ratio
              </p>
              <p className={`text-2xl font-black tracking-tighter ${autoCalc.rr >= 2 ? 'text-emerald-400' : 'text-white'}`}>
                {autoCalc.rr}R
              </p>
            </div>
            <div className="bg-white/[0.03] rounded-3xl p-6 border border-white/5 group hover:border-[var(--accent)]/30 transition-all">
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest mb-2">Total Displacement</p>
              <p className="text-2xl font-black text-white tracking-tighter">
                {autoCalc.pips} <span className="text-[10px] text-[var(--text-muted)] uppercase font-black ml-1">Pips</span>
              </p>
            </div>
          </div>
        </div>

        {/* Section 3: Visual & Journal */}
        <div className="glass-card rounded-[40px] border-white/5 p-8 shadow-premium">
          <h3 className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
            <Camera size={14} /> Intelligence Archive
          </h3>
          <div className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Execution Reasoning</label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Log your technical confluences and psychological state..."
                className="w-full bg-white/5 border border-white/10 rounded-[24px] px-8 py-6 text-sm font-medium text-white placeholder:text-white/10 outline-none focus:border-[var(--accent)] focus:bg-white/[0.08] transition-all min-h-[160px] resize-none leading-relaxed"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['screenshotBefore', 'screenshotAfter'].map(field => (
                <div key={field} className="space-y-3">
                  <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">
                    {field === 'screenshotBefore' ? 'Setup Configuration' : 'Settlement View'}
                  </label>
                  <label className="relative flex flex-col items-center justify-center h-48 border-2 border-dashed border-white/10 rounded-[40px] bg-white/5 cursor-pointer hover:border-[var(--accent)] hover:bg-white/[0.08] transition-all overflow-hidden group">
                    {formData[field] ? (
                      <img src={formData[field]} alt="preview" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:rotate-6 transition-all">
                          <Camera className="text-[var(--text-muted)]" size={20} />
                        </div>
                        <span className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Add Frame</span>
                      </div>
                    )}
                    <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, field)} className="hidden" />
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Meta & Meta-logic */}
      <div className="space-y-8">
        <div className="glass-card rounded-[40px] border-white/5 p-8 shadow-premium sticky top-10">
          <h3 className="text-[10px] font-black text-[var(--accent)] uppercase tracking-[0.3em] mb-8 flex items-center gap-2">
            <Binary size={14} /> Sequence Data
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Outcome</label>
              <select
                name="result"
                value={formData.result}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-black text-white outline-none focus:border-[var(--accent)] focus:bg-white/[0.08] transition-all appearance-none cursor-pointer"
              >
                <option value="Win" className="bg-[#0A0A0B]">PROFITABLE (WIN)</option>
                <option value="Loss" className="bg-[#0A0A0B]">LIQUIDATED (LOSS)</option>
                <option value="Break Even" className="bg-[#0A0A0B]">NEUTRAL (BE)</option>
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Setup Type</label>
              <select
                name="strategy"
                value={formData.strategy}
                onChange={handleChange}
                className={`w-full bg-white/5 border ${errors.strategy ? 'border-rose-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-sm font-black text-white outline-none focus:border-[var(--accent)] focus:bg-white/[0.08] transition-all appearance-none cursor-pointer`}
              >
                {strategies.map(s => <option key={s} value={s} className="bg-[#0A0A0B]">{s.toUpperCase()}</option>)}
              </select>
            </div>
            <div className="space-y-3 font-bold">
              <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Market Window</label>
              <select
                name="session"
                value={formData.session}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-black text-white outline-none focus:border-[var(--accent)] focus:bg-white/[0.08] transition-all appearance-none cursor-pointer"
              >
                {SESSIONS.map(s => <option key={s} value={s} className="bg-[#0A0A0B]">{s.toUpperCase()} SESSION</option>)}
              </select>
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest ml-1">Risk Exposure (Lots)</label>
              <input
                type="number"
                step="0.01"
                name="lotSize"
                value={formData.lotSize}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-black text-white outline-none focus:border-[var(--accent)] focus:bg-white/[0.08] transition-all"
              />
            </div>

            <div className="pt-4 border-t border-white/5">
              <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-4">Confluence Trace</p>
              <div className="flex flex-wrap gap-2">
                {SMC_TAGS.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                      formData.smcTags.includes(tag) 
                        ? 'bg-[var(--accent)] text-white shadow-lg shadow-[var(--accent)]/20 border border-[var(--accent)]/50' 
                        : 'bg-white/5 text-[var(--text-muted)] border border-white/5 hover:border-white/20'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {errors.global && (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-2xl flex items-center gap-3 text-rose-500 text-xs font-black uppercase tracking-widest animate-fade-in">
                <AlertCircle size={14} /> {errors.global}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-5 rounded-[24px] font-black text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-3 transition-all relative overflow-hidden group shadow-2xl bg-[var(--accent)] text-white hover:scale-[1.02] active:scale-95 shadow-indigo-500/40 disabled:opacity-50`}
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <><Plus size={20} /> {submitLabel}</>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
