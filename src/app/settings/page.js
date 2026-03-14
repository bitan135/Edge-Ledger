'use client';

import { useState } from 'react';
import { 
  Trash2, Download, Upload, AlertTriangle, ShieldCheck, Database, RefreshCcw, Bell
} from 'lucide-react';

export default function Settings() {
  const [isReseting, setIsReseting] = useState(false);

  const resetData = () => {
    if (confirm('CRITICAL: This will delete ALL your trades and strategies. This action cannot be undone. Are you absolutely sure?')) {
      setIsReseting(true);
      localStorage.clear();
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    }
  };

  const exportData = () => {
    const data = {
      trades: JSON.parse(localStorage.getItem('trades') || '[]'),
      strategies: JSON.parse(localStorage.getItem('strategies') || '[]'),
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `edge_ledger_export_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 max-w-[1000px] mx-auto animate-fade-in pb-20">
      <div className="mb-10">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] tracking-tight">Account Settings</h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">Manage your data, preferences, and workspace configuration</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Data Management Section */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[var(--border)] bg-[var(--background)]/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--accent)]/10 rounded-lg">
                <Database className="text-[var(--accent)]" size={20} />
              </div>
              <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">Data & Persistence</h2>
            </div>
          </div>
          
          <div className="p-6 space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="max-w-md">
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">Export Ledger Data</h3>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">Download a JSON backup of all your trades, strategies, and performance insights for safe keeping.</p>
              </div>
              <button
                onClick={exportData}
                className="px-6 py-2.5 bg-[var(--card-hover)] border border-[var(--border)] rounded-xl text-xs font-bold text-[var(--text-primary)] hover:border-[var(--text-muted)] transition-all flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Export JSON
              </button>
            </div>

            <hr className="border-[var(--border)]" />

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="max-w-md">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm font-bold text-[var(--text-primary)]">Factory Reset</h3>
                  <span className="px-1.5 py-0.5 rounded bg-[var(--loss)]/10 text-[var(--loss)] text-[8px] font-bold uppercase">Dangerous</span>
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">Permanently clear all local storage. This will revert EdgeLedger to its initial state. Demo data will be re-seeded on next visit.</p>
              </div>
              <button
                onClick={resetData}
                disabled={isReseting}
                className="px-6 py-2.5 bg-[#EF444410] border border-[#EF444420] text-[var(--loss)] rounded-xl text-xs font-bold hover:bg-[#EF444420] transition-all flex items-center justify-center gap-2"
              >
                {isReseting ? <RefreshCcw size={16} className="animate-spin" /> : <Trash2 size={16} />}
                Reset All Data
              </button>
            </div>
          </div>
        </div>

        {/* Preferences Placeholder */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] opacity-60 pointer-events-none shadow-sm">
          <div className="p-6 border-b border-[var(--border)] bg-[var(--background)]/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--accent)]/10 rounded-lg">
                <ShieldCheck className="text-[var(--accent)]" size={20} />
              </div>
              <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">Cloud & Security</h2>
            </div>
          </div>
          <div className="p-8 text-center">
            <AlertTriangle className="mx-auto text-[var(--accent)] mb-3" size={32} />
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1">Pro Features coming soon</h3>
            <p className="text-xs text-[var(--text-muted)]">Cloud sync, multi-device access, and collaborative teams are in active development.</p>
          </div>
        </div>

        {/* Notifications Placeholder */}
        <div className="bg-[var(--card)] rounded-2xl border border-[var(--border)] opacity-60 pointer-events-none shadow-sm">
          <div className="p-6 border-b border-[var(--border)] bg-[var(--background)]/30">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--accent)]/10 rounded-lg">
                <Bell className="text-[var(--accent)]" size={20} />
              </div>
              <h2 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-wider">Notifications</h2>
            </div>
          </div>
          <div className="p-8 text-center">
            <p className="text-xs text-[var(--text-muted)]">Trading session alerts and journaling reminders.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
