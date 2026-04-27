# Debrief Tool

Real-time interview debrief tool. Each interviewer votes privately on their own device. The recruiter controls the flow and reveal.

## Project structure

```
debrief-tool/
├── api/
│   ├── claude.js      ← AI note generation (Anthropic proxy)
│   ├── session.js     ← Session management (Supabase)
│   └── votes.js       ← Vote storage (Supabase)
├── public/
│   └── index.html     ← Full app (recruiter + interviewer views)
├── vercel.json
├── package.json
└── README.md
```

## Environment variables needed in Vercel

| Variable | Where to get it |
|---|---|
| `ANTHROPIC_API_KEY` | console.anthropic.com → API Keys |
| `SUPABASE_URL` | Supabase project → Settings → API → Project URL |
| `SUPABASE_SERVICE_KEY` | Supabase project → Settings → API → service_role key |

## Supabase setup

### 1. Create a free Supabase account
Go to supabase.com and sign up.

### 2. Create a new project
Click "New project", name it "debrief-tool", set a database password, choose a region close to you.

### 3. Create the two tables
In your Supabase project, go to the SQL Editor and run this:

```sql
create table sessions (
  id bigint generated always as identity primary key,
  session_id text unique not null,
  candidate_ref text,
  role text,
  factors text,
  interviewers text,
  stage text default 'set-stage',
  revealed boolean default false,
  flags text default '[]',
  created_at timestamp with time zone default now()
);

create table votes (
  id bigint generated always as identity primary key,
  session_id text not null,
  interviewer_name text not null,
  vote integer,
  created_at timestamp with time zone default now(),
  unique(session_id, interviewer_name)
);
```

### 4. Get your API keys
In Supabase: Settings → API
- Copy the **Project URL** → this is your `SUPABASE_URL`
- Copy the **service_role** secret key → this is your `SUPABASE_SERVICE_KEY`

## Deploy to Vercel

1. Push this code to GitHub
2. Connect the repo to Vercel
3. Add all three environment variables in Vercel → Settings → Environment Variables
4. Redeploy
