# ⚠️ Payment Edge Cases

Critical scenarios and how to handle them without loss.

## 📉 Underpayment (Partially Paid)
- **Scenario**: User sends less than required (e.g., forgot exchange fees).
- **Handling**: Log status in DB, Notify user to send the remainder or contact support. **NEVER auto-approve**.

## 📈 Overpayment
- **Scenario**: User sends more than required.
- **Handling**: Fulfill service as normal (`finished`). Log the surplus for potential refund or credit.

## 🔄 Wrong Asset Sent
- **Scenario**: User sends BTC to an LTC address or similar.
- **Handling**: These usually fail on-chain. If detected by NOWPayments, status will remain `waiting` or transition to `failed`. Direct user to NOWPayments support.

## 🕒 Delayed Confirmations
- **Scenario**: High network congestion causes payment to hang.
- **Handling**: Status will stay `confirming`. System remains idle until the status naturally progresses to `finished`.

## 🔄 Duplicate Payments
- **Scenario**: User double-clicks or triggers payment twice.
- **Handling**: Use idiosyncratic `order_id` in your DB to ensure only one fulfillment per logical purchase.

## 🔌 IPN Failure
- **Scenario**: Your server is down when the IPN arrives.
- **Handling**: Implement a daily cron job or "Check Status" button that manually queries the NOWPayments API for `waiting` or `confirming` orders.
