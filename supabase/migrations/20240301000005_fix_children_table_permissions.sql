-- Grant necessary permissions
grant usage on schema public to authenticated;
grant all on children to authenticated;
grant usage, select on all sequences in schema public to authenticated;

-- Ensure RLS is enabled
alter table children enable row level security;

-- Recreate policies with proper permissions
drop policy if exists "Users can view own children" on children;
drop policy if exists "Users can insert own children" on children;
drop policy if exists "Users can update own children" on children;
drop policy if exists "Users can delete own children" on children;

create policy "Users can view own children"
  on children for select
  using (auth.uid() = user_id);

create policy "Users can insert own children"
  on children for insert
  with check (auth.uid() = user_id);

create policy "Users can update own children"
  on children for update
  using (auth.uid() = user_id);

create policy "Users can delete own children"
  on children for delete
  using (auth.uid() = user_id);