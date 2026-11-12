# AI-Websites: local-business template library

Industry website templates, delivered through **GoHighLevel's standard Website Builder** (no GHL AI Studio, no paid generation, no backend).

## Why plain HTML/CSS/JS
GHL hosts static pages built in its own builder. It can't run Node/Next.js or upload a React build. The supported route is its **Custom Code element** (HTML/CSS/JS) plus **Settings → Custom CSS**. So each template is dependency-free HTML/CSS/JS, scoped under `.rt`/`rt-*` so it can't collide with builder CSS.

Custom-coded sections are **not** native drag-and-drop elements: Todd/ops edit them as code (or via the build config), not in the visual editor. Forms, calendars and workflows stay native GHL.

## Layout
```
templates/<industry>/template.config.json   sample per-prospect values
templates/<industry>/sections/NN-*.html     one file = one GHL Custom Code element
templates/<industry>/styles|scripts/        shared CSS + JS
prospects/<slug>.json                       per-prospect overrides (verified data only)
tools/build.mjs                             builds snippets + local preview
dist/<slug>/                                output (git-ignored)
```

## Per-prospect workflow
1. `cp prospects/example.json prospects/<slug>.json`; fill **verified** details only (name, phone, city, trust points). Never include unverified licenses, years in business, reviews or guarantees.
2. `node tools/build.mjs roofing --config prospects/<slug>.json`
3. QA locally: open `dist/<slug>/preview.html` (local file only, **not** shareable).
4. In GHL: duplicate the roofing site/funnel → paste snippets (see below) → add the native GHL form → publish to a preview domain/URL.

## Pasting into GHL (`dist/<slug>/ghl/`)
| File | Where it goes |
|---|---|
| `00-global.css` | Site/page **Settings → Custom CSS** (or `00-global-styles.html` in a top Custom Code element) |
| `01-header.html` | Custom Code element, top of page |
| `02-hero.html` … `07-faq.html` | One Custom Code element each, in order (`05-reviews.html` exists only when reviews are supplied) |
| `08-form.html` | Custom Code element holding the form. Its section carries `id="assessment"`, the target of every CTA |
| `09-footer.html` | Custom Code element (includes LocalBusiness JSON-LD; FAQ section includes FAQPage JSON-LD) |
| `99-mobile-bar.html` | Custom Code element at the bottom of the page |
| `zz-script.html` | Custom Code element at the bottom (menu + reveal animations only; FAQ is native `<details>`) |

## Per-prospect config (`prospects/<slug>.json`)
Required for a shareable preview: `business_name`, `business_short`, `city`, `service_area`, `phone_display`, `phone_tel`, `trust_points`, `form_embed_html`, `privacy_url`.
Optional: `email`, `address`, `hours`, `license_line`, `credentials[]`, `why_us[]`, `faqs[]`, `reviews[]`, `rating_summary`, `hero_image_url`.

- **Reviews** are omitted (section + nav + footer link) unless `reviews[]` has real, permissioned reviews. Never paste invented ones. No review schema is emitted.
- **Form**: in GHL open the form → *Integrate* → copy the embed code into `form_embed_html` (or swap the card contents for a native Form element). Without it the section shows a call-only fallback, **not** a fake form.
- `credentials` / `license_line` render only when provided. Verify before adding.
- The build prints warnings for anything missing. `prospects/_qa-fixture.json` holds clearly-labeled SAMPLE content for layout QA only.

## Sandbox test (fastest way to de-risk GHL)
`sandbox/roofing-sandbox-test.html` is the whole roofing page (CSS + all sections + script + a diagnostics panel) in **one** file. Regenerate for any template with `node tools/build.mjs <template>` → `dist/<slug>/sandbox-test.html`.
1. In a throwaway GHL page add **one** Custom Code element and paste the whole file.
2. Open the published/preview URL on a phone. Tap the **Sandbox checks** pill (bottom-left). It reports JS running, menu, sticky header, pinned mobile bar, overflow, and names any GHL parent element (`overflow` / `transform`) that is blocking sticky or fixed positioning.
3. Scroll down half a page so the sticky-header check can run. Repeat at desktop width.
4. Delete the element when done. **Never publish the diagnostics block to a client site.**

Caveat: the all-in-one file puts the header in a tall wrapper, so sticky works there even if it would not in the real split layout (one Custom Code element per section: a header in its own short element has nothing to stick within). To test the split case, paste only `01-header.html` into its own element above a tall element and re-check.

## Must verify in a GHL sandbox page before the first real preview
- JavaScript in the Custom Code element runs (menu + reveal animations). Without JS the menu stays open and content stays visible, so it degrades safely.
- Sticky header: `position: sticky` only works if its GHL section isn't a short container. If it doesn't stick, set the header as the page's native header or accept a static header.
- Fixed mobile bar isn't clipped by a GHL parent with `transform`/`overflow`.
- "Optimize JavaScript" site setting doesn't delay the script.
- Anchor `#assessment` scrolls to the form.

## Templates
| Template | Build | Notes |
|---|---|---|
| `roofing` | `node tools/build.mjs roofing --config prospects/<slug>.json` | Charcoal / warm white / copper |
| `hvac` | `node tools/build.mjs hvac --config prospects/<slug>.json` | Navy / ice / heat-orange, `hv-` prefix. Optional `emergency_line` adds a top bar. Only set it with wording and availability the client has confirmed (don't claim 24/7 unless true). Add `00-topbar.html` as the first Custom Code element when present |
| `plumbing` | `node tools/build.mjs plumbing --config prospects/<slug>.json` | Deep teal / aqua with amber CTAs, `pl-` prefix, schema type `Plumber`. Same optional `emergency_line` top bar as HVAC (only with client-confirmed wording; never claim 24/7 unless true). The FAQ includes generic leak/gas safety guidance: have the client review it. Plumbing licensing varies by state: add to `credentials[]` only after verifying |

Per-template settings live in its `template.config.json`: `css_prefix`, `schema_type` (schema.org type), `preview_bg`. Hero art is `templates/<t>/hero-visual.html` (replaced by `hero_image_url` when set). HVAC licensing/certification (state license, EPA 608, insurance) varies by state: add to `credentials[]` only after verifying.

## Adding a section/industry
Add `sections/NN-name.html`, put CSS in the template stylesheet using `.rt-` classes, rebuild. New industry: copy `templates/hvac`, rename CSS/JS to `<industry>.css/.js`, pick a unique `css_prefix`, then rewrite sections, palette, icons and `hero-visual.html`.
