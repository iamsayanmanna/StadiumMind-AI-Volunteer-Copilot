# StadiumMind UI Wireframes

This document outlines the visual structure and placement of components within StadiumMind.

## 1. Global HUD Layout

```text
+-----------------------------------------------------------------------------+
| [SM Logo] StadiumMind | LUSAIL STADIUM VOLUNTEER       [WiFi] [Cloud Synced] |
+-----------------------------------------------------------------------------+
| (Sidebar Nav)     | (Main Operational Viewport)                             |
|                   |                                                         |
| [!] Crowd Status  | +-----------------------------------------------------+ |
|     (Active)      | | Real-Time Incident Board                            | |
|                   | | [Sector A - Gate bottleneck] [HIGH RISK]            | |
| [A] Translation   | +-----------------------------------------------------+ |
|                   |                                                         |
| [i] Info Directory| +-----------------------------------------------------+ |
|                   | | Report Form                                         | |
|                   | | [Textarea: Write observation here]                  | |
|                   | |                                                     | |
|                   | | [Button: Assess Situation (Gemini AI)]              | |
|                   | +-----------------------------------------------------+ |
+-----------------------------------------------------------------------------+
```

## 2. Crowd Safety Assessor View

- **Input:** Single-line inputs + large observation text area.
- **AI Assessment Panel:** Rendered in high-contrast card blocks.
  - Risk badges: `LOW` (green border), `MEDIUM` (orange border), `HIGH` (alert red border with glow).
  - Recommended Actions: Unordered bullet lists with checkboxes for volunteers to mark off.

## 3. Multilingual Translation View

- **Language Selector:** Quick horizontal tab filters (Spanish, French, Arabic, German, Japanese, Portuguese).
- **Dual-Pane Layout:**
  - _Left Pane:_ Volunteer text input + Quick speech simulator inputs.
  - _Right Pane:_ Translation Output, phonetic pronunciation box, and situational response tips.
