# BoraBet — Design Preview

Clickable front-end prototype of the BoraBet mobile app (React + Vite + Tailwind CSS v4).
It contains **screens and navigation only** — all data is mock data, there is no backend.

## Run locally

```bash
pnpm install     # or: npm install
pnpm dev         # or: npm run dev
```

## Deploy on Vercel

1. Push this folder to a GitHub repository.
2. In Vercel: **Add New → Project → Import** the repository.
3. Leave the defaults (framework: Vite, output: `dist`) — `vercel.json` already sets them. Click **Deploy**.

## Screens & navigation

- **Flow:** Splash → First-run sheet (first visit only) → Home
- **Bottom nav:** Início (Home) · Jogos (Games) · + Depositar (Deposit) · Bônus (Rewards) · Perfil (Profile)
- **Home →** Lobby → Match → Result, Ranking, Chat, Tournaments, Promotions, Notifications (bell icon)
- **Games →** Domino (Lobby) · Plinko
- **Profile →** Wallet → Withdraw → KYC · Friends · Settings → 9 legal pages · Responsible play · Support

Tip: the first-run sheet is shown once per browser. To see it again, clear the site's local storage or open the site in a private window.

## Structure

```
src/App.tsx          screen state + navigation
src/screens/         one file per screen (legal pages in screens/legal)
src/components/      BottomNav, DominoTile, OncaMascot
src/index.css        design tokens + shared button/card styles
docs/reference/      original design brief and earlier prototype (not part of the build)
```

Design is mobile-first: on desktop it renders as a centered phone-width column.
