# Buddy Script — Next.js (App Router, TypeScript, client components, static export)

The static "Buddy Script" HTML/CSS template (login, registration, feed) converted
into a Next.js 16 project using the **App Router** (`src/app`), in **TypeScript**,
with every route as a `"use client"` component and static export enabled
(no SSR / no Node server needed at runtime).

## Structure

```
public/assets/                  template css, images, fonts, js — served as-is
src/app/layout.tsx              root layout (server component) — template <link> tags
src/app/page.tsx                "use client" — redirects to /login
src/app/login/page.tsx          "use client" — from login.html
src/app/registration/page.tsx   "use client" — from registration.html
src/app/feed/page.tsx           "use client" — from feed.html
src/app/profile/, chat/, friend-request/, group/,
  event/, event-single/, find-friends/     "use client" placeholder stub routes
```

## Why these choices

- **App Router, not Pages Router** — every route lives under `src/app/<route>/page.tsx`.
- **`"use client"` on every page** — the App Router's default is Server Components;
  adding `"use client"` at the top of each page opts it back into being a plain
  client component (matches how the original template behaved: everything runs
  in the browser).
- **`output: "export"` in `next.config.ts`** — this is what actually removes
  server-side rendering. `next build` emits fully static `.html` files into
  `out/`; there's no per-request server work and no Node process required to
  serve the site. (`"use client"` alone does not disable SSR — Next.js still
  pre-renders client components to HTML at build/request time and then
  hydrates them; it's `output: "export"` that turns that pre-render into a
  one-time, build-time step with a plain static host afterward.)
- The `/` → `/login` redirect uses `useRouter().replace(...)` inside a client
  `useEffect`, since static export doesn't support server redirect functions.

## Fixes carried over from earlier conversions

- HTML→JSX: `class`→`className`, `for`→`htmlFor`, void elements self-closed,
  SVG attrs camelCased, `checked`/`selected`→`defaultChecked`/`defaultSelected`.
- Two `<button href="#0">` elements in the original `feed.html` (invalid HTML —
  `href` isn't a valid `<button>` attribute) — removed; nothing in `custom.js`
  depended on it.
- One pre-existing extra unmatched `</div>` near the end of the original
  `feed.html` — fixed (harmless in loose HTML, a hard error under JSX).
- Internal nav links rewired to the new routes.

## Build & run

```bash
npm install
npm run build     # type-checks + generates the static site into out/
npx serve out      # or any static file server
```

`npm run dev` still works for local development with hot reload — the
`output: "export"` setting only affects `next build`.
