'use client';

export default function SessionBadge({ session }) {
  const styles = {
    London: 'bg-[#6366F115] text-[#6366F1] border-[#6366F120]',
    'New York': 'bg-[#F59E0B15] text-[#F59E0B] border-[#F59E0B20]',
    Asia: 'bg-[#8B5CF615] text-[#8B5CF6] border-[#8B5CF620]',
  };

  return (
    <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border shadow-sm ${styles[session] || 'bg-[var(--card)] text-[var(--text-muted)] border-[var(--border)]'}`}>
      {session}
    </span>
  );
}
