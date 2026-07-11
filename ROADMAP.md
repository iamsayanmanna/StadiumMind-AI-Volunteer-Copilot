# StadiumMind Development Roadmap

Milestone map from initial repository initialization to the production-quality submission.

## Phase 1: Project Foundation (Completed)

- [x] Scaffold React + Vite + TypeScript.
- [x] Configure Tailwind CSS v4 design tokens and animations.
- [x] Setup path aliases and ESLint flat configurations.
- [x] Initialize Google GenAI and Firebase service wrappers with local mock logic.
- [x] Setup Husky pre-commit hooks and GitHub Actions CI workflow.

## Phase 2: Heads-Up Display (HUD) Interface

- [ ] Implement responsive viewport layout (Header, collapsible Sidebar, Main panels).
- [ ] Build interactive status indicator bar showing current sector crowd risk level.
- [ ] Build Crowd Incident reporting form (obs details, category select).
- [ ] Build Multilingual Translation panel tabs.

## Phase 3: Firebase Operational Data Sync

- [ ] Integrate Firestore collections for `crowd_reports`.
- [ ] Implement query listeners to list active incidents in real-time.
- [ ] Setup anonymous authentication triggers on landing.

## Phase 4: Google Gemini AI Integration

- [ ] Connect Gemini `generateContent` using structured schemas.
- [ ] Integrate risk assessment extraction prompt logic.
- [ ] Integrate multilingual translation and phonetic parsing prompts.
- [ ] Build toggle to switch between Live API and local Mock Simulation values.

## Phase 5: Verification & QA Validation

- [ ] Execute automated test coverage verify files.
- [ ] Perform browser responsiveness audits on mobile screen sizes.
- [ ] Hardening: Error boundary layout handling for failed API responses.
