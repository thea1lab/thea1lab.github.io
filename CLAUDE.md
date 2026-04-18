# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A1 Lab marketing website (www.a1lab.com.br) — a bilingual (Portuguese default, English) static site built with **Hugo** and the **Meghna** theme. Hosted on GitHub Pages.

## Commands

```bash
# Local development with live reload
hugo server

# Production build (includes drafts)
hugo -D

# Production build with minification
hugo --gc --minify

# Deploy to GitHub Pages (builds, commits, pushes master + gh-pages subtree)
./scripts/deploy-gh-pages.sh
```

There are no tests, linting, or CI/CD pipelines. No package.json or Node.js tooling.

## Architecture

### Content Model

The homepage is a single page assembled from ~14 section partials (`themes/meghna/layouts/partials/`). Each section reads its content from YAML data files:

- **`data/pt/`** and **`data/en/`** — Section data (banner, about, team, service, contact, etc.)
- **`content/portuguese/`** and **`content/english/`** — Blog posts and author pages (Markdown)
- **`i18n/pt.yaml`** and **`i18n/en.yaml`** — UI translation strings

All templates select the correct language data via:
```go
{{ $data := index site.Data site.Language.Lang }}
```

### Key Directories

- `config.toml` — Site config, navigation menus, plugin declarations, social links, language settings
- `themes/meghna/layouts/` — All HTML templates (vendored, not a submodule — edit directly)
- `themes/meghna/assets/css/` — `style.css` and `custom.css`
- `themes/meghna/assets/js/` — `script.js`
- `themes/meghna/static/plugins/` — Pre-bundled vendor JS/CSS (Bootstrap 4, jQuery, Slick, Shuffle, etc.)
- `static/images/` — Site images; provide both `.jpg` and `.webp` variants

### Deployment

The `public/` directory (Hugo output) is committed to `master` and pushed as a subtree to the `gh-pages` branch. The deploy script handles the full flow: build → commit → push → subtree push.

### Conventions

- Portuguese is the default language (weight=1); English is secondary (weight=2)
- Images should have both JPG and WebP formats; templates use `<picture>` elements
- Blog posts use front matter fields: `title`, `date`, `image`, `author`, `description`, `categories`, `tags`
