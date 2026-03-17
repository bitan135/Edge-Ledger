# SMC Journal — Developer & Agent Intelligence Layer

## Project Overview
SMC Journal is an elite, institutional-grade trading journal built for Smart Money Concepts (SMC) traders. It features millisecond-precision logging, advanced quantitative analytics (expectancy, drawdown curves, session win rates), and a premium glassmorphic UI.

## Tech Stack
- **Framework**: Next.js 16.1.6 (App Router, Turbopack)
- **Database/Auth**: Supabase (PostgreSQL with RLS)
- **Styling**: Vanilla CSS (Global Variables, Glassmorphism)
- **Icons**: Lucide React
- **Charts**: Recharts (Optimized for performance)
- **Analytics**: PostHog

## Key Implementation Patterns

### 1. Data Layer (`src/lib/storage.js`)
The `storage.js` file acts as the unified bridge between the UI and Superbase. Always use the exported helper functions (`getTrades`, `saveTrade`, `getStrategies`) instead of direct Supabase calls to ensure consistent error handling and state management.

### 2. Error Diagnostic Protocol
All fetch and submission operations must include descriptive error logging:
```javascript
console.error('Context:', err?.message || err?.details || err?.code || err);
```

### 3. Institutional Aesthetics
- Use CSS variables from `globals.css`.
- Maintain a high-fidelity "glassmorphic" look using `glass-card` and `glass-effect` classes.
- Prioritize micro-animations and smooth transitions (stagger-children, fade-in).

## Critical Constraints

### RLS Policies
Every table in Supabase must have explicit `FOR INSERT` and `FOR SELECT` policies. Relying on `FOR ALL` with only a `USING` clause often fails for `INSERT` operations.

### Trade Calculations
Calculation logic (RR, Pips, Risk Amount) is centralized in `src/lib/storage.js`.

## Build & Maintenance
- **Build**: `npm run build`
- **Lint**: `npm run lint`
- **Dev**: `npm run dev`
