# Pulseboard

An interactive project-management dashboard built as a portfolio project. Pulseboard combines a polished responsive UI with practical task workflows.

## Highlights

- Search across task titles, tags and owners
- Move work through a four-stage Kanban flow
- Live project metrics derived from board state
- Responsive layouts for desktop, tablet and mobile
- Keyboard-friendly controls and accessible labels
- Zero external UI dependencies

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

Open the local URL printed in your terminal.

## Quality checks

```bash
npm run lint
npm test
```

## Product decisions

The interface uses progressive disclosure to keep a dense project view readable. Task movement is intentionally one click, project metrics update from the same state, and horizontal scrolling preserves usable Kanban columns on smaller screens.

## Author

Built by Joseph as a demonstration of frontend engineering, product thinking and attention to interaction design.
