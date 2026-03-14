'use client';

import { ChartSkeleton } from './ui/SkeletonLoader';

export default function ChartCard({ title, subtitle, children, className = '', height = 'h-[350px]', isLoading, isEmpty }) {
  if (isLoading) return <ChartSkeleton />;

  return (
    <div className={`bg-[var(--card)] rounded-2xl border border-[var(--border)] p-6 transition-all duration-300 hover:border-[var(--border-custom)] shadow-sm ${className} animate-fade-in`}>
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h3 className="text-sm font-bold text-[var(--text-primary)] uppercase tracking-widest">{title}</h3>}
          {subtitle && <p className="text-xs text-[var(--text-muted)] mt-1 font-medium">{subtitle}</p>}
        </div>
      )}
      <div className={height}>
        {isEmpty ? (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-50">
            <p className="text-sm text-[var(--text-muted)]">No data points yet</p>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
