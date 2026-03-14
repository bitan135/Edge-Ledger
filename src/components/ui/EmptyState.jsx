'use client';

import { LucideIcon } from 'lucide-react';

export default function EmptyState({ icon: Icon, title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
      <div className="w-16 h-16 rounded-2xl bg-[var(--card)] border border-[var(--border)] flex items-center justify-center mb-4 shadow-xl">
        {Icon && <Icon size={32} className="text-[var(--text-muted)]" />}
      </div>
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--text-muted)] max-w-xs mb-6">{description}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="px-6 py-2.5 rounded-xl bg-[var(--accent)] text-white text-sm font-semibold transition-all hover:bg-[var(--accent-hover)] hover:scale-105 active:scale-95 shadow-lg shadow-[var(--accent)]/20"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
