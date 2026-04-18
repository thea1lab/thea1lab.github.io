# Problem-First Reframing: Site Copy Redesign

Date: 2026-04-14

## Problem

The A1 Lab website positions the company as an AI company first and a lab second. The hero leads with AI, the about section is titled "Where AI Fits In" with 6 AI-only capability cards, the FAQ says "AI is our main thing," and team credibility leads with AI. The effect is that visitors read "AI company" before they ever read "lab," which creates the perception that A1 Lab is an AI hammer looking for nails.

## Context

- AI is used in ~70%+ of projects, so it is the most common tool
- But the other ~30% includes custom software, integrations, process design, infrastructure, and DevOps
- Target clients are non-technical business owners
- The worst misperception to avoid: "AI hammer looking for nails"
- The lab metaphor and process are already strong — the issue is copy, not positioning

## Approach: Problem-First Reframing

Lead every section with the business problem or outcome, name AI as one of several tools in the lab's toolkit. AI appears in examples and qualifications, not in headlines. The copy earns trust by showing the lab recommends what fits, not what it specializes in.

## Changes

### Banner (Hero)

- **Title**: "We solve business problems fast. AI, software, or whatever the problem actually needs." (replaces AI-specific promise)
- **Proof point 3**: "Right tool for the job" (replaces "Technical plan for decisions")

### About Section

- **Section title**: "What We Build" (replaces "Where AI Fits In")
- **Card 3**: "Internal Assistants" (replaces "AI Assistants")
- **Card 4**: "Customer Support" (replaces "Automated Support")
- **Card 5**: "Software & Integrations" — new non-AI card replacing "Custom AI Models":
  - Dashboard that pulls data from ERP, CRM, and spreadsheets into one view
  - Internal tool to replace email-chain processes
  - API integration connecting disconnected systems
  - Workflow that routes work without manual handoffs
- **Card 6**: "Prediction & Analytics" (minor rename from "Prediction and Analytics")

### Service Section

- **Phase 2 serviceType**: "Technology Prototyping" (replaces "AI Prototyping")
- **Phase 2 content**: examples now include "support automation, internal tool, data integration" (replaces "support automation, document classification, internal assistant")

### Team/Expertise

- **Credibility badge 1**: "Masters in Computer Science" (removes "and AI")
- **Credibility badge 4**: "Web apps, mobile, AI, and integrations" (replaces "Web apps, mobile, and artificial intelligence")

### FAQ

- **"What types of technology do you work with?" answer**: "We're a technology lab. AI is what we reach for most often, but we also build software, set up integrations, and automate processes. We recommend whatever actually solves the problem." (replaces "AI is our main thing, but we also work with...")

### Author Bio

- "I work on technology problems" (replaces "I work on AI and software problems")

### i18n Strings

- `hero_proof_3` (EN): "Right tool for the job" (replaces "Technical plan for decisions")
- `hero_proof_3` (PT): "Ferramenta certa pra cada caso" (replaces "Plano técnico para decisão")

### config.toml

- `knowsAbout` reordered to lead with Software Engineering, API Integration, Process Automation, Document Processing before AI-specific terms

## Files Modified

| File | Change |
|------|--------|
| `data/en/banner.yml` | Hero title |
| `data/pt/banner.yml` | Hero title |
| `data/en/about.yml` | Section title, description, card titles, new card #5, card #6 rename |
| `data/pt/about.yml` | Section title, description, card titles, new card #5, card #6 rename |
| `data/en/service.yml` | Phase 2 serviceType + content |
| `data/pt/service.yml` | Phase 2 serviceType + content |
| `data/en/team.yml` | Credibility badges 1 and 4 |
| `data/pt/team.yml` | Credibility badges 1 and 4 |
| `data/en/faq.yml` | One answer |
| `data/pt/faq.yml` | One answer |
| `content/english/author/claudio-scheer.md` | Bio line |
| `content/portuguese/author/claudio-scheer.md` | Bio line |
| `i18n/en.yaml` | hero_proof_3 |
| `i18n/pt.yaml` | hero_proof_3 |
| `config.toml` | knowsAbout reorder |

## What Didn't Change

- Feature section (Lab Steps) — already process-focused, no AI mentions
- CTA section — already problem-focused, no AI mentions
- Contact section — no AI mentions
- Projects section — described by what they do, not by technology
- Blog post (AI Planning) — topic-specific post about AI, should mention AI
- Disabled placeholder sections — not relevant
