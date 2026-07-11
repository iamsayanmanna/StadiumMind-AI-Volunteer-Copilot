# StadiumMind - AI Volunteer Copilot

StadiumMind is a Generative AI-powered operational assistant built for FIFA World Cup volunteers. It is designed to assist in managing crowd situations, providing multilingual translation help, and accelerating safety operational actions using Google Gemini.

## Features (Foundation Mode)

- **Design System:** Sleek, glassmorphic dark theme styled with Tailwind CSS v4.
- **Routing:** Configured Router structure using `react-router-dom`.
- **Firebase Service Wrapper:** Lightweight, safe client initialization with config warnings.
- **Google GenAI Client Wrapper:** Google GenAI `@google/genai` initializer with automated mock fallbacks when API keys are absent.
- **Commit Guard:** Husky and lint-staged integrated to prevent lint errors from being committed.
- **CI/CD:** Automated builds, TS verification, and lint validation in GitHub Actions.

---

## Getting Started

### 1. Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+ or v20+) installed on your machine.

### 2. Installation

Install project dependencies:

```bash
npm install
```

### 3. Environment Setup

Copy the template and configure your values (or leave them empty to run in local Mock Simulation Mode):

```bash
cp .env.example .env.local
```

### 4. Running Locally

Start the hot-reloading development server:

```bash
npm run dev
```

### 5. Running Linter

Check for styling and syntax violations:

```bash
npm run lint
```

### 6. Production Build

Compile the application and verify type correctness:

```bash
npm run build
```

---

## Project Documentation

All architectural specifications, prompt designs, API guides, and wireframes are stored inside the `docs/` directory:

- [System Architecture](docs/Architecture.md)
- [Prompt Engineering Spec](docs/PromptEngineering.md)
- [API Reference Guide](docs/API.md)
- [Wireframe Screen Layouts](docs/Wireframes.md)
- [Testing & QA Checklist](docs/TestingChecklist.md)
