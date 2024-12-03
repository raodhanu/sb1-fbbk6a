-- Drop existing children table if it exists
drop table if exists children;

-- Create children table
create table children (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  full_name text not null,
  birth_date date not null,
  gender text not null check (gender in ('male', 'female')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security
alter table children enable row level security;

-- Create policies
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

-- Create indexes
create index children_user_id_idx on children (user_id);

-- Set up realtime
alter publication supabase_realtime add table children;

-- Create or replace the trigger for updating updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger handle_updated_at
  before update on children
  for each row
  execute function update_updated_at_column();

-- Grant necessary permissions
grant usage on schema public to anon, authenticated;
grant all on children to anon, authenticated;
grant usage on all sequences in schema public to anon, authenticated;