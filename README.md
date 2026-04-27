# Debrief Tool

Interview debrief facilitation tool with simultaneous voting and AI-generated Greenhouse offer notes.

## Project structure

```
debrief-tool/
├── api/
│   └── claude.js        ← Vercel serverless proxy (keeps API key server-side)
├── public/
│   └── index.html       ← The full app
├── vercel.json
├── package.json
└── README.md
```

## Deploy to Vercel

### 1. Install Vercel CLI
```bash
npm install -g vercel
```

### 2. Deploy
```bash
cd debrief-tool
vercel
```
Follow the prompts — accept all defaults. You'll get a preview URL.

### 3. Add your API key
In the Vercel dashboard for your project:
- Go to **Settings → Environment Variables**
- Add: `ANTHROPIC_API_KEY` = your key from console.anthropic.com
- Click **Save**

### 4. Redeploy to apply the env var
```bash
vercel --prod
```

Your live URL will be something like `https://debrief-tool.vercel.app`

## Local development
```bash
# Add a .env.local file with:
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Then run:
vercel dev
```
The app will be available at http://localhost:3000
