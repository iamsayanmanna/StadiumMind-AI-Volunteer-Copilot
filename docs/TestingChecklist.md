# StadiumMind Testing & QA Checklist

This checklist tracks quality validation steps for the StadiumMind volunteer copilot platform.

## 1. Project Initialization & Foundation Setup

- [x] React SPA is scaffolded with Vite and TypeScript.
- [x] Tailwind CSS v4 is compiled via CSS-first configurations.
- [x] ESLint configurations are running against flat configs.
- [x] Prettier styles are formatting code on save.
- [x] Custom path aliases (`@/*` mapping to `src/*`) resolve during compile.
- [x] Environment files (`.env.example`, `.env.local`) are defined.
- [x] GitHub Actions workflow `.github/workflows/ci.yml` is defined and tests push/PRs.
- [x] Husky pre-commit hook runs `npx lint-staged` on git commit.

## 2. Compile and Quality Checks

- [ ] `npm install` installs with 0 critical vulnerabilities.
- [ ] `npm run lint` executes with 0 warnings/errors.
- [ ] `npm run build` generates a production `/dist` bundle with 0 errors.
- [ ] `npm run dev` boots the dev server successfully.

## 3. Integration & Fallbacks

- [ ] Firebase Config fallback log warning is triggered if env keys are missing.
- [ ] Gemini API client warning is triggered if API key is missing.
- [ ] Gemini mock service retrieves simulated responses within 1.5 seconds.
- [ ] Router paths load correct page placeholders (Dashboard, Not Found page).
