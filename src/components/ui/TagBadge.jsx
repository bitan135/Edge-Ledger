'use client';

export default function TagBadge({ tag }) {
  return (
    <span className="px-2 py-0.5 rounded-md bg-[var(--input-bg)] text-[var(--text-secondary)] border border-[var(--border)] text-[10px] font-medium transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]">
      {tag}
    </span>
  );
}
