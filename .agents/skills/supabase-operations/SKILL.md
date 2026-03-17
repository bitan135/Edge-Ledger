---
name: supabase-operations
description: Best practices for managing Supabase RLS policies and schema integrity.
---

# Supabase Operations Skill

Instructions for maintaining a secure and reliable Supabase backend for agentic applications.

## 1. RLS Policy Hardening
- **Explicit Operations**: Always define separate policies for `SELECT`, `INSERT`, `UPDATE`, and `DELETE`.
    - `USING` covers existing rows (SELECT, UPDATE, DELETE).
    - `WITH CHECK` covers new rows (INSERT, UPDATE).
- **Owner Isolation**: Ensure every policy check includes `auth.uid() = user_id` (or appropriate owner column).

## 2. Database Schema Management
- **Naming Consistency**: Use snake_case for database columns and camelCase for client-side objects, mapping them in the service layer.
- **Defaults**: Leverage `DEFAULT` values in SQL to reduce payload size and handle optional fields.

## 3. Error Diagnosis
- **Descriptive Logging**: Always extract `message`, `details`, and `code` from the Supabase error object.
- **PGRST Codes**: Monitor for `PGRST204` (missing column) and `42501` (permission denied/RLS failure).

## 4. Migration Strategy
- Store all schema changes in `supabase/migrations`.
- Use `IF NOT EXISTS` for all `ADD COLUMN` and `CREATE TABLE` commands.
- Verify migrations locally before applying to production.
