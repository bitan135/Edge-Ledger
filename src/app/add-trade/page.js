import AddTradeClient from './AddTradeClient';

export const metadata = {
  title: 'Log Trade — SMC Journal',
  description: 'Log a new SMC trade with entry, stop loss, take profit, SMC tags, and chart screenshots.',
};

export default function AddTradePage() {
  return <AddTradeClient />;
}
