# Temio

A modern React + Vite web app scaffolded with Tailwind CSS — landing pages and dashboards for idea management and demos.

---

## Key Features
- Clean component-driven UI (React 18, Vite)
- Tailwind CSS for utility-first styling
- Reusable UI primitives and dialogs (Radix + custom components)
- Multi-page layout with dashboards and auth flow
- Dev tooling: ESLint, Vite fast refresh

## Tech Stack
- React 18
- Vite
- Tailwind CSS
- Radix UI primitives
- Framer Motion for animations

## Quick Start
Prerequisites: Node.js 18+ and npm.

1. Clone the repo

```bash
git clone https://github.com/george030403/temio.git
cd temio
```

2. Install dependencies

```bash
npm install
```

3. Run development server (hosts on port 3000)

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

5. Preview production build

```bash
npm run preview
```

6. Lint

```bash
npm run lint
```

## Project Structure

- `src/` — application source
  - `components/` — React UI components and modals
  - `pages/` — top-level routes and dashboards
  - `context/` — app contexts (auth, etc.)
  - `lib/` — utilities
- `index.html`, `vite.config.js`, `tailwind.config.js`

## Environment

Create a `.env` file in the project root to store secrets or API keys. Example variables (if applicable):

```
VITE_API_URL=
VITE_FIREBASE_API_KEY=
```

Note: This project does not include any secret keys in the repository.

## Deployment

This project works well with static hosting platforms that support single-page apps (Vercel, Netlify, Cloudflare Pages). Typical flow:

- Build: `npm run build`
- Deploy the `dist/` output (Vite's default)

Example: deploy with Vercel by connecting the GitHub repository — Vercel will run the build and serve the output.

## Contributing

We welcome contributions. Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Add tests / linting where appropriate
4. Open a PR with a clear description

Code style: ESLint is configured. Run `npm run lint` before opening a PR.

## License

This repository is licensed under the ISC License (see `package.json`).

## Contact

- Repository: https://github.com/george030403/temio
- Issues & PRs: please use the GitHub repo for any feedback or bug reports.

---

If you want, I can add a `README` badge, `CONTRIBUTING.md`, `ISSUE_TEMPLATE`, or set up CI (GitHub Actions) for lint/build checks.
