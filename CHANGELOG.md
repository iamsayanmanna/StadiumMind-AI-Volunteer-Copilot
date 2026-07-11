# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-07-10

### Added

- Scaffolded React 19 single-page application with Vite and TypeScript.
- Integrated Tailwind CSS v4 using CSS-first variables configurations.
- Configured ESLint flat configs and Prettier rules.
- Set up `@/*` path alias mapping in tsconfig and vite.
- Created environment templates `.env.example` and local `.env.local` templates.
- Configured Firebase initialization in `services/firebase/` with anonymous auth and CRUD Firestore function structures.
- Configured Google GenAI SDK initial setup in `services/gemini/` with prompt templates and mock response simulation methods.
- Initialized Husky and lint-staged to run pre-commit quality gates.
- Configured GitHub Actions CI pipeline in `.github/workflows/ci.yml`.
- Created comprehensive documents: `Architecture.md`, `PromptEngineering.md`, `API.md`, `Wireframes.md`, and `TestingChecklist.md`.
