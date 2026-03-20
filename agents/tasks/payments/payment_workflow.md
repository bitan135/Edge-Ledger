# 🔄 Payment Execution Workflow

The deterministic flow for processing every crypto transaction.

## 1. Creation
- User selects a plan.
- System calls NOWPayments API to create a payment.
- **Save to DB**: Store the `payment_id`, `order_id`, and `expected_amount` immediately.

## 2. Notification (IPN)
- System exposes a secure POST endpoint for NOWPayments IPNs.
- **Verification**: Validate the IPN signature using your `NP_IPN_SECRET`.

## 3. Processing
- Extract `payment_status`, `payment_id`, and `outcome_amount`.
- Fetch the corresponding order from your database.

## 4. Fulfillment
- **Status = Finished**: 
  - Update order to `completed`.
  - Provision features to user.
  - Send confirmation email.
- **Status = Partially Paid**:
  - Update order to `partially_paid`.
  - Flag for staff/manual review.
  - DO NOT grant access.
- **Status = Failed/Expired**:
  - Update order to `cancelled`.
