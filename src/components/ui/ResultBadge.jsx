'use client';

export default function ResultBadge({ result }) {
  const styles = {
    Win: 'bg-[#22C55E15] text-[#22C55E] border-[#22C55E20]',
    Loss: 'bg-[#EF444415] text-[#EF4444] border-[#EF444420]',
    'Break Even': 'bg-[#9CA3AF15] text-[#9CA3AF] border-[#9CA3AF20]',
  };

  return (
    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${styles[result] || styles['Break Even']}`}>
      {result}
    </span>
  );
}
