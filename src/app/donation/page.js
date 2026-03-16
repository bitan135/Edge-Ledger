'use client';

import { useState } from 'react';
import { Heart, Copy, Check, ShieldAlert, Sparkles, Zap, TrendingUp } from 'lucide-react';

export default function DonationPage() {
    const [copied, setCopied] = useState(false);
    const walletAddress = "0xA7608672cc489538F3b96c32f2f0eee74fe91205";

    const handleCopy = () => {
        navigator.clipboard.writeText(walletAddress);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen px-4 sm:px-6 lg:px-10 py-10 max-w-[1440px] mx-auto animate-fade-in pb-32 relative overflow-hidden">
            {/* Background Ambience */}
            <div className="absolute top-[10%] left-[-5%] w-[40%] h-[40%] bg-[var(--accent)]/5 blur-[120px] rounded-full animate-float pointer-events-none"></div>
            <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-purple-500/5 blur-[150px] rounded-full delay-1000 animate-float pointer-events-none"></div>

            <div className="relative z-10 w-full max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-effect border-[var(--glass-border)] text-[var(--accent)] text-[11px] font-black uppercase tracking-[0.3em] mb-8 animate-pulse">
                        <Heart size={14} /> Fuel the Innovation
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-[var(--foreground)] tracking-tighter leading-tight text-gradient mb-6">
                        Support SMC Journal
                    </h1>
                    <p className="text-xl text-[var(--text-secondary)] font-medium max-w-2xl mx-auto leading-relaxed">
                        We are building the future of institutional-grade trading logs. Your support helps us maintain infrastructure and develop premium features for the community.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Donation Card */}
                    <div className="glass-card rounded-[48px] p-10 border-[var(--glass-border)] shadow-premium relative group">
                        <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/5 to-transparent rounded-[48px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        
                        <div className="relative z-10">
                            <h3 className="text-2xl font-black text-[var(--foreground)] mb-6 tracking-tight flex items-center gap-3">
                                <Zap size={24} className="text-[var(--accent)]" /> Instant Contribution
                            </h3>
                            
                            <div className="space-y-8">
                                <div>
                                    <label className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-[0.2em] mb-4 block ml-1">
                                        USDT (Arbitrum One) Address
                                    </label>
                                    <div className="group/addr relative">
                                        <div className="bg-[var(--background)] border border-[var(--glass-border)] rounded-3xl p-6 text-sm font-mono text-[var(--text-primary)] break-all pr-16 shadow-inner transition-all hover:border-[var(--accent)]/30 group-hover/addr:shadow-xl">
                                            {walletAddress}
                                        </div>
                                        <button 
                                            onClick={handleCopy}
                                            className={`absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                                                copied ? 'bg-emerald-500 text-white' : 'bg-[var(--accent)] text-white hover:scale-105 active:scale-95'
                                            } shadow-lg shadow-indigo-500/20`}
                                        >
                                            {copied ? <Check size={20} /> : <Copy size={20} />}
                                        </button>
                                    </div>
                                </div>

                                <div className="p-6 rounded-[32px] bg-rose-500/5 border border-rose-500/10 flex items-start gap-4">
                                    <ShieldAlert className="text-rose-500 shrink-0" size={24} />
                                    <div>
                                        <p className="text-[11px] font-black text-rose-500 uppercase tracking-widest mb-1">Network Enforcement</p>
                                        <p className="text-sm text-rose-500/80 font-medium leading-snug">
                                            Send <span className="font-bold underline">USDT via Arbitrum Network ONLY</span>. Funds sent on other networks (ERC20, BSC, TRC20) will be permanently lost.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 pt-4">
                                    <div className="glass-card rounded-3xl p-5 border-[var(--glass-border)] text-center">
                                        <Sparkles size={20} className="text-[var(--accent)] mx-auto mb-3" />
                                        <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Future Updates</p>
                                    </div>
                                    <div className="glass-card rounded-3xl p-5 border-[var(--glass-border)] text-center">
                                        <TrendingUp size={20} className="text-[var(--accent)] mx-auto mb-3" />
                                        <p className="text-[10px] font-black text-[var(--text-muted)] uppercase tracking-widest">Growth Boost</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QR Code Visual */}
                    <div className="flex flex-col items-center">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-[var(--accent)] to-purple-600 rounded-[60px] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-700 animate-pulse"></div>
                            <div className="relative glass-card bg-white rounded-[50px] p-6 border-[var(--glass-border)] shadow-2xl transition-transform duration-700 hover:scale-105">
                                <img 
                                    src="/usdt_arbitrum_qr.png" 
                                    alt="Donation QR Code" 
                                    className="w-full max-w-[280px] h-auto rounded-[32px] invert-0 mix-blend-multiply"
                                />
                                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-[var(--background)] px-4 py-1.5 rounded-full border border-[var(--glass-border)] shadow-xl flex items-center gap-2 pointer-events-none">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                                    <span className="text-[9px] font-black text-[var(--foreground)] uppercase tracking-[0.2em]">Live Receiver</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-[11px] font-black text-[var(--text-muted)] uppercase tracking-[0.3em] mt-8 opacity-60">Scan to settle institutional support</p>
                    </div>
                </div>

                {/* Footer Copy */}
                <div className="mt-24 text-center">
                    <p className="text-sm text-[var(--text-muted)] font-medium max-w-sm mx-auto">
                        Your contribution directly funds the high-performance servers and technical development of the SMC Journal ecosystem.
                    </p>
                </div>
            </div>
        </div>
    );
}
