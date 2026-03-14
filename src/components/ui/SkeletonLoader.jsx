'use client';

export const MetricSkeleton = () => (
  <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-5 animate-shimmer overflow-hidden">
    <div className="h-4 w-24 bg-[var(--card-hover)] rounded mb-3" />
    <div className="h-8 w-16 bg-[var(--card-hover)] rounded mb-2" />
    <div className="h-4 w-32 bg-[var(--card-hover)] rounded" />
  </div>
);

export const ChartSkeleton = () => (
  <div className="bg-[var(--card)] rounded-xl border border-[var(--border)] p-6 animate-pulse">
    <div className="h-6 w-48 bg-[var(--card-hover)] rounded mb-6" />
    <div className="h-[280px] w-full bg-[var(--card-hover)]/30 rounded" />
  </div>
);

export const TableRowSkeleton = () => (
  <div className="flex items-center gap-4 py-4 px-4 border-b border-[var(--border)] opacity-50">
    <div className="h-4 w-20 bg-[var(--card-hover)] rounded" />
    <div className="h-4 w-32 bg-[var(--card-hover)] rounded" />
    <div className="h-4 w-24 bg-[var(--card-hover)] rounded" />
    <div className="h-4 w-12 bg-[var(--card-hover)] rounded ml-auto" />
  </div>
);
