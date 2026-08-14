# CLAUDE.md

Project instructions for Claude Code (and other agents) working in this repo.

## Project snapshot

`shadahm.github.io` is Shad Ahmad's personal resume site: an Angular 18 app (NgModule-based,
not standalone) built with Vite via `@analogjs/vite-plugin-angular`, styled with **Tailwind CSS**,
and deployed as a static site to GitHub Pages via `angular-cli-ghpages`. Page content — resume
summary, employment history, skills, projects — is data-driven from JSON files in
`src/public/assets/data/`.

```bash
npm run dev      # dev server on :4200
npm run build    # production build to dist/shadahmio
npm test         # vitest
npm run lint     # eslint
```

Note: `npm run lint` currently reports pre-existing errors in `src/polyfills.ts` and the
`catch (e)` in `src/app/app.module.ts`. Those predate the rebrand — don't treat them as
something you broke, but don't add to them either.

## Design tone — professional resume, not a marketing site

This site's audience is recruiters and hiring managers evaluating a candidate — **it is a
resume, not a product landing page.** Do not design or code it like one:

- No marketing-site patterns: large sales-style hero banners, aggressive scroll animations,
  parallax, autoplay carousels, scroll-jacking, oversized "buy now"-style CTAs, or
  gradient-heavy hero sections (the "selling MacBooks" look).
- Favor a **restrained, content-first, readable** layout: clear section hierarchy, generous
  whitespace, predictable navigation.
- Motion should be minimal and purposeful — hover/focus states and the loading skeleton in
  `project-card` are fine; entrance animations and attention-grabbing effects are not.
- Use the palette below for clarity and structure (section accents, links, headings), not for
  visual spectacle. When in doubt, choose the plainer option.

## Data-driven content — must be preserved

Content lives in JSON under `src/public/assets/data/`, not in templates, so the resume can be
updated by editing JSON without touching code. **This must not regress.**

- Any redesigned component must keep reading from the JSON data sources via `ResumeService` /
  `ProjectsService` — never hardcode employment history, skills, or project entries into a
  template.
- If a change requires reshaping a JSON schema, keep it simple and document the change, since
  these files are hand-edited.
- Treat "can the user still just edit a JSON file and have the site update" as a hard
  acceptance criterion for any structural change.

Known gap: the legacy `/resume` route still has its certifications, education, and "other
information" hardcoded in `resume.component.html`. That predates the rebrand. The live home
page (`/resume-po`) is fully data-driven.

## Brand

Colour and typography are adapted from the City of Stockholm graphic profile
(https://varumarkesmanual.stockholm/grafisk-profil/), used as **visual-language inspiration
only** — this is a personal site, not an official City of Stockholm property. Never use
Stockholm's logo/wordmark ("S:t Erik"), coat of arms, or the "Stockholm Type" name here; only
the colour values and typographic character were borrowed.

### Colour

Tokens live in `tailwind.config.js`. Use the token names, never raw hex, in templates.

| Token | Name | Hex | Role |
|---|---|---|---|
| `primary` | Blå | `#007FC8` | Links, buttons, active nav, accent rules |
| `secondary` | Lila | `#76368C` | Secondary accent |
| `accent` | Orange | `#E9500E` | Highlights (e.g. starred skills), logo second word |
| `brandPink` | Rosa | `#E5006C` | Supporting |
| `brandGreen` | Grön | `#009991` | Supporting |
| `brandYellow` | Gul | `#FCBF0A` | Supporting — large text only, see below |
| `ink-50…900` | — | — | Neutral ramp: backgrounds, body text, borders |

Each of `primary`/`secondary`/`accent` also has `-dark` (hover) and `-light` (tinted background)
variants.

Rules carried over from the Stockholm manual:
- **No gradients.** Flat colour only, no blending between shades.
- **Don't weld a colour to one section** of the site — colours stay reusable across the design
  rather than becoming de facto "category colours."
- **Yellow has a contrast trap:** white text on `brandYellow` must be large (headings only).
  Never use it as a body-text or small-button background.
- Grey backgrounds pair well with any profile colour for accent effects.

### Typography

Stockholm's actual typeface ("Stockholm Type") is proprietary and licensed exclusively to the
city, so it is **not used here**. Open substitutes with similar character, loaded from Google
Fonts in `src/index.html`:

- **Headings** — `Space Grotesk` (Tailwind: `font-heading`)
- **Body** — `Inter` (Tailwind: `font-sans`, the default), 15px base

Build hierarchy through size, weight, and colour — not decoration.

### Logo & marks

- `src/public/assets/images/logo.svg` — "Shad" in `primary` + "Ahm" in `accent`, Space Grotesk
  bold. Used in the header.
- `src/public/assets/images/favicon.svg` — blue rounded square, "SA" monogram, orange dot.
- `logo.png` (the old gold wordmark) is retained **only** as the Open Graph image, because
  social platforms don't accept SVG. Replacing it with a rebranded 1200×630 raster card is an
  open TODO, flagged in `src/index.html`.

### Still open

- A rebranded raster OG card (see above).
- Voice & tone guidance for copy — not covered by the Stockholm manual. Ask before inventing it.

## Styling conventions

- **Tailwind utilities in templates** are the default. Component `.scss` files are intentionally
  empty stubs; do not reintroduce per-component styling there. (Component styles bypass the
  Tailwind/PostCSS pipeline in this setup, so `@apply` will not work in them.)
- **Shared component classes** live in `@layer components` in `src/styles.scss`: `.shell`,
  `.card`, `.section-title`, `.subsection-title`, `.btn` / `.btn-primary` / `.btn-outline`,
  `.badge` / `.badge-primary` / `.badge-neutral`, `.nav-link` / `.nav-link-active`,
  `.list-bullets`, `.table-data`, `.meta`. Reach for these before writing new one-off styles.
  - Ordering matters: `.nav-link-active` must stay declared *after* `.nav-link`, since both sit
    in the same layer and source order decides which colour wins.
- **Print matters** — this is a resume with a Print button. Keep `print:` variants intact
  (`print:hidden` on nav/footer/TOC, `hidden print:block` on print-only blocks). `.card` already
  drops its border and padding on paper, and `@page` margins are set in `src/styles.scss`.
- Tailwind is wired up in `vite.config.ts` under `css.postcss` (not a `postcss.config.js`), so
  it resolves from the repo root rather than Vite's `root: 'src'`.

## Icons

Icons are **Lucide artwork (ISC licensed) vendored inline** in
`src/app/components/icon/icon.component.html`, used as
`<app-icon name="map-pin" [size]="14">`. Colour follows surrounding text via
`stroke="currentColor"`, so tint with a text colour class.

To add an icon: copy its inner SVG from lucide.dev, prefix each element with `svg:` so it lands
in the SVG namespace, add a `*ngSwitchCase` block, and extend the `IconName` union.

**Do not replace this with an icon npm package.** This app runs partially-compiled Angular
libraries through the runtime JIT compiler (hence the `@angular/compiler` fallback import in
`src/main.ts` — the Angular linker is not applied to `node_modules`). Both `@lucide/angular` and
`lucide-angular` crash under that path. The same constraint applies to any third-party Angular
*component* library: verify it renders before committing to it.

## Rule for future agents

When creating or editing any page or component:

1. Use the colour and typography tokens above — never introduce hex values or fonts outside the
   palette, and never hardcode a colour a token already covers.
2. Keep it resume-appropriate and restrained (see Design tone). Plain beats flashy.
3. Never hardcode resume content into a template — it comes from JSON (see Data-driven content).
4. Prefer the shared component classes in `src/styles.scss` over new bespoke CSS.
5. Don't use Stockholm's own logo, coat of arms, or "Stockholm Type"/"S:t Erik" naming.
6. Ask before inventing voice/tone or a new OG card design — those are still open.
