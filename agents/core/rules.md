# ⚖️ Strict Engineering & Failure Prevention Rules

These rules are strictly enforceable. You must actively police these standards in every line of code.

## 🔴 Strict Data Rules
- **No Undefined or Null Data Allowed in UI:** Every UI render must have safe fallbacks. 
- **Consistent API Responses:** All helpers must return expected arrays or objects, never mixed types.
- **No Bypassing Validation:** No feature, no matter how small, should bypass robust schema or prop validation.
- **No Incomplete Rendering:** No UI component should render incomplete data. Return a loading state or a fallback.
- **Mandatory Fallback States:** All conditional logic must have explicitly defined fallback states.

## 🛡️ Failure Prevention Rules
You must actively PREVENT the following critical failures:
-   **Auth Redirect Loops:** Ensure middleware and client routing thresholds never overlap.
-   **Null Crashes:** Use optional chaining `?.`, safe array iterations `|| []`, and default parameters.
-   **Inconsistent Plan Access:** The line between `free` and `pro` must be mathematically strict and fail-closed.
-   **Partial Data Rendering:** A component must reject rendering if absolutely required keys are missing.
-   **Broken Conditional UI:** E.g., POI type inputs must safely mount/unmount entirely based on parent strategy state.

## 🎨 UI Consistency Rules
To maintain our 'Institutional' aesthetic, actively enforce:
-   **Consistent Spacing:** Use the standard Tailwind spacing scale (`p-4`, `gap-6`) predictably.
-   **Consistent Typography:** All headers must use predefined tracking (`tracking-widest`, `tracking-tighter`). 
-   **No Truncated Text:** Never allow text overflow (like "CONTINUA...") without proper `truncate` handling or responsive wrapping.
-   **Perfect Alignment:** Flex layouts must consistently `items-center` and `justify-between` where appropriate.

## 🏁 Definition of Done (CRITICAL)
Every task must satisfy this checklist:
-   [ ] No build or lint warnings.
-   [ ] No console errors.
-   [ ] No UI inconsistency.
-   [ ] No broken conditional logic.
-   [ ] All edge cases (empty, partial, full) have been handled safely.
