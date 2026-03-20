# ⚖️ Strict Payment Rules

Non-negotiable rules to prevent financial loss and ensure system integrity.

## 🚫 Restricted Actions
- **No Early Access**: Do NOT grant access on `waiting`, `confirming`, or `confirmed` statuses.
- **No Auto-Approval on Partial**: `partially_paid` must never trigger automatic fulfillment.
- **No Frontend Trust**: Never verify payment status via client-side API calls.

## ✅ Mandatory Requirements
- **Server-Side Only**: Rely EXCLUSIVELY on Instant Payment Notifications (IPN) from the server.
- **Finished Only**: Grant service ONLY when status is `finished`.
- **Validation**: Always compare `outcome_amount` and `outcome_currency` against the expected order value.
- **Secure Integration**: API keys and IPN Secrets must reside in encrypted environment variables.
