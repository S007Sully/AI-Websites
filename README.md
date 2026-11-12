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

## Must verify in a GHL sandbox page before the first real preview
- JavaScript in the Custom Code element runs (menu + reveal animations). Without JS the menu stays open and content stays visible, so it degrades safely.
- Sticky header: `position: sticky` only works if its GHL section isn't a short container. If it doesn't stick, set the header as the page's native header or accept a static header.
- Fixed mobile bar isn't clipped by a GHL parent with `transform`/`overflow`.
- "Optimize JavaScript" site setting doesn't delay the script.
- Anchor `#assessment` scrolls to the form.

## Adding a section/industry
Add `sections/NN-name.html`, put CSS in the template stylesheet using `.rt-` classes, rebuild. New industry: copy `templates/roofing`, rename the CSS/JS files to `<industry>.css/.js`.
