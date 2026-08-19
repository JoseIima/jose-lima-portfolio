# Finora

A responsive personal-finance dashboard focused on clarity, data storytelling and meaningful interaction.

## Features

- Interactive balance chart with three time ranges
- Real-time balance updates from new transactions
- Income and expense tracking
- Spending breakdown and monthly budget progress
- Responsive dashboard for desktop, tablet and mobile
- Accessible transaction form and status feedback

## Stack

- React 19
- TypeScript
- Next.js / Vinext
- Tailwind CSS 4
- Cloudflare-compatible server output

## Run locally

```bash
npm install
npm run dev
```

## Quality checks

```bash
npm run lint
npm test
```

## Engineering notes

Finora intentionally uses native React state and CSS/SVG visualization rather than a charting package. This keeps the bundle focused while demonstrating data transformation, derived state, controlled forms and responsive information design.

## Author

Built by Joseph as a full-stack-ready frontend portfolio project.
