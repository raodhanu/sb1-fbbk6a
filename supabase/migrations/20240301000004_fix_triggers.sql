-- Enable required extensions
create extension if not exists "moddatetime";

-- Drop existing trigger if it exists
drop trigger if exists handle_updated_at on children;

-- Create or replace the trigger using moddatetime
create trigger handle_updated_at
  before update on children
  for each row
  execute procedure moddatetime();

-- Recreate the children table if it doesn't exist
do $$ 
begin
  if not exists (select from pg_tables where schemaname = 'public' and tablename = 'children') then
    create table children (
      id uuid default uuid_generate_v4() primary key,
      user_id uuid references auth.users on delete cascade not null,
      full_name text not null,
      birth_date date not null,
      gender text not null check (gender in ('male', 'female')),
      created_at timestamp with time zone default timezone('utc'::text, now()) not null,
      updated_at timestamp with time zone default timezone('utc'::text, now()) not null
    );

    -- Enable RLS
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

    -- Create index
    create index children_user_id_idx on children (user_id);

    -- Set up realtime
    alter publication supabase_realtime add table children;
  end if;
end $$;