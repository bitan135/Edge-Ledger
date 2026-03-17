export default function Loading() {
  return (
    <div className="px-4 sm:px-6 lg:px-10 py-10 max-w-[1440px] mx-auto animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
        <div className="space-y-4">
          <div className="h-6 w-32 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full animate-shimmer" />
          <div className="h-12 w-64 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[20px] animate-shimmer" />
        </div>
        <div className="h-12 w-48 bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-[20px] animate-shimmer" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[1,2,3,4].map(i => (
          <div key={i} className="h-40 glass-card rounded-[32px] border-[var(--glass-border)] animate-shimmer" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="h-[400px] glass-card rounded-[40px] border-[var(--glass-border)] animate-shimmer" />
        <div className="h-[400px] glass-card rounded-[40px] border-[var(--glass-border)] animate-shimmer" />
      </div>
    </div>
  );
}
