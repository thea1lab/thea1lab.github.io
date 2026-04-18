# Service-Specific Landing Pages — Implementation Plan

## What we're building

8 keyword-targeted landing pages (4 services x 2 languages), each with plain-language service description, capability bullets, technologies, a "How we'd work on this" scenario section, and a CTA that scrolls to an embedded contact form. No fabricated testimonials or fake metrics.

---

## URL structure

| Service | EN URL | PT URL |
|---|---|---|
| Integrations & APIs | `/integrations/` | `/pt/integracoes-e-apis/` |
| Document Processing | `/document-processing/` | `/pt/processamento-de-documentos/` |
| AI & Agents | `/ai-agents/` | `/pt/agentes-de-ia/` |
| Automation & Orchestration | `/automation/` | `/pt/automacao-e-orquestracao/` |

English is the default language (`defaultContentLanguage = "en"`, weight=1), so EN URLs have no `/en/` prefix. PT URLs get the `/pt/` prefix automatically. URLs are set via `url:` in front matter.

---

## File inventory

### Create (13 files total)

| # | File | Purpose |
|---|---|---|
| 1 | `themes/meghna/layouts/services/single.html` | Layout template for all service pages |
| 2 | `data/en/services.yml` | EN service data (all 4 services, keyed by slug) |
| 3 | `data/pt/services.yml` | PT service data (all 4 services, keyed by slug) |
| 4 | `content/english/services/_index.md` | EN section branch page |
| 5 | `content/english/services/integrations/index.md` | EN integrations page |
| 6 | `content/english/services/document-processing/index.md` | EN document processing page |
| 7 | `content/english/services/ai-agents/index.md` | EN AI & agents page |
| 8 | `content/english/services/automation/index.md` | EN automation page |
| 9 | `content/portuguese/servicos/_index.md` | PT section branch page |
| 10 | `content/portuguese/servicos/integracoes-e-apis/index.md` | PT integrations page |
| 11 | `content/portuguese/servicos/processamento-de-documentos/index.md` | PT document processing page |
| 12 | `content/portuguese/servicos/agentes-de-ia/index.md` | PT AI & agents page |
| 13 | `content/portuguese/servicos/automacao-e-orquestracao/index.md` | PT automation page |

**Directory naming convention:** EN uses `services/` (matches English convention), PT uses `servicos/` (matches existing PT convention where `projetos/` and `equipe/` use Portuguese names). URLs are set via `url:` front matter, so directory names don't affect visible URLs.

---

### Modify (5 files)

| # | File | Change |
|---|---|---|
| 14 | `data/en/team.yml` | Add `link:` to each qualification item |
| 15 | `data/pt/team.yml` | Add `link:` to each qualification item |
| 16 | `themes/meghna/layouts/partials/team.html` | Wrap capability card in `<a>` when `$item.link` exists |
| 17 | `themes/meghna/assets/css/custom.css` | Append service-landing styles |
| 18 | `i18n/en.yaml` + `i18n/pt.yaml` | Append i18n strings for service page labels |

### Modify — required for SEO (1 file)

| # | File | Change |
|---|---|---|
| 19 | `themes/meghna/layouts/partials/schema.html` | Add `Service` schema branch for `type: services` pages |

---

## Data-key naming convention

All service identifiers use **hyphens**, consistent across:
- YAML top-level keys in `data/{lang}/services.yml`
- `service_key:` in page front matter
- URL slugs (EN)

The four canonical keys: `integrations`, `document-processing`, `ai-agents`, `automation`.

This guarantees `index $data.services .Params.service_key` lookups succeed, and keeps the identifier, URL slug, and data key visually aligned for future maintenance.

---

## Layout template: `services/single.html`

Renders these sections in order:

1. **Navigation** — `{{ partial "navigation.html" . }}`
2. **Service hero** — Eyebrow, H1 with target keyword, 1-2 sentence description. Uses `.service-landing-hero` styling (background dots, bold heading, matching existing hero style but adapted for sub-pages — no full-height hero, just a padded section).
3. **Capabilities + Technologies** — Two groups side by side on desktop, stacked on mobile. Each group uses the existing `.capability-card` / `.capability-list` CSS classes from the team section. Pulled from `$svc.capabilities`.
4. **How we'd work on this** — Three cards (Challenge / Approach / Result) in a grid. Uses realistic scenario framing, no fake client names. Matches the direct tone in `feature.yml` and `service.yml`. Pulled from `$svc.how_we_work`.
5. **CTA block** — Simplified version of `.cta-panel` with "Book a free consultation" button linking to `#contact` on the same page.
6. **Contact form** — `{{ partial "contact.html" . }}` (already works independently, reads from `data/{lang}/contact.yml`).
7. **Footer** — Inherited from `baseof.html`.

Data lookup inside template:

```go
{{ $data := index hugo.Data site.Language.Name }}
{{ $svc := index $data.services .Params.service_key }}
```

**Verified:** `site.Language.Name` returns `"en"` / `"pt"` (same as `.Lang` in this Hugo version). Data files in `data/en/` and `data/pt/` are indexed correctly. The contact partial also uses the same pattern and works from any page type, not just the homepage.

---

## Content page front matter schema

Each `index.md` uses:

```yaml
---
title: "API Integration & System Connection Services"
description: "Connect ERPs, CRMs, and internal tools through reliable APIs and webhooks. Diagnostic in 1-2 weeks, working prototype in 2-4 weeks."
type: services
service_key: integrations
translationKey: services-integrations
url: /integrations/
---
```

- `type: services` tells Hugo to use `layouts/services/single.html` (takes priority over section-derived type)
- `service_key` maps to the key in `data/{lang}/services.yml`
- `translationKey` pairs EN/PT versions for `.Rotate "language"` → hreflang alternates in `head.html`. **Required** because EN/PT paths differ (`services/` vs `servicos/` and different slugs) — without it, `.Rotate "language"` returns zero results.
- `url` controls the slug. For the default language (EN), `url: /integrations/` produces `/integrations/`. For PT, `url: /integracoes-e-apis/` produces `/pt/integracoes-e-apis/` (Hugo auto-prends the language prefix for non-default languages).
- `description` flows into `<meta name="description">` (via `head.html:15`) and OG tags (via `opengraph.html:11`)
- No `image:` front matter for now — falls back to site default OG image (`images/full-background-logo.webp`)

Section branch pages (`_index.md`):
- `content/english/services/_index.md` → `title: "Services"`, `url: /services/`
- `content/portuguese/servicos/_index.md` → `title: "Serviços"`, `url: /servicos/`

Both are explicit (not relying on directory-name defaults) so the URL shape is obvious from the file.

**Critical:** Without `services/single.html`, Hugo falls through to `_default/single.html`, which renders service pages as blog posts with author/date metadata and Disqus comments. The service template must be created.

---

## Data file schema: `data/{lang}/services.yml`

One file per language, keyed by service slug:

```yaml
integrations:
  hero:
    eyebrow: "Integration Services"
    title: "API Integration & System Connection Services"
    description: "Connect ERPs, CRMs, spreadsheets, and third-party tools so data flows without manual re-entry."
  capabilities:
    - title: "What we build"
      items:
        - "ERP to CRM sync pipelines"
        - "Webhook-driven event flows"
        - "Cross-platform automation (Slack, WhatsApp, email)"
        - "Data synchronization between disconnected tools"
    - title: "Technologies"
      items:
        - "REST and GraphQL APIs"
        - "Message queues (SQS, RabbitMQ)"
        - "OAuth2, JWT, HMAC authentication"
        - "Zapier, Make, and custom middleware"
  how_we_work:
    challenge_label: "A common situation"
    challenge: "A team re-enters orders from the ERP into the CRM every morning. Someone copies client data from one spreadsheet into another. Mistakes get through, and by month-end the reports don't match."
    approach_label: "How we'd approach it"
    approach: "Map the integration surface, build a one-way sync with idempotent writes, add observability logs so you can see what went through and what didn't. Ship in 2-4 weeks."
    result_label: "What you'd get"
    result: "A working pipeline, a technical plan, and baseline metrics. After 30 days of use, you'd have real numbers on time saved and errors caught."
  cta:
    label: "Book a free consultation"
    link: "#contact"

document_processing:
  # ... same schema (hero / capabilities / how_we_work / cta)

ai_agents:
  # ...

automation:
  # ...
```

The capabilities bulleted lists in each service are expanded from the existing `data/{en,pt}/team.yml` qualifications — the 4-item summaries become detailed, SEO-friendly items plus a separate technologies group.

All copy written through the humanizer lens:
- No "leverage", "streamline", "cutting-edge", "comprehensive"
- Plain language explaining what the service solves
- Direct tone matching the existing site copy (see `service.yml`, `feature.yml`, `faq.yml`)
- Portuguese content written natively, not translated

---

## Homepage link-out: `team.html` modification

Minimal change to `themes/meghna/layouts/partials/team.html` lines 41-55:

```html
<article class="col-lg-6 col-md-6 col-12 ...">
  {{ if $item.link }}<a href="{{ $item.link | relLangURL }}" class="capability-card-link">{{ end }}
  <div class="service-block capability-card">
    <!-- existing inner content unchanged -->
  </div>
  {{ if $item.link }}</a>{{ end }}
</article>
```

And in `data/{en,pt}/team.yml`, add `link:` to each qualification. **`relLangURL` prepends the language prefix for non-default languages automatically.** Each language's data file carries its own slug:

`data/en/team.yml`:
```yaml
qualifications:
  - icon: ti-link
    title: "Integrations & APIs"
    link: "/integrations/"
    capabilities: [...]
  - icon: ti-files
    title: "Document Processing"
    link: "/document-processing/"
    ...
  - icon: ti-thought
    title: "AI & Agents"
    link: "/ai-agents/"
    ...
  - icon: ti-loop
    title: "Automation & Orchestration"
    link: "/automation/"
    ...
```

`data/pt/team.yml`:
```yaml
qualifications:
  - icon: ti-link
    title: "Integrações e APIs"
    link: "/integracoes-e-apis/"
    ...
  - icon: ti-files
    title: "Processamento de Documentos"
    link: "/processamento-de-documentos/"
    ...
  - icon: ti-thought
    title: "IA & Agentes"
    link: "/agentes-de-ia/"
    ...
  - icon: ti-loop
    title: "Automação & Orquestração"
    link: "/automacao-e-orquestracao/"
    ...
```

When no `link` is present, the card renders as-is (no wrapping `<a>`).

No new top-level nav items. Discovery flows: homepage expertise cards → service page.

---

## CSS additions

Append to `themes/meghna/assets/css/custom.css`:

- `.service-landing-hero` — padded section with dot-grid background (reuses `radial-gradient` pattern from `.hero-area`), H1, description, eyebrow badge
- `.service-landing-capabilities` — grid layout for two capability-card groups, reuses `.capability-card` and `.capability-list`
- `.how-we-work` — three-card grid for challenge/approach/result
- `.capability-card-link` — removes underline, inherits color, adds hover lift (same pattern as `.service-block:hover`)
- Responsive breakpoints at 991px and 768px (following existing patterns in custom.css)

All CSS uses existing `--color-*` variables. No new design tokens.

---

## i18n strings

Append to `i18n/en.yaml`:

```yaml
- id: service_capabilities_title
  translation: "What we build"
- id: service_tech_title
  translation: "Technologies"
- id: service_how_title
  translation: "How we'd work on this"
- id: service_cta_eyebrow
  translation: "Start with a 30-min call"
```

Append to `i18n/pt.yaml`:

```yaml
- id: service_capabilities_title
  translation: "O que entregamos"
- id: service_tech_title
  translation: "Tecnologias"
- id: service_how_title
  translation: "Como conduzimos"
- id: service_cta_eyebrow
  translation: "Comece com uma call de 30 min"
```

---

## Schema enhancement (required)

Add a branch to `schema.html` for service pages. When `.Type == "services"`, emit `Service` schema instead of the generic `WebPage` fallback (current lines 210-219). Without this, service pages get `Article` schema (wrong — they're not articles).

Place this branch **before** the final generic `WebPage` fallback so service pages match it first:

```go
{{- else if eq .Type "services" }}
{{- $service := dict
  "@context" "https://schema.org"
  "@type" "Service"
  "name" .Title
  "description" (or .Description $langDesc)
  "url" .Permalink
  "provider" (dict "@type" "Organization" "name" site.Title "url" site.BaseURL)
  "areaServed" site.Params.organization.areaServed
}}
{{ printf `<script type="application/ld+json">%s</script>` ($service | jsonify) | safeHTML }}
{{- end }}
```

The insertion point is between the `author` page branch (line 129) and the `BreadcrumbList` (line 167). More precisely, add it after line 165 (closing the `else` block for regular pages) and before the `BreadcrumbList` section.

---

## Case studies — deliberately deferred

No fabricated testimonials or fake client names. The "How we'd work on this" section uses realistic scenario framing that matches the honest-tone copy already on the site. Real case studies get added once consented client metrics exist — the data schema already supports this (add a `case_study:` block alongside `how_we_work:` later).

---

## SEO coverage

| Signal | Mechanism |
|---|---|
| Keyword in URL | `url:` in front matter |
| Meta title | `{{ .Title }} \| {{ site.Title }}` via `head.html:10` |
| Meta description | `.Description` via `head.html:15` |
| hreflang alternates | `translationKey` + `.Rotate "language"` in `head.html:24-40` |
| Canonical | Auto via `head.html:22` |
| OG tags | Auto via `opengraph.html` |
| OG image | Falls back to site default (`images/full-background-logo.webp`) |
| BreadcrumbList schema | Auto via `schema.html:167-183` |
| Service schema | Required branch in `schema.html` (see Schema enhancement section) |
| Sitemap | Hugo generates automatically |

---

## Verification steps

1. `hugo server` — all 8 service URLs render correctly
2. View source: `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<link rel="alternate" hreflang>` on each page
3. Click homepage expertise card → lands on correct service page
4. Click PT/EN flag on a service page → lands on translated counterpart
5. Click "Book a free consultation" → scrolls to `#contact` on same page
6. Submit contact form on service page → POST hits `/api/contact`
7. `hugo --gc --minify` — no build warnings
8. Lighthouse SEO audit on one EN + one PT page — no "missing meta description" or "uncrawlable links" issues

---

## Key technical notes (from codebase review)

- **Data lookup pattern**: All existing templates use `{{ $data := index hugo.Data site.Language.Name }}`. `site.Language.Name` returns `"en"` / `"pt"` (same as `.Lang`). The service template must use this same pattern.
- **Template fallback risk**: `_default/single.html` renders pages with author/date metadata and Disqus comments — wrong for service pages. `services/single.html` must exist to prevent this fallback.
- **`translationKey` is required**: `.Rotate "language"` cannot pair pages with different paths across languages (e.g., `services/integrations/` vs `servicos/integracoes-e-apis/`). The `translationKey` front matter field is necessary for hreflang alternates to work.
- **URL behavior**: English is default language (no prefix), so `url: /integrations/` produces `/integrations/`. Portuguese gets `/pt/` prefix automatically, so `url: /integracoes-e-apis/` produces `/pt/integracoes-e-apis/`.
- **Contact partial works from any page**: `{{ partial "contact.html" . }}` reads from `data/{lang}/contact.yml` using language-based lookup, not page-based. It works correctly on service pages.
- **Section `_index.md` not strictly required** for individual service pages (they're leaf pages, not section lists), but included for completeness and to prevent 404s at `/services/` and `/pt/servicos/`.