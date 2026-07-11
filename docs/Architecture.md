# StadiumMind Architecture

This document describes the software architecture and component design of the **StadiumMind AI Volunteer Copilot** application.

```mermaid
graph TD
    %% User Interface Layer
    subgraph UI [User Interface Layer]
        App[App.tsx]
        Layout[src/components/layout/*]
        UIComponents[src/components/ui/*]
        SharedComponents[src/components/shared/*]
    end

    %% State and Routing Layer
    subgraph Core [Core State & Routing]
        Router[src/router/*]
        UIContext[src/context/UIContext.tsx]
        Hooks[src/hooks/*]
    end

    %% Services Layer
    subgraph Services [External Services Layer]
        FBAuth[src/services/firebase/auth.ts]
        FBDB[src/services/firebase/firestore.ts]
        GeminiClient[src/services/gemini/client.ts]
        GeminiMock[src/services/gemini/mock/index.ts]
    end

    %% External Systems
    subgraph Platform [Google Services Platform]
        FirebaseCloud[Firebase Firestore & Auth]
        GeminiAPI[Google GenAI Gemini 2.5]
    end

    %% Flow Connections
    App --> UIContext
    App --> Router
    Router --> Layout
    Layout --> UIComponents
    Layout --> SharedComponents

    Layout --> Hooks
    Hooks --> FBAuth
    Hooks --> FBDB
    Hooks --> GeminiClient

    FBAuth -.-> FirebaseCloud
    FBDB -.-> FirebaseCloud
    GeminiClient -.-> GeminiAPI
    GeminiMock -.-> GeminiClient
```

## System Overview

StadiumMind is structured as a lightweight, client-heavy React single-page application built on top of Vite and TypeScript. It utilizes Firebase for persistence and authentication, and Google GenAI SDK for intelligence.

## Directory Structure

- `src/components/ui/`: Presentation-only elements (buttons, inputs).
- `src/components/layout/`: Global structure templates (headers, wrappers).
- `src/components/shared/`: Cross-cutting helpers (loaders, boundary fallbacks).
- `src/context/`: React context states (UI drawer switches).
- `src/router/`: React Router routes config.
- `src/services/firebase/`: Firebase configuration, anonymous login wrappers, and collections.
- `src/services/gemini/`: Client initialization, operational prompt instructions, mock responses.
- `src/styles/`: CSS theme tokens, animations, and Tailwind directives.

## Design Decisions

1. **Vite + React + TypeScript:** Ensures rapid hot-reloading in development and robust static analysis.
2. **Tailwind CSS v4 CSS-First Customization:** Theme variables are configured within standard CSS files (`theme.css` and `animations.css`), decoupling styling configuration from complex JSON config files.
3. **Mock Fallback Strategy:** If environment variables (`VITE_GEMINI_API_KEY`, etc.) are missing, services fall back to simulating responses locally. This ensures smooth onboarding and local testing.
