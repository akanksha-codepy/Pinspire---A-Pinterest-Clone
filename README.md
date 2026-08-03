# Pinterest Clone — React + Vite

This is a small Pinterest-inspired gallery built with React and Vite. It includes:

 - Responsive masonry layout
 - Debounced search (local JSON fallback)
 - Pexels integration via `VITE_PEXELS_API_KEY`
 - Simple card hover states and skeleton loading

Getting started

1. Install dependencies

```bash
cd /d "e:\project\Pinterest Clone"
npm install
```

2. (Optional) Add an API key

- Copy `.env.example` to `.env.local` and set your key(s):
  - `VITE_PEXELS_API_KEY=your_pexels_api_key_here`

3. Run the dev server

```bash
npm run dev
```

Open http://localhost:5173

Notes

- If you run into dependency or audit issues, prefer running commands from Command Prompt (cmd.exe) on Windows rather than PowerShell to avoid script execution policy issues.
- To use newer Vite/plugin versions, you may need to upgrade packages and adjust configs.
