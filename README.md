
KINOA Loyalty - Project ready for deploy (Vite + React)

Instructions:
1) Create a free Supabase project and run the SQL in `supabase_tables.sql` to create tables.
2) Create a .env file in project root with:
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-public-anon-key
3) Install and run:
   npm install
   npm run dev
4) To deploy to Netlify or Vercel, push the repo or upload the project. Set env vars in the hosting dashboard.

Included files:
- package.json
- index.html
- vite.config.js
- src/* (React app)
- public/logo.png (replace with your real logo)
- supabase_tables.sql
