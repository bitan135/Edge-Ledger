import TradeLibraryClient from './TradeLibraryClient';

export const metadata = {
  title: 'Trade Vault — SMC Journal',
  description: 'Your complete trade history. Filter by instrument, strategy, session, and outcome.',
};

export default function TradeVaultPage() {
  return <TradeLibraryClient />;
}
