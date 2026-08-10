-- Alongside: Learn — Mood Meter migration
-- 10 Aug 2026 v1
-- Run this in the Supabase SQL Editor, after 001_initial_schema.sql.
-- Replaces the numeric `mood` column with the Marc Brackett Mood Meter
-- word-picker fields (mood_quadrant, mood_word), per master_schedule.md v6/v7.
-- No live check-in data exists yet, so this is a clean structural change,
-- not a data migration.

alter table checkins drop column if exists mood;
alter table checkins add column if not exists mood_quadrant text
  check (mood_quadrant in ('yellow', 'green', 'red', 'blue'));
alter table checkins add column if not exists mood_word text;

-- Sanity check after running:
-- select column_name, data_type from information_schema.columns
-- where table_name = 'checkins' order by ordinal_position;
