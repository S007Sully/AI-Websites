#!/usr/bin/env node
// Usage: node tools/ai-builder-prompt.mjs <template>  -> prompts/ghl-ai-builder-<template>.md
// Builds a fully-filled prompt (no placeholders) for GHL's AI builder from a template's own copy.
import fs from "node:fs"; import path from "node:path";
const t = process.argv[2]; if (!t) { console.error("Usage: node tools/ai-builder-prompt.mjs <template>"); process.exit(1); }
const root = path.resolve(import.meta.dirname, ".."), td = path.join(root, "templates", t);
const cfg = JSON.parse(fs.readFileSync(path.join(td, "template.config.json"), "utf8"));
const sec = (n) => fs.readFileSync(path.join(td, "sections", n), "utf8");
const ent = { "&amp;": "&", "&rsquo;": "’", "&lsquo;": "‘", "&ldquo;": "“", "&rdquo;": "”", "&mdash;": "-", "&middot;": "-" };
const clean = (s) => s.replace(/<[^>]+>/g, "").replace(/&\w+;/g, (m) => ent[m] ?? m).replace(/\s+/g, " ").trim();
const demoCity = (s) => s.replace(/Your City/g, "Springfield");
const fill = (s) => demoCity(s.replace(/\{\{(\w+)\}\}/g, (m, k) => (typeof cfg[k] === "string" ? cfg[k] : m)));
const pairs = (html) => [...html.matchAll(/<h3>(.*?)<\/h3>\s*<p>(.*?)<\/p>/gs)].map((m) => [clean(m[1]), clean(m[2])]);
const h2 = (html) => clean(html.match(/<h2[^>]*>(.*?)<\/h2>/s)[1]);
const lead = (html) => clean((html.match(/class="\w+-section-head__lead">(.*?)<\/p>/s) || [])[1] || "");
const palettes = {
  roofing: { colors: "Charcoal #232120 (header, hero, process and footer sections), warm white #FAF7F2 (light sections), tan #F1EBE2 (alternate light sections), copper #9A5A22 (buttons with white text, links and icons on light), bright copper #D08A4A (accents on dark).", fonts: "Headings: Georgia/serif bold. Body: Inter or system sans-serif." },
  hvac: { colors: "Navy #0F2A3D (header, hero, process and footer sections), ice #F4F8FB (light sections), pale blue #E5EEF5 (alternate light sections), orange #B43C0A (buttons with white text, links and icons on light), bright orange #FF8A4C (accents on dark), light blue #7CC4EC (small cool accents).", fonts: "Headings and body: Inter, headings extra bold." },
  plumbing: { colors: "Deep teal #0A3A40 (header, hero, process and footer sections), mist #F2FAF9 (light sections), pale teal #E0F2F0 (alternate light sections), amber #F5B301 (buttons with dark text #10242A), teal #0F766E (links and icons on light), aqua #5EEAD4 (accents on dark).", fonts: "Headings and body: Inter, headings extra bold." },
};
const P = palettes[t]; if (!P) throw new Error("No palette for " + t);
const svc = pairs(sec("03-services.html")), steps = pairs(sec("06-process.html"));
const hero = sec("02-hero.html");
const heroH1 = clean(hero.match(/<h1[^>]*>(.*?)<\/h1>/s)[1]);
const heroLead = fill(clean(hero.match(/class="\w+-hero__lead[^"]*">(.*?)<\/p>/s)[1]));
const eyebrow = fill(clean(hero.match(/class="\w+-eyebrow[^"]*">(.*?)<\/p>/s)[1]));
const industry = { roofing: "roofing", hvac: "HVAC (heating and cooling)", plumbing: "plumbing" }[t];
const L = (a) => a.map((x, i) => `${i + 1}. ${x}`).join("\n");
const out = demoCity(`# GHL AI builder prompt: ${t} demo template

Paste everything below the line into the GHL AI website builder's own prompt box (not into the Claude sidebar).

---

Build a complete, mobile-first local-service website for a ${industry} company. Use native GHL sections, rows and elements. Use a native GHL Form element for the request form.

This is a reusable DEMO TEMPLATE. The business name, phone number and city below are demo values that will be replaced later for each client. Use them exactly as written. Do not ask for more details and do not leave brackets.

BUSINESS (demo values)
- Name: ${cfg.business_name}
- City / service area: ${cfg.city === "Your City" ? "Springfield" : cfg.city} / ${cfg.service_area.replace("Your City", "Springfield")}
- Phone (display / tel link): ${cfg.phone_display} / ${cfg.phone_tel}
- Primary button label (use exactly on every main button): "${cfg.cta_label}"

DESIGN
- Colors: ${P.colors}
- Fonts: ${P.fonts}
- Mobile-first. Generous spacing, rounded cards (14px radius), subtle shadows, alternating dark and light sections.
- Body text 16px minimum, line height 1.6. Buttons are pill shaped, 48px minimum height, WCAG AA contrast.
- Imagery: relevant to ${industry}. Use a tasteful illustration or generic placeholder image in the hero. No fake logos, no fake photos of people.
- Animation: only gentle fade and slide-in on scroll. Respect reduced-motion.

PAGE SECTIONS, in this order. Use this exact copy.

1. HEADER (sticky): business name as logo text, nav links (Services, Why Us, FAQ), click-to-call phone "${cfg.phone_display}", primary button "${cfg.cta_label}". Hamburger menu on mobile.

2. HERO
- Eyebrow: ${eyebrow}
- Headline (H1): ${heroH1}
- Paragraph: ${heroLead}
- Buttons: "${cfg.cta_label}" and "Call ${cfg.phone_display}" (tel link)
- Three trust points with check icons:
${cfg.trust_points.map((x) => `  - ${x}`).join("\n")}
- Hero image or illustration on the right (stacked below on mobile).

3. SERVICES
- Heading: ${h2(sec("03-services.html"))}
- Intro: ${lead(sec("03-services.html"))}
- Six cards, each with a simple line icon, title, one sentence, and a link reading "${t === "roofing" ? "Request an assessment" : "Request service"}" to the form:
${L(svc.map(([h, p]) => `${h}: ${p}`))}

4. WHY US
- Heading: ${h2(sec("04-why-us.html")).replace("{{business_short}}", cfg.business_short)}
- Four points with check icons:
${L(cfg.why_us.map((w) => `${w.title}: ${w.text}`))}

5. HOW IT WORKS (dark section)
- Heading: ${h2(sec("06-process.html"))}
- Four numbered steps:
${L(steps.map(([h, p]) => `${h}: ${p}`))}
- Primary button "${cfg.cta_label}" below the steps.

6. FAQ (accordion, native expand/collapse)
- Heading: ${h2(sec("07-faq.html"))}
${L(cfg.faqs.map((f) => `Q: ${f.q}\n   A: ${fill(f.a)}`))}

7. REQUEST FORM (anchor ID "assessment")
- Heading: ${cfg.form_heading}
- Intro: ${cfg.form_intro}
- Three short bullets: Takes about a minute / We reply to confirm a time that works for you / Prefer to talk? Call ${cfg.phone_display}
- Native GHL form fields: full name, phone, email, address or city, service needed (dropdown matching the six services), short message, consent checkbox.
- Every button and CTA on the page scrolls to this section.

8. FOOTER (dark): business name, one-line blurb, Explore links (Services, Why Us, How it works, FAQ), phone, "${cfg.cta_label}" link, copyright line, and a Privacy Policy link pointing to "#".

9. MOBILE CONTACT BAR: fixed to the bottom on screens under 768px with a "Call" button (tel link) and the "${cfg.cta_label}" button. Add bottom padding to the page so it never covers content.

DO NOT
- Do NOT add a Reviews or Testimonials section, star ratings, review counts or customer quotes.
- Do NOT add license numbers, insurance badges, "licensed and insured", years in business, awards, guarantees, prices, "free" offers, or "24/7" or "emergency" claims.
- Do NOT publish. Leave the site as a draft.

REQUIREMENTS
- Click-to-call links for every phone number. Keyboard-accessible controls with visible focus states.
- One H1, logical heading order, alt text on every image.
- No horizontal scrolling at 390px wide.
`);
fs.mkdirSync(path.join(root, "prompts"), { recursive: true });
const f = path.join(root, "prompts", `ghl-ai-builder-${t}.md`); fs.writeFileSync(f, out);
const left = out.match(/\[[A-Z][^\]]*\]|\{\{\w+\}\}/g); if (left) { console.error("Leftover placeholders:", left); process.exit(1); }
console.log("wrote " + path.relative(root, f) + " (" + out.length + " chars)");
