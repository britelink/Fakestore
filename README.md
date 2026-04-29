![BRITEEDUCATION Logo](public/briteeducation-logo.png)

# BRITEEDUCATION Academic Codebase Demo

This repository is an academic demo project for BRITEEDUCATION School of Technology.
It showcases a modern `Next.js` app with:

- Route handlers (`app/api/...`) for backend API logic
- Cookie-based auth flow using Fake Store API tokens
- Protected pages using middleware
- PostgreSQL-ready database integration with `pg` and Prisma schema setup

## Project Purpose

This codebase is designed for students to practice:

- Building full-stack features in the App Router architecture
- Designing API endpoints with clear validation and error handling
- Connecting external APIs (Fake Store API) with local app flows
- Preparing a production-ready database layer

## Tech Stack

- `Next.js` (App Router)
- `TypeScript`
- `PostgreSQL` via `pg`
- `Prisma` schema and generated client
- External API: [Fake Store API](https://fakestoreapi.com/)

## API Design Principles Used

- **Clear HTTP methods**
  - `POST` for login/register actions
  - `GET` for product retrieval
  - `DELETE` for logout (cookie cleanup)
- **Header validation**
  - JSON endpoints require `Content-Type: application/json`
- **Input validation**
  - Required fields are checked before any upstream request
- **Consistent status codes**
  - `200` success, `201` created, `400` bad request, `401` unauthorized, `500/502` server/upstream errors
- **Secure cookie handling**
  - Token stored in `httpOnly` cookie (`fakeStoreToken`) with `sameSite` and `secure` rules

## API Endpoints

- `POST /api/register`
  - Registers a user through Fake Store API (`/users`)
  - Expects JSON body: `email`, `password`, and optional `username` / `name`
- `POST /api/login`
  - Authenticates with Fake Store API (`/auth/login`)
  - Expects JSON body: `username`, `password`
  - Saves token in `fakeStoreToken` cookie
- `DELETE /api/login`
  - Logs out by clearing the auth cookie
- `GET /api/products`
  - Requires `fakeStoreToken` cookie
  - Proxies and returns products from Fake Store API (`/products`)

## Auth and Route Protection

- `middleware.ts` protects `/products` routes
- Unauthenticated users are redirected to `/login`
- Logged-in users visiting `/login` are redirected to `/products`

## Database Notes

- `lib/db.ts` creates a PostgreSQL connection pool from `DATABASE_URL`
- `prisma/schema.prisma` includes a starter `User` model
- This setup demonstrates how to combine external API data with your own DB-backed entities

## Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DB_NAME"
```

## Run the Project (Students)

Choose **one** package manager.

### Option 1: Bun

```bash
bun install
bun run dev
```

### Option 2: npm

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Useful Scripts

- `dev` - start development server
- `build` - create production build
- `start` - run production server
- `lint` - run ESLint

## Suggested Academic Demo Flow

1. Register a user from the UI.
2. Log in to create the auth cookie.
3. Access `/products` (protected route).
4. Inspect `/api/products` response and discuss API design choices.
5. Extend DB usage by storing user/session metadata locally.
