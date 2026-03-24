# 📊 Task: Insights Engine Hardening

## Architecture Principles

### 1. Insights Calculation Rules
- Fetch data centrally via `src/lib/storage.js`.
- Compute global metrics (`winRate`, `profitFactor`, `avgRR`) efficiently. 
- Distribute subset computations (Timeframe optimization, Edge matrix) locally to prevent blocking main thread renders.

### 2. Safe Data Handling & Fallback Logic
- Data fetching *must* be wrapped in `try...catch`.
- If a fetch fails, the app must display a "Sync Disrupted" graceful fallback rather than a white screen.
- Aggregation functions must safely return `[]` or `0` if fed `null` or `undefined`.

### 3. Free vs Paid Logic (Strict Access Control)
- **Free User Threshold:** Basic access granted at 30+ trades.
- **Paid User Threshold:** Deep quantitative insights unlocked *only* if the user has `plan_id === 'pro' | 'lifetime'` AND has crossed 100+ trades.
- The UI must explicitly visualize the *locked* state using glassmorphic overlays and blur effects.

### 4. No-Crash Requirements
- The Insights page represents institutional capability. 
- **Zero ReferenceErrors:** Deconstruction of `user` and `subscription` contexts must use safe defaults.
- **Zero DivByZero Errors:** All percentage and ratio calculations must default to `0` if denominator is `0`.
