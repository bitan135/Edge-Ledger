---
name: trading-audit
description: Professional audit and reliability procedures for trading-related software.
---

# Trading Software Audit Skill

This skill provides a structured methodology for auditing trading journals and analytics platforms to ensure 100% data integrity and reliability.

## 1. Data Persistence Core
- [ ] **Insertion Verification**: Ensure all numeric fields are cleaned (e.g., `parseFloat`) before DB submission to prevent `NaN` errors.
- [ ] **Constraint Audit**: Cross-reference frontend validation (e.g., `TradeForm.validate()`) with database level `CHECK` constraints (e.g., `emotional_state` values).
- [ ] **Array Handling**: Verify that array types (e.g., `TEXT[]` for tags) are correctly passed from the client-side state.

## 2. Quantitative Reliability
- [ ] **Math Validation**: Test `calculateRR` and `calculatePips` against edge cases (e.g., zero stop loss, wide spreads).
- [ ] **Analytics Sync**: Ensure that "Total R" on the dashboard matches the sum of partial RR in the library.

## 3. Resilience & Fallbacks
- [ ] **Auth Stability**: Implement silent auth-refresh checks before critical writes.
- [ ] **Schema Drift**: Maintain a "Fallback Protocol" in submission handlers to handle minor schema updates (e.g., gracefully dropping non-critical fields if a migration is pending).

## 4. Performance Standards
- [ ] **Re-renders**: Use `React.memo` or careful `useEffect` dependency management for complex chart containers.
- [ ] **Bundle Size**: Avoid importing entire libraries; use cherry-picked imports (e.g., `lucide-react` named exports).
