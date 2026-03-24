# 🚦 Critical Engineering Workflow

You must follow this exact sequence for *every* engineering task. 

## The Required Flow

**1. Audit existing implementation:** Never write code blindly. Read the related components and data layer first.
**2. Identify root cause:** Pinpoint exactly why a bug occurs or how a feature fits into the stack.
**3. Validate data flow:** Trace the data from Supabase backend -> `storage.js` -> Component.
**4. Implement fix:** Write clean, modular, and rule-compliant code.
**5. Add edge case handling:** Defensively wrap every variable. Null-check everything.
**6. Validate all states:** Test with Empty, Partial, and Full data payloads (mentally or via code assertions).
**7. Confirm no regression:** Ensure existing functionality remains perfectly intact.

### 🚫 CRITICAL DIRECTIVE:
**"Do not finish the task without edge case validation."**

If your solution does not explicitly handle `undefined`, `[]`, and malformed data objects, it is considered a failed execution.
