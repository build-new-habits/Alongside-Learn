-- Alongside: Learn — Consented parent alerts
-- 11 Aug 2026 — schema v4
--
-- Adds RLS policies to notification_logs so the learner-pressed
-- "let one of my parents know" button (safeguarding copy review item 3a,
-- Graeme approved 11 Aug 2026) has somewhere to write, and so a parent can
-- read only those alerts the learner explicitly consented to.
--
-- The consent rule (file 04 §4, schema.md §2) is enforced HERE, at the policy
-- level, not in application code. A row with consented_by_learner = false is
-- invisible to parents no matter what the client does. That is the point:
-- nothing about a learner reaches a parent because a UI forgot to check.
--
-- Run this in the Supabase SQL editor before deploying the consent button.

-- ============================================================
-- 1. Learner: can insert and read their own alerts
-- ============================================================

-- Insert is restricted to rows the learner has actually consented to.
-- A learner cannot write an unconsented row on their own behalf, so there is
-- no path by which the client can create a parent-visible record silently.
create policy "notification_logs_learner_insert" on notification_logs for insert
  with check (user_id = auth.uid() and consented_by_learner = true);

create policy "notification_logs_learner_select" on notification_logs for select
  using (user_id = auth.uid());

-- ============================================================
-- 2. Parent: read only, same family, consented rows only
-- ============================================================
--
-- No insert, update or delete policy for parents. A parent cannot create,
-- alter or remove a record of what their child chose to share.

create policy "notification_logs_parent_select" on notification_logs for select
  using (
    is_parent()
    and same_family(user_id)
    and consented_by_learner = true
  );

-- ============================================================
-- 3. Acknowledgement column
-- ============================================================
--
-- Lets the parent dashboard distinguish a new alert from one already seen,
-- without giving parents write access to the row itself. Updated via the
-- security-definer RPC below rather than a direct update policy.

alter table notification_logs
  add column if not exists acknowledged_at timestamptz;

create or replace function public.acknowledge_alert(log_id_input uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update notification_logs
     set acknowledged_at = now()
   where log_id = log_id_input
     and consented_by_learner = true
     and same_family(user_id)
     and is_parent()
     and acknowledged_at is null;
end;
$$;

revoke all on function public.acknowledge_alert(uuid) from public;
grant execute on function public.acknowledge_alert(uuid) to authenticated;
