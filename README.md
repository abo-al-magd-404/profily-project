# 🚀 Profily

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-651FFF?style=for-the-badge&logo=framer)
![TypeScript](https://img.shields.io/badge/TypeScript-%234785B6?style=for-the-badge&logo=typescript)
![Node.js](https://img.shields.io/badge/Node.js-%2343853D?style=for-the-badge&logo=node.js)

**A sleek, high-performance User Management System.**  
Bridging the gap between modern UI and internal API architecture.

[Report Bug](https://github.com/abo-al-magd-404/profily-project/issues) • [Request Feature](https://github.com/abo-al-magd-404/profily-project/issues)

</div>

---

## 📖 Overview

Profily is a full-stack, single-repository user management system built with Next.js (App Router). It demonstrates a unified architecture where frontend pages and backend API routes live together. Profily uses a local `db.json` file as a lightweight data store which makes it ideal for prototypes, demos, and learning full‑stack patterns.

Key use cases:
- Internal admin tools
- Prototypes and demos
- Learning how to structure Next.js API routes with server-side logic

---

## ✨ Key Features

- Unified Architecture: Frontend (UI) and Backend (API) in the same repo.
- Authentication: Signup & Login with session persistence.
- Profile Management: Edit user profile and credentials with immediate UI feedback.
- Glassmorphism UI: Responsive design built with Tailwind CSS.
- Smooth Animations: Framer Motion for transitions and micro-interactions.
- Lightweight DB: Uses a local `db.json` file accessed via Node `fs` for easy development.

---

## 🛠️ Tech Stack

- Core: Next.js 15 (App Router), React 19, TypeScript
- Styling: Tailwind CSS
- Animations: Framer Motion
- Server-side file access: Node.js `fs` module (development only)
- Validation: Strict Regex rules for usernames and passwords

---

## 📁 Project Structure

```bash
profily/
├── app/
│   ├── api/
│   │   └── user/
│   │       ├── login/      # POST: identity verification
│   │       ├── signup/     # POST: create user
│   │       └── update/     # PATCH: update profile
│   ├── login/              # UI: login page
│   ├── signup/             # UI: signup page
│   └── profile/            # UI: user dashboard / profile
├── db.json                 # Local JSON store (development)
├── public/                 # Static assets
├── next.config.ts          # Next.js config
└── package.json
```

---

## 🔐 Security & Validation

Server-side validation is implemented for input integrity. Example validation patterns used in the project:

- Username: only alphanumeric characters, underscores, hyphens
  - Regex: `^[a-zA-Z0-9_-]+$`

- Password: minimum 8 characters, at least one letter, one number, and one special character
```javascript
// Example password regex used in the project
/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
```

Note: All validation is performed server-side in API routes; do not rely on client-side checks only.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm

### Install

Clone the repository:
```bash
git clone https://github.com/abo-al-magd-404/profily-project.git
cd profily-project
```

Install dependencies:
```bash
npm install
# or
yarn
# or
pnpm install
```

Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open http://localhost:3000 in your browser.

---

## ⚠️ Deployment Notes

This project currently uses the Node.js `fs` module to read/write `db.json`. Most serverless and managed platforms (Vercel, Netlify) provide read-only file systems for production deployments. Before deploying to a production environment:

- Replace file-system persistence with a real database (MongoDB, PostgreSQL, Supabase, or Prisma).
- Move sensitive configuration to environment variables (e.g., session secrets).
- Ensure you add proper rate-limiting, CSRF protections, and secure cookie/session handling.

Example next steps for production:
- Create an adapter that swaps `fs` reads/writes for DB queries.
- Store sessions using a secure store (Redis, database, etc.).
- Add TLS/HTTPS in production.

---

## ✅ Development Tips

- Editing: Pages use the Next.js App Router — update `app/page.tsx` and other route files to see live reloads.
- API routes: Check `app/api/user/` for auth and profile logic.
- Styling: Modify Tailwind config for theming and glassmorphism styles.
- Animations: Framer Motion configs live alongside the UI components.

---

## 🧩 Contributing

Contributions, issues, and feature requests are welcome!

- Report bugs or request features on the repository Issues page:  
  https://github.com/abo-al-magd-404/profily-project/issues
- Prefer small, focused pull requests with clear descriptions.
- If you change the persistence layer, include migration notes in the PR.

---

## 📄 License

This repository does not include a license file yet. If you'd like to open-source it, consider adding an MIT license:

- Add a `LICENSE` file with MIT content, or choose another license that fits your needs.

---

## ❤️ Author

Built with passion by Abo Al Magd  
GitHub: [abo-al-magd-404](https://github.com/abo-al-magd-404)

---

### Changelog — What I fixed in this README
1. Replaced non-standard Markdown constructs and ensured compatibility with GitHub Flavored Markdown.
2. Fixed links to point to this repository's Issue page.
3. Cleaned and organized sections: Overview, Features, Tech Stack, Structure, Security, Getting Started, and Deployment notes.
4. Made the deployment caveat explicit (fs vs production DB).

If you'd like, I can:
- Add a ready-to-commit LICENSE file (MIT or another).
- Generate a CONTRIBUTING.md template.
- Convert db.json persistence to a simple MongoDB or Prisma example and add instructions to switch to a production-ready datastore.
