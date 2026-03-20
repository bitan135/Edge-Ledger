# 💳 NOWPayments Core Knowledge

Essential concepts for integrating NOWPayments safely and correctly.

## 🔄 Payment Lifecycle
1. **Waiting**: User is on the checkout page; no transaction detected yet.
2. **Confirming**: Transaction detected on-chain; awaiting network confirmations.
3. **Confirmed**: Sufficient confirmations reached.
4. **Sending**: Funds are being transferred to your main account.
5. **Finished**: Funds have arrived; payment is 100% complete.

## 🚦 Important Statuses
- `waiting`
- `confirming`
- `confirmed`
- `sending`
- `finished` (Grant access ONLY here)
- `partially_paid` (Requires manual intervention)
- `failed`
- `expired`

## 💰 Fees & Logic
- **Fees**: Typically 0.5%–1% depending on volume. Network fees vary by blockchain.
- **Key Concepts**: 
  - `outcome_amount`: The final amount received after fees.
  - `outcome_currency`: The currency received in your payout wallet.
  - **The Golden Rule**: NEVER grant service or premium features until the status is exactly `finished`.
