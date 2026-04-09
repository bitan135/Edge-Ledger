'use client';

import { Search, ChevronRight } from 'lucide-react';
import { INSTRUMENTS, SESSIONS, DEFAULT_STRATEGIES } from '@/lib/storage';

export default function TradeFilters({ searchTerm, setSearchTerm, filters, setFilters, strategies }) {
  return (
    <>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="flex items-center gap-2 px-3 py-1 rounded-full glass-effect border-[var(--glass-border)] text-[var(--accent)] text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">
              Execution Archives
            </span>
          </div>
          <h1 className="text-2xl md:text-5xl font-black text-[var(--foreground)] tracking-tighter leading-tight text-gradient">
            The Vault
          </h1>
          <p className="text-[var(--text-secondary)] font-medium mt-3">Comprehensive records of your technical evolution on the charts.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] group-focus-within:text-[var(--accent)] transition-all duration-300" size={18} />
            <input
              type="text"
              placeholder="Search configurations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-14 pr-6 py-4 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[24px] text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--accent)] focus:bg-[var(--card-hover)] transition-all w-full lg:w-[320px] shadow-inner font-bold"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12 glass-card p-4 rounded-[32px] border-[var(--glass-border)] shadow-premium">
        {[
          { value: filters.instrument, options: INSTRUMENTS, label: 'Pair', key: 'instrument' },
          { value: filters.strategy, options: [...new Set([...DEFAULT_STRATEGIES, ...strategies])], label: 'Setup', key: 'strategy' },
          { value: filters.session, options: SESSIONS, label: 'Window', key: 'session' },
          { value: filters.result, options: ['Win', 'Loss', 'Break Even'], label: 'Outcome', key: 'result' }
        ].map((f) => (
          <div key={f.key} className="relative group">
            <select
              value={f.value}
              onChange={(e) => setFilters({...filters, [f.key]: e.target.value})}
              className="w-full bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl px-5 py-3 text-[11px] font-black text-[var(--text-secondary)] uppercase tracking-wider outline-none focus:border-[var(--accent)] hover:bg-[var(--card-hover)] cursor-pointer transition-all appearance-none"
            >
              <option key="all" value="All" className="bg-[var(--background)]">All {f.label}s</option>
              {f.options.map(opt => <option key={opt} value={opt} className="bg-[var(--background)]">{opt}</option>)}
            </select>
            <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity">
              <ChevronRight size={14} className="rotate-90" />
            </div>
          </div>
        ))}
        <button 
          onClick={() => setFilters({ instrument: 'All', strategy: 'All', session: 'All', result: 'All' })}
          className="flex items-center justify-center border border-dashed border-[var(--border)] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-[var(--foreground)] hover:border-[var(--glass-border)] transition-all active:scale-95"
        >
          Clear Filters
        </button>
      </div>
    </>
  );
}
