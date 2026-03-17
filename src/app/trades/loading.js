import { TableRowSkeleton } from '@/components/ui/SkeletonLoader';

export default function Loading() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10 max-w-[1440px] mx-auto animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <div className="h-6 w-32 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full animate-shimmer" />
          <div className="h-12 w-64 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[20px] animate-shimmer" />
        </div>
        <div className="h-14 w-64 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[24px] animate-shimmer" />
      </div>
      
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {[1,2,3,4,5].map(i => (
          <div key={i} className="h-12 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl animate-shimmer" />
        ))}
      </div>

      <div className="glass-card rounded-[48px] border-[var(--glass-border)] overflow-hidden shadow-premium">
        {[1,2,3,4,5,6,7,8].map(i => <TableRowSkeleton key={i} />)}
      </div>
    </div>
  );
}
