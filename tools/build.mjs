#!/usr/bin/env node
// Usage: node tools/build.mjs <template> [--config path/to/prospect.json] [--out dist/<name>]
// Zero dependencies. Produces GHL-pasteable snippets + a single-file local preview.
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const template = args[0];
if (!template) { console.error("Usage: node tools/build.mjs <template> [--config file] [--out dir]"); process.exit(1); }
const opt = (k) => { const i = args.indexOf(k); return i > -1 ? args[i + 1] : undefined; };
const root = path.resolve(import.meta.dirname, "..");
const tdir = path.join(root, "templates", template);
const read = (p) => fs.readFileSync(p, "utf8");

const base = JSON.parse(read(path.join(tdir, "template.config.json")));
const over = opt("--config") ? JSON.parse(read(path.resolve(opt("--config")))) : {};
const cfg = { ...base, ...over };
const out = path.resolve(opt("--out") || path.join(root, "dist", over.slug || template));

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const check = `<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="m4 10.5 4 4 8-9" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const heroVisual = cfg.hero_image_url
  ? `      <img src="${esc(cfg.hero_image_url)}" alt="${esc(cfg.hero_image_alt)}" width="1200" height="900" fetchpriority="high">`
  : `      <svg viewBox="0 0 800 600" role="img" aria-label="Illustration of a residential roofline at sunset" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="rt-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b3430"/><stop offset=".6" stop-color="#7a4a2a"/><stop offset="1" stop-color="#d08a4a"/></linearGradient>
          <linearGradient id="rt-roof" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4541"/><stop offset="1" stop-color="#262321"/></linearGradient>
          <pattern id="rt-shingle" width="40" height="22" patternUnits="userSpaceOnUse"><path d="M0 21.5h40M20 0v11M0 11h40M0 11V0M40 11V0" stroke="#fff" stroke-opacity=".07" fill="none"/></pattern>
        </defs>
        <rect width="800" height="600" fill="url(#rt-sky)"/>
        <circle cx="610" cy="210" r="70" fill="#f6d9b0" opacity=".9"/>
        <circle cx="610" cy="210" r="110" fill="#f6d9b0" opacity=".16"/>
        <path d="M-20 600V430l260-190 260 190V600Z" fill="#1f1c1a" opacity=".55"/>
        <path d="M120 600V380L430 150l370 270V600Z" fill="url(#rt-roof)"/>
        <path d="M120 600V380L430 150l370 270V600Z" fill="url(#rt-shingle)"/>
        <path d="M110 392 430 138l380 282" fill="none" stroke="#d08a4a" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="560" y="210" width="54" height="110" fill="#2e2a27"/><rect x="552" y="200" width="70" height="14" fill="#d08a4a"/>
        <rect x="300" y="330" width="120" height="86" rx="6" fill="#2e2a27" stroke="#d08a4a" stroke-width="5"/>
        <path d="M360 330v86M300 373h120" stroke="#d08a4a" stroke-width="3" opacity=".7"/>
      </svg>`;

const warnings = [];
const ldJson = (o) => `  <script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`;
const stars = (n) => `<span class="rt-stars" role="img" aria-label="${esc(n)} out of 5 stars">${"&#9733;".repeat(Math.max(0, Math.min(5, Math.round(+n))))}</span>`;

const faqs = cfg.faqs.map((f) => ({ q: f.q, a: f.a.replace(/\{\{(\w+)\}\}/g, (m, k) => cfg[k] ?? m) }));
const rs = cfg.rating_summary;
const formBlock = cfg.form_embed_html
  ? `      ${cfg.form_embed_html}`
  : `      <div class="rt-form__fallback" role="note"><p><strong>Online request form not connected yet.</strong></p><p>Call <a class="rt-link" href="tel:${esc(cfg.phone_tel)}">${esc(cfg.phone_display)}</a> to request your assessment.</p></div>`;
if (!cfg.form_embed_html) warnings.push("form_embed_html is empty: the form section shows a call-only fallback. Paste the GHL form embed code before sharing.");
if (!cfg.reviews.length) warnings.push("reviews is empty: the Reviews section (and its nav links) were left out. Add only real, permissioned reviews.");
if (!cfg.privacy_url) warnings.push("privacy_url is empty: add a privacy policy link before collecting leads.");

const legal = [cfg.privacy_url && `<a href="${esc(cfg.privacy_url)}">Privacy Policy</a>`, cfg.terms_url && `<a href="${esc(cfg.terms_url)}">Terms</a>`].filter(Boolean).join(" &middot; ");

const values = {
  ...cfg,
  year: new Date().getFullYear(),
  legal_links: legal,
  check_icon: check,
  trust_list: cfg.trust_points.map((t) => `        <li>${check}<span>${esc(t)}</span></li>`).join("\n"),
  hero_visual: heroVisual,
  why_list: cfg.why_us.map((w) => `      <li class="rt-why__item rt-reveal"><span class="rt-why__tick">${check}</span><div><h3>${esc(w.title)}</h3><p>${esc(w.text)}</p></div></li>`).join("\n"),
  creds_list: cfg.credentials.map((c) => `      <li>${check}<span>${esc(c)}</span></li>`).join("\n"),
  rating_summary_html: rs ? `      <p class="rt-rating">${stars(rs.rating)} <strong>${esc(rs.rating)}</strong> average from ${esc(rs.count)} reviews on ${esc(rs.source)}</p>` : "",
  reviews_list: cfg.reviews.map((r) => `      <li class="rt-review rt-reveal"><figure>${r.rating ? stars(r.rating) : ""}<blockquote><p>&ldquo;${esc(r.text)}&rdquo;</p></blockquote><figcaption><strong>${esc(r.name)}</strong>${r.detail ? `<span>${esc(r.detail)}</span>` : ""}</figcaption></figure></li>`).join("\n"),
  faq_list: faqs.map((f) => `      <details class="rt-faq__item"><summary>${esc(f.q)}</summary><div class="rt-faq__a"><p>${esc(f.a)}</p></div></details>`).join("\n"),
  faq_jsonld: ldJson({ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) }),
  localbusiness_jsonld: ldJson({ "@context": "https://schema.org", "@type": "RoofingContractor", name: cfg.business_name, telephone: cfg.phone_tel, areaServed: cfg.service_area, ...(cfg.email ? { email: cfg.email } : {}) }),
  form_block: formBlock,
};
// Text fields are escaped; generated markup keys are passed through.
const rawKeys = new Set(["trust_list", "hero_visual", "cta_href", "why_list", "creds_list", "rating_summary_html", "reviews_list", "faq_list", "faq_jsonld", "localbusiness_jsonld", "form_block", "legal_links", "check_icon"]);
const truthy = (v) => (Array.isArray(v) ? v.length > 0 : !!v);
const fill = (s) => s
  .replace(/^[ \t]*\{\{#if (\w+)\}\}\n([\s\S]*?)^[ \t]*\{\{\/if\}\}\n?/gm, (m, k, body) => (truthy(values[k]) ? body : ""))
  .replace(/\{\{(\w+)\}\}/g, (m, k) => {
    if (!(k in values)) { throw new Error(`Unresolved placeholder ${m}`); }
    return rawKeys.has(k) ? values[k] : esc(values[k]);
  });

const secDir = path.join(tdir, "sections");
const files = fs.readdirSync(secDir).filter((f) => f.endsWith(".html")).sort();
const sections = files.flatMap((f) => {
  const src = read(path.join(secDir, f));
  const req = src.match(/^<!--requires:(\w+)-->\n/);
  if (req && !truthy(values[req[1]])) return [];
  return [{ name: f, html: fill(src.replace(/^<!--requires:\w+-->\n/, "")) }];
});
const css = read(path.join(tdir, "styles", `${template}.css`));
const js = read(path.join(tdir, "scripts", `${template}.js`));

fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(path.join(out, "ghl"), { recursive: true });

// --- GHL snippets (one Custom Code element each) ---
fs.writeFileSync(path.join(out, "ghl", "00-global.css"), css);
fs.writeFileSync(path.join(out, "ghl", "00-global-styles.html"), `<style>\n${css}\n</style>\n`);
for (const s of sections) fs.writeFileSync(path.join(out, "ghl", s.name), s.html);
fs.writeFileSync(path.join(out, "ghl", "zz-script.html"), `<script>\n${js}\n</script>\n`);

// --- Single-file preview (local QA only; not the GHL deliverable) ---
const preview = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(cfg.business_name)} | Roofing in ${esc(cfg.city)} (PREVIEW)</title>
<meta name="robots" content="noindex,nofollow">
<style>html{scroll-behavior:smooth;scroll-padding-top:76px}body{margin:0;background:#faf7f2}@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}</style>
<style>\n${css}\n</style></head>
<body>
${sections.filter((s) => !s.name.startsWith("99-")).map((s) => s.html).join("\n")}
${sections.filter((s) => s.name.startsWith("99-")).map((s) => s.html).join("\n")}
<script>\n${js}\n</script>
</body></html>
`;
fs.writeFileSync(path.join(out, "preview.html"), preview);
warnings.forEach((w) => console.warn("WARNING: " + w));
console.log(`Built ${template} -> ${path.relative(root, out)} (${sections.length} sections)`);
