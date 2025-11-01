# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- Single-page React app built with Vite, Tailwind CSS, and a custom UI kit (shadcn/radix-inspired) under src/components/ui.
- Client-only authentication via AuthProvider with localStorage; role-based routing guards.
- React Query provider is initialized for future data fetching.
- Vite alias @ -> ./src and dev server runs on http://localhost:8080.
- Node.js 18+ recommended (per README).

Commands
- Install dependencies (npm as primary per README):
  - npm install
- Start dev server (port 8080):
  - npm run dev
- Build (production):
  - npm run build
- Build in development mode (useful for faster, non-minified bundles):
  - npm run build:dev
- Preview built app locally:
  - npm run preview
- Lint (ESLint config targets TS/TSX files primarily):
  - npm run lint

Testing
- No test runner is configured in package.json. There are no *.test.* files or test scripts.

Architecture and key flows
- Routing and access control
  - BrowserRouter is defined in src/App.jsx with Routes for public (/, /auth/:mode) and role-gated areas.
  - ProtectedRoute (inline in AppContent) redirects unauthenticated users to /auth/login and enforces allowedRoles per route.
  - Admin routes render inside AdminLayout for sidebar navigation; other role dashboards are standalone pages.
- Authentication model
  - src/components/auth/AuthProvider.jsx provides user, isAuthenticated, login, register, logout via context.
  - State persists to localStorage under key user; this is a demo/mock auth.
  - Role resolution: on login, role inferred from email containing admin/guest/staff, otherwise defaults to management; on register, role is selected by the user.
- UI and design system
  - Reusable primitives in src/components/ui (mixture of .tsx and .jsx) wrap Radix/Lucide and Tailwind.
  - Tailwind configured in tailwind.config.ts with CSS variable-driven tokens (colors, radii, shadows, gradients). PostCSS via postcss.config.js.
  - Global styles at src/index.css and per-component styles via Tailwind classes.
- State/query layer
  - QueryClientProvider (from @tanstack/react-query) wraps the app in App.jsx. Add future server interactions using React Query.
- Vite configuration
  - vite.config.ts sets server.host "::", port 8080, and alias @ -> ./src. React SWC plugin is enabled.
- Linting
  - eslint.config.js uses @eslint/js and typescript-eslint; rules apply primarily to **/*.{ts,tsx}. JS/JSX files are not strongly linted by default.

Conventions for future changes
- Use the @ alias for imports from src (e.g., import { Button } from "@/components/ui/button").
- When adding a new page or dashboard:
  - Create the component under src/pages and wire the route in src/App.jsx.
  - If the page is protected, wrap it with ProtectedRoute and specify allowedRoles.
  - Admin pages that need the sidebar should be children of <AdminLayout>.
- Prefer UI components from src/components/ui to keep styling consistent with the design tokens in tailwind.config.ts.
- For data fetching, prefer React Query hooks and the existing QueryClientProvider context.

Notable references
- README.md contains setup basics (Node 18+, npm workflow) and a high-level feature list.
- Key configs: vite.config.ts (port/alias), tailwind.config.ts (design tokens), postcss.config.js, eslint.config.js.
