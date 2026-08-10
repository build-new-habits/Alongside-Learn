-- Alongside: Learn — Family creation & invite-code join
-- 10 Aug 2026 v1
-- Run after 001 and 002. Adds the missing INSERT policy on `families`
-- (session 1 only wrote SELECT), plus two RPC functions that handle family
-- creation and joining atomically and server-side — avoids exposing family
-- rows to lookup-by-code for non-members via RLS, and keeps capacity checks
-- (max 2 parents, max 5 learners per file 03 §3) in one place.
--
-- Invite mechanism for this beta: the family_id itself is the "family code" —
-- the creating parent shares it out-of-band (text/WhatsApp) with the people
-- they're inviting. No email-invite system built this session — proportionate
-- to a small trusted-families beta, flagged as a improvement for later.

-- ============================================================
-- 0. profiles.role is now nullable — unset until family setup completes
-- (create_family sets it to 'parent', join_family sets it to whatever
-- was chosen). Session 1's migration had it NOT NULL with a value always
-- supplied at sign-up; that's no longer accurate now sign-up and family
-- setup are separate steps.
-- ============================================================

alter table profiles alter column role drop not null;
alter table profiles drop constraint if exists profiles_role_check;
alter table profiles add constraint profiles_role_check
  check (role is null or role in ('parent', 'learner'));

-- ============================================================
-- 1. Missing INSERT policy on families (gap from 001)
-- ============================================================

create policy "families_insert_creator" on families for insert
  with check (auth.uid() = any(parent_ids));

-- ============================================================
-- 2. create_family — parent creates a new family, becomes its first parent
-- ============================================================

create or replace function public.create_family(academic_year_start_input date default null)
returns uuid
language plpgsql
security definer
as $$
declare
  new_family_id uuid;
begin
  insert into families (parent_ids, learner_ids, tier, academic_year_start)
  values (
    array[auth.uid()],
    '{}',
    'athena',
    coalesce(academic_year_start_input, (date_trunc('year', current_date) + interval '8 months')::date)
  )
  returning family_id into new_family_id;

  update profiles set family_id = new_family_id, role = 'parent' where user_id = auth.uid();

  return new_family_id;
end;
$$;

-- ============================================================
-- 3. join_family — join an existing family by its family_id (the "code"),
-- as either a parent or a learner. Enforces capacity limits.
-- KNOWN LIMITATION: not fully race-safe under concurrent simultaneous joins
-- (fine for a small trusted-families beta; flag for hardening before public
-- launch if the family model scales up).
-- ============================================================

create or replace function public.join_family(family_id_input uuid, join_as_role text)
returns boolean
language plpgsql
security definer
as $$
declare
  fam families%rowtype;
begin
  select * into fam from families where family_id = family_id_input;
  if not found then
    raise exception 'Family not found — check the code and try again';
  end if;

  if join_as_role = 'parent' then
    if array_length(fam.parent_ids, 1) >= 2 then
      raise exception 'This family already has two parents';
    end if;
    update families set parent_ids = array_append(parent_ids, auth.uid()) where family_id = family_id_input;
  elsif join_as_role = 'learner' then
    if fam.learner_ids is not null and array_length(fam.learner_ids, 1) >= 5 then
      raise exception 'This family already has five learners';
    end if;
    update families set learner_ids = array_append(learner_ids, auth.uid()) where family_id = family_id_input;
  else
    raise exception 'Invalid role: must be parent or learner';
  end if;

  update profiles set family_id = family_id_input, role = join_as_role where user_id = auth.uid();

  return true;
end;
$$;

grant execute on function public.create_family(date) to authenticated;
grant execute on function public.join_family(uuid, text) to authenticated;

-- Sanity check after running:
-- select proname from pg_proc where proname in ('create_family', 'join_family');
-- select policyname from pg_policies where tablename = 'families';
