# NITDA eCommerce Regulatory Sandbox

The NITDA eCommerce Regulatory Sandbox is a frontend platform for helping Nigerian startups and digital businesses understand, apply for, and participate in a regulatory sandbox programme.

I built the project around a simple idea: regulatory processes should feel clear, guided, and measurable rather than administrative and difficult to follow. The platform gives businesses a place to submit an application, understand the next step, track testing progress, review guidelines, and ask an AI assistant questions about compliance. It also gives administrators a focused workspace for reviewing applications, assigning test cases, and monitoring progress.

> **Project status:** This repository is currently a frontend prototype and demonstration. It uses mock authentication, in-memory application data, and simulated API actions so the complete product experience can be explored without a backend.

## Why this project matters

Regulatory sandboxes create a safe environment where innovative products can be tested before wider market deployment. That process needs more than a form. Businesses need clarity about what to submit, what compliance areas matter, how testing works, and what to do after feedback. Regulators need structured information, consistent review workflows, and visibility into testing outcomes.

This project brings those needs together in one user experience:

- A public landing experience that explains the sandbox.
- A guided business application flow.
- Role-based business and administrator portals.
- Application review and status management.
- Structured test cases and progress reporting.
- Guidelines and compliance resources.
- An AI-powered compliance assistant focused on the NITDA sandbox context.

## Core capabilities

### For businesses

- Create an account and sign in.
- Submit a multi-step sandbox application.
- Describe the product, innovation category, target market, business model, technical approach, and data-handling practices.
- Upload application attachments through the application interface.
- Track application progress from submission through testing and completion.
- View assigned test cases and testing requirements.
- Upload progress reports and supporting evidence.
- Read sandbox guidelines.
- Ask the Compliance Assistant questions about NDPR, regulatory readiness, test cases, and documentation.

### For administrators

- View an overview of sandbox activity.
- Search and filter applications by business, product, contact, and status.
- Review application details.
- Change application status.
- Inspect risk flags, AI summaries, test cases, and progress information.
- Add test cases and requirements to an application.
- Review progress reports.
- Manage the guidelines area.

## Architecture

The application is a single-page React application built with TypeScript and Vite. The architecture is intentionally organized around product responsibilities rather than one large collection of page components.

```text
src/
├── components/
│   ├── auth/              Protected route and access-control components
│   ├── navigation/        Headers, navbars, sidebars, and footer
│   └── ui/                Reusable interface components such as Button
├── contexts/
│   └── AuthContext.tsx    Authentication state, login, registration, logout
├── layouts/
│   ├── AdminLayout.tsx    Shared administrator shell
│   ├── AuthLayout.tsx     Login and registration shell
│   └── BusinessLayout.tsx Shared business portal shell
├── lib/
│   └── utils.tsx          Shared class-name utility using clsx and tailwind-merge
├── models/
│   └── Application.ts     Application domain types, statuses, and demo data
├── pages/
│   ├── admin/             Review dashboards, applications, reports, guidelines
│   ├── auth/              Login and registration screens
│   ├── business/          Application, testing, progress, guidelines, AI assistant
│   └── index.tsx          Public landing page
├── types/
│   └── components.tsx     Shared component prop types
├── App.tsx                Router and application composition root
├── main.tsx               React entry point
└── index.css              Tailwind layers and design tokens
```

### How the application fits together

`main.tsx` mounts the React application in `StrictMode` and loads the global stylesheet. `App.tsx` is the composition root: it connects the `AuthProvider`, React Router, role-protected route groups, and toast notifications.

The routing model separates the product into three experiences:

- `/auth/*` for authentication.
- `/admin/*` for protected regulator workflows.
- `/business/*` for protected business workflows.

`AdminLayout` and `BusinessLayout` provide the shared navigation and page frame for their respective roles. `ProtectedRoute` checks the current user and redirects unauthenticated or incorrectly scoped users to the appropriate area. This keeps access decisions at the route boundary instead of repeating them inside every page.

The application domain is represented by typed models in `src/models/Application.ts`. Application status, risk flags, test cases, progress reports, attachments, and review metadata are modeled explicitly. That gives the UI a clear contract and makes the current mock data straightforward to replace with API responses later.

## Engineering approach

A few engineering choices shape the project:

- **TypeScript-first development:** Domain objects, user roles, application statuses, and component props are typed rather than left as unstructured JavaScript objects.
- **Separation of concerns:** Routing, authentication, layouts, domain models, navigation, reusable UI, and feature pages have distinct homes.
- **Role-aware navigation:** Admin and business users receive different layouts, navigation items, and route permissions.
- **Reusable visual language:** Tailwind CSS, shared color variables, the `Button` component, Lucide icons, and `cn()` keep the interface consistent.
- **Progressive form validation:** The business application is split into steps and validates the information needed for each stage before moving forward.
- **Clear workflow states:** Application states such as `submitted`, `under_review`, `approved`, `testing`, and `completed` drive status badges, progress indicators, next steps, and notifications.
- **Responsive layouts:** The dashboard shells include mobile sidebar behavior, responsive grids, and mobile-friendly navigation patterns.
- **Deployment-aware routing:** `vercel.json` rewrites client-side routes to `index.html`, allowing React Router routes to work when deployed as a Vercel SPA.
- **Quality checks:** ESLint is configured for TypeScript, React hooks, and React refresh. The project also includes a production build and preview workflow through Vite.

This is not presented as a completed backend architecture yet. The frontend boundaries are deliberately clear so authentication, persistence, file storage, notifications, and review APIs can be introduced without rewriting the whole interface.

## AI and the Compliance Assistant

The Compliance Assistant is integrated into the business portal at `/business/chatbot`. It uses Google's Generative AI SDK with the Gemini model to provide conversational guidance in the context of the NITDA eCommerce Regulatory Sandbox.

The assistant is guided to help with:

- NDPR and related regulatory concepts.
- Sandbox readiness and participation requirements.
- Application documentation.
- Compliance-oriented test cases.
- Data handling and privacy questions.
- Practical next steps and common review concerns.

The assistant is intentionally framed as a guidance tool rather than a legal adviser. Its system instruction tells it to use simple language, ask clarifying questions, avoid assumptions, and make it clear that its responses are not legal advice. Responses are formatted for readability in the chat interface through `src/pages/business/Formatting.ts`.

### Important AI security note

The current prototype initializes the Gemini client directly inside `ComplianceChatbot.tsx` and contains a credential in client-side code. That is acceptable for a temporary local demonstration only. Before production use, the AI request should move behind a secure server-side endpoint, with the key stored in server-managed environment variables, request limits applied, user input handled safely, and audit/privacy controls added.

## Technology stack

- **Language:** TypeScript
- **UI:** React 18
- **Build tool:** Vite 5
- **Routing:** React Router 6
- **Styling:** Tailwind CSS, PostCSS, and Autoprefixer
- **Icons:** Lucide React and React Icons
- **Notifications:** React Toastify
- **AI integration:** Google Generative AI SDK with Gemini
- **Code quality:** ESLint, TypeScript ESLint, React Hooks rules
- **Deployment target:** Vercel-compatible SPA deployment

## Getting started

### Requirements

- Node.js 18 or newer
- npm
- A Gemini API key if you want to use the Compliance Assistant

### Install and run locally

```bash
git clone https://github.com/InnovateTechWorld/NITDASANDBOX.git
cd NITDASANDBOX
npm install
npm run dev
```

Vite will print the local development URL in the terminal.

### Available scripts

```bash
npm run dev       # Start the development server
npm run build     # Create a production build
npm run preview   # Preview the production build locally
npm run lint      # Run ESLint
```

## Demo accounts

The current prototype uses the sample users defined in `src/contexts/AuthContext.tsx`:

| Role | Email | Password |
|---|---|---|
| Administrator | `admin@nitda.gov.ng` | `admin123` |
| Business | `business@example.com` | `business123` |

These credentials are for local demonstration only and must not be used as a production authentication model.

## Current prototype boundaries

The project is intentionally honest about what is and is not implemented yet:

- Authentication is mocked and stored in browser `localStorage`.
- Application records come from `MOCK_APPLICATIONS` in `src/models/Application.ts`.
- Several submit, status-change, upload, and review actions simulate API calls in the browser.
- There is no persistent database or backend service in this repository.
- File attachments are handled at the UI level and are not uploaded to durable storage.
- The AI integration needs to be moved to a protected backend before deployment.
- Production authorization, audit logging, validation at the API boundary, and secure secret management still need to be added.

These boundaries make the repository useful as a product prototype and a strong starting point for the next engineering phase: replacing the mock services with well-defined APIs while preserving the existing user journeys.

## Suggested production evolution

A production version could evolve in the following order:

1. Add a backend API for identity, businesses, applications, reviews, test cases, progress reports, and guidelines.
2. Replace mock authentication with secure session or token-based authentication and server-side role enforcement.
3. Move application and progress data into a relational database with migrations and audit history.
4. Add object storage for pitch decks, evidence, and other attachments.
5. Move Gemini calls behind a server-side AI service with secrets, rate limits, moderation, observability, and prompt/version management.
6. Add automated tests for route protection, form validation, application status transitions, and critical user journeys.
7. Add CI checks for type-checking, linting, builds, and dependency/security scanning.
8. Introduce API error states, loading states, optimistic updates where appropriate, and accessible empty states throughout the portal.

## Design principles

The product experience is built around a few practical principles:

- **Make compliance understandable.** Legal and regulatory processes should be translated into clear actions.
- **Show users where they are.** Status, progress, next steps, and feedback should always be visible.
- **Separate responsibilities.** Businesses and administrators need different tools, permissions, and language.
- **Use AI as an assistant, not an authority.** The Compliance Assistant should improve access to information without pretending to replace professional legal or regulatory judgment.
- **Build for the next version.** The prototype should be easy to connect to real services without losing the clarity of the current product model.

## License

No license has been declared for this repository yet. Add a license file before distributing or reusing the project publicly.
