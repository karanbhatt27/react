# Monorepo: API + UI

This repository was converted into a simple monorepo layout with a single root `package.json` and shared `node_modules`.

Structure:

- `packages/api` - Express API (server.js, .env)
- `packages/ui` - React UI (index.html, app.js, src)

Usage:

1. Remove nested node_modules (optional but recommended):

```bash
rm -rf packages/api/node_modules packages/ui/node_modules
rm -f packages/api/package-lock.json packages/ui/package-lock.json
```

2. Install dependencies at repository root (creates a single `node_modules`):

```bash
npm install
```

3. Start both services in parallel (requires `concurrently` installed via the root `package.json`):

```bash
npm run start
```

Or start individually:

```bash
npm run start:api   # runs the API server
npm run start:ui    # runs the UI (Parcel)
```

Notes:
- The original `API/package.json` and `UI/package.json` were preserved but marked as deprecated; the root `package.json` is the single source of truth.
- The API `.env` file is at `packages/api/.env` and the API server loads it from the same folder.
