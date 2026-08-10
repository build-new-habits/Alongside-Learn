-- Alongside: Learn — Initial schema migration
-- 10 Aug 2026 v1
-- Source: Documents/Admin/schema.md v1
-- Run this ONCE, in full, in the Supabase SQL Editor for the Alongside-Learn project.
-- This is a FIRST-PASS RLS policy set (see schema.md §2) — beta-blocking, not yet
-- adversarially tested. Do not treat as a substitute for the public-launch RLS audit.

-- ============================================================
-- 1. TABLES
-- ============================================================

create table if not exists families (
  family_id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  parent_ids uuid[] not null default '{}',
  learner_ids uuid[] not null default '{}',
  tier text not null default 'athena' check (tier in ('free', 'athena')),
  academic_year_start date
);

-- profiles: one row per app user, linked 1:1 to Supabase auth.users
create table if not exists profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  family_id uuid references families(family_id),
  role text not null check (role in ('parent', 'learner')),
  name text not null,
  date_of_birth date,
  coach_voice text not null default 'nurturing'
);

create table if not exists learner_profiles (
  user_id uuid primary key references profiles(user_id) on delete cascade,
  subjects jsonb not null default '[]',
  safeguarding_level int not null default 1 check (safeguarding_level in (1,2,3)),
  checkin_streak_shown boolean not null default false
);

create table if not exists checkins (
  checkin_id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(user_id) on delete cascade,
  date date not null default current_date,
  energy int check (energy between 1 and 5),
  mood int check (mood between 1 and 5),
  sleep int check (sleep between 1 and 5),
  stress int check (stress between 1 and 5),
  free_text text check (char_length(free_text) <= 200),
  subject_focus text,
  "timestamp" timestamptz not null default now()
);

create table if not exists parent_checkins (
  checkin_id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(user_id) on delete cascade,
  response jsonb,
  date date not null default current_date
);

create table if not exists assignments (
  assignment_id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references profiles(user_id) on delete cascade,
  subject text,
  title text,
  due_date date,
  status text,
  details_mode boolean not null default false
);

create table if not exists flashcards (
  card_id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references profiles(user_id) on delete cascade,
  subject text,
  topic text,
  question text,
  answer text,
  next_review_date date,
  coach_suggested boolean not null default false
);

create table if not exists revision_timetable_entries (
  entry_id uuid primary key default gen_random_uuid(),
  learner_id uuid not null references profiles(user_id) on delete cascade,
  subject text,
  scheduled_at timestamptz,
  coach_generated boolean not null default true
);

create table if not exists risk_matrices (
  learner_id uuid primary key references profiles(user_id) on delete cascade,
  subject_confidence jsonb,
  parent_facing_summary text
);

create table if not exists notification_logs (
  log_id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(user_id) on delete cascade,
  type text,
  sent_at timestamptz not null default now(),
  consented_by_learner boolean not null default false
);

-- ============================================================
-- 2. ENABLE RLS ON EVERY TABLE — no exceptions
-- ============================================================

alter table families enable row level security;
alter table profiles enable row level security;
alter table learner_profiles enable row level security;
alter table checkins enable row level security;
alter table parent_checkins enable row level security;
alter table assignments enable row level security;
alter table flashcards enable row level security;
alter table revision_timetable_entries enable row level security;
alter table risk_matrices enable row level security;
alter table notification_logs enable row level security;

-- ============================================================
-- 3. HELPER FUNCTIONS
-- security definer so they can read `profiles` without recursing
-- into the RLS policies being defined below.
-- ============================================================

create or replace function public.same_family(target_user_id uuid)
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1
    from profiles p1
    join profiles p2 on p1.family_id = p2.family_id
    where p1.user_id = auth.uid()
      and p2.user_id = target_user_id
  );
$$;

create or replace function public.is_parent()
returns boolean
language sql
security definer
stable
as $$
  select exists (
    select 1 from profiles
    where user_id = auth.uid() and role = 'parent'
  );
$$;

-- ============================================================
-- 4. RLS POLICIES — first pass, per schema.md §2
-- ============================================================

-- profiles: a user can see their own row, and can see (not edit) other
-- profiles in their own family (needed for parent dashboard learner names etc.)
create policy "profiles_select_own" on profiles for select
  using (user_id = auth.uid() or same_family(user_id));
create policy "profiles_update_own" on profiles for update
  using (user_id = auth.uid());
create policy "profiles_insert_own" on profiles for insert
  with check (user_id = auth.uid());

-- families: visible to any member of that family
create policy "families_select_member" on families for select
  using (
    exists (select 1 from profiles where user_id = auth.uid() and family_id = families.family_id)
  );

-- learner_profiles: learner owns their row; parents in the same family can read it
create policy "learner_profiles_select" on learner_profiles for select
  using (user_id = auth.uid() or same_family(user_id));
create policy "learner_profiles_update_own" on learner_profiles for update
  using (user_id = auth.uid());
create policy "learner_profiles_insert_own" on learner_profiles for insert
  with check (user_id = auth.uid());

-- checkins: OWNER ONLY. Per schema.md §2 rule 3 — stress/free_text must never
-- be directly readable by a parent, only via coach-synthesised outputs.
-- Do not add a same_family() read policy here without a deliberate decision.
create policy "checkins_owner_only" on checkins for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- parent_checkins: OWNER ONLY, including against the co-parent (schema.md §2 rule 5)
create policy "parent_checkins_owner_only" on parent_checkins for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- assignments: learner owns; parent in same family can read only
create policy "assignments_learner_all" on assignments for all
  using (learner_id = auth.uid())
  with check (learner_id = auth.uid());
create policy "assignments_parent_select" on assignments for select
  using (is_parent() and same_family(learner_id));

-- flashcards: same pattern as assignments
create policy "flashcards_learner_all" on flashcards for all
  using (learner_id = auth.uid())
  with check (learner_id = auth.uid());
create policy "flashcards_parent_select" on flashcards for select
  using (is_parent() and same_family(learner_id));

-- revision_timetable_entries: same pattern
create policy "revision_timetable_learner_all" on revision_timetable_entries for all
  using (learner_id = auth.uid())
  with check (learner_id = auth.uid());
create policy "revision_timetable_parent_select" on revision_timetable_entries for select
  using (is_parent() and same_family(learner_id));

-- risk_matrices: OWNER ONLY at the table/RLS level. Parents must go through
-- the risk_matrix_parent_view below, which masks subject_confidence entirely —
-- this is deliberate, not an oversight (schema.md §2 rule 2, file 04 §7).
create policy "risk_matrices_owner_only" on risk_matrices for all
  using (learner_id = auth.uid())
  with check (learner_id = auth.uid());

-- notification_logs: owner only
create policy "notification_logs_owner_only" on notification_logs for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ============================================================
-- 5. Column-masking view for parents — risk_matrix summary ONLY,
-- never the raw subject_confidence scores.
-- Deliberately created WITHOUT security_invoker, so it runs with the
-- view owner's privileges and can apply its own same_family() check
-- rather than being blocked outright by the owner-only policy above.
-- ============================================================

create or replace view risk_matrix_parent_view as
select
  learner_id,
  parent_facing_summary
from risk_matrices
where same_family(learner_id);

grant select on risk_matrix_parent_view to authenticated;

-- ============================================================
-- Done. Run the sanity-check queries in the accompanying instructions
-- after this completes.
-- ============================================================
