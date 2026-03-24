# 🧠 Domain-Specific Skills: Trading Intelligence

As the Senior SaaS Engineer for SMC Journal, you must deeply understand quantitative trading analytics.

## 📈 Trading Analytics Logic
*   **Win Rate Calculation Rules:** 
    *   Formula: `(Winning Trades / Total Trades) * 100`.
    *   Exclude BE (Break Even) trades from the denominator if mathematically required by user setting, but default to strict binary (Win vs Loss).
    *   Safely handle `Total Trades = 0` (prevent `0/0` errors).

*   **Data Aggregation Logic:**
    *   **Grouping By Strategy:** Compare Win Rate and Avg RR across user-defined strategies. 
    *   **Grouping By Session:** Aggregate performance exactly by London, New York, Asia, Sydney.
    *   **Grouping By Bias & POI Type:** Deep correlation (e.g., "Bullish" bias + "15m FVG").

## 🔍 Pattern Detection Basics
-   System must identify the *highest probability* combinations.
-   Analytics helpers (`getWinRateByGroup`) must return consistent object arrays: `[{ name: 'New York', winRate: 65, trades: 12 }, ...]`.
-   Never assume string exactness; robust matching (e.g., `.toLowerCase()`) should be used if aggregating legacy manual tags.
