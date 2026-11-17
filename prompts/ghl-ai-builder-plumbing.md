# GHL AI builder prompt: plumbing demo template

Paste everything below the line into the GHL AI website builder's own prompt box (not into the Claude sidebar).

---

Build a complete, mobile-first local-service website for a plumbing company. Use native GHL sections, rows and elements. Use a native GHL Form element for the request form.

This is a reusable DEMO TEMPLATE. The business name, phone number and city below are demo values that will be replaced later for each client. Use them exactly as written. Do not ask for more details and do not leave brackets.

BUSINESS (demo values)
- Name: Clearwater Plumbing
- City / service area: Springfield / Springfield and surrounding areas
- Phone (display / tel link): (555) 010-0199 / +15550100199
- Primary button label (use exactly on every main button): "Request Plumbing Service"

DESIGN
- Colors: Deep teal #0A3A40 (header, hero, process and footer sections), mist #F2FAF9 (light sections), pale teal #E0F2F0 (alternate light sections), amber #F5B301 (buttons with dark text #10242A), teal #0F766E (links and icons on light), aqua #5EEAD4 (accents on dark).
- Fonts: Headings and body: Inter, headings extra bold.
- Mobile-first. Generous spacing, rounded cards (14px radius), subtle shadows, alternating dark and light sections.
- Body text 16px minimum, line height 1.6. Buttons are pill shaped, 48px minimum height, WCAG AA contrast.
- Imagery: relevant to plumbing. Use a tasteful illustration or generic placeholder image in the hero. No fake logos, no fake photos of people.
- Animation: only gentle fade and slide-in on scroll. Respect reduced-motion.

PAGE SECTIONS, in this order. Use this exact copy.

1. HEADER (sticky): business name as logo text, nav links (Services, Why Us, FAQ), click-to-call phone "(555) 010-0199", primary button "Request Plumbing Service". Hamburger menu on mobile.

2. HERO
- Eyebrow: Plumbing in Springfield
- Headline (H1): Plumbing done right, explained clearly.
- Paragraph: Clearwater Plumbing handles leaks, clogs, water heaters and repairs for homeowners across Springfield and surrounding areas. Request service and get a clear diagnosis and straight answers.
- Buttons: "Request Plumbing Service" and "Call (555) 010-0199" (tel link)
- Three trust points with check icons:
  - Written quotes before work starts
  - Clear explanations, no pressure
  - Clean, careful in-home work
- Hero image or illustration on the right (stacked below on mobile).

3. SERVICES
- Heading: Leaks, drains and heaters, handled.
- Intro: From a dripping faucet to a main-line problem, every visit starts with a clear diagnosis so you know your options.
- Six cards, each with a simple line icon, title, one sentence, and a link reading "Request service" to the form:
1. Leak Detection & Repair: Find the source of leaks and fix them before they cause water damage.
2. Drain Cleaning & Clogs: Clear slow or blocked drains, and find out why they keep backing up.
3. Water Heaters: Repair or replace tank and tankless water heaters, with your options explained.
4. Faucets, Toilets & Disposals: Fix running toilets, leaky faucets and jammed disposals, or install new fixtures.
5. Pipe Repair & Repiping: Repair damaged pipes or replace aging lines to restore reliable water flow.
6. Sewer Line Service: Camera inspections and repairs to find and fix problems in the main line.

4. WHY US
- Heading: A simpler, more honest plumbing experience.
- Four points with check icons:
1. Clear diagnosis: We find the cause and explain it in plain English before recommending anything.
2. Upfront, written quotes: Scope, parts and pricing in writing before any work begins.
3. Honest repair or replace advice: You see your options, including when a simple repair is the smarter choice.
4. Respect for your home: Drop cloths, tidy work and cleanup from the moment we arrive to the moment we leave.

5. HOW IT WORKS (dark section)
- Heading: From first call to a fixed problem.
- Four numbered steps:
1. Request service: Tell us what’s going on and when you’re available. We’ll reach out to confirm a time.
2. We diagnose the problem: A plumber checks the issue, finds the cause, and explains it in plain English.
3. You review options and pricing: Repair or replace: you see your choices and a written quote before work begins.
4. We fix it and test: The work is completed, we check for leaks and proper flow, and clean up before we go.
- Primary button "Request Plumbing Service" below the steps.

6. FAQ (accordion, native expand/collapse)
- Heading: Questions homeowners ask.
1. Q: What should I do if I find a leak?
   A: If it is safe to do so, shut off the water at the fixture or the main valve, then call a plumber. If water is near electrical equipment, or you smell gas, leave the area and call emergency services or your utility.
2. Q: Why does my drain keep clogging?
   A: Repeated clogs can point to buildup, tree roots or damage in the line. A plumber can identify the cause instead of clearing it only temporarily.
3. Q: Should I repair or replace my water heater?
   A: Age, condition, repair history and your household's hot water needs all matter. We explain the options so you can choose with confidence.
4. Q: How does pricing work?
   A: You receive a written quote before work starts. The final scope depends on what is found, and any change is discussed with you first.
5. Q: What is a sewer camera inspection?
   A: A camera inspection lets a technician see inside the line to find blockages or damage before recommending repairs.
6. Q: What areas do you serve?
   A: We serve Springfield and surrounding areas. Not sure if you're in range? Call or send a request and we'll confirm.

7. REQUEST FORM (anchor ID "assessment")
- Heading: Request plumbing service
- Intro: Tell us what's going on and the best way to reach you. We'll follow up to confirm a time.
- Three short bullets: Takes about a minute / We reply to confirm a time that works for you / Prefer to talk? Call (555) 010-0199
- Native GHL form fields: full name, phone, email, address or city, service needed (dropdown matching the six services), short message, consent checkbox.
- Every button and CTA on the page scrolls to this section.

8. FOOTER (dark): business name, one-line blurb, Explore links (Services, Why Us, How it works, FAQ), phone, "Request Plumbing Service" link, copyright line, and a Privacy Policy link pointing to "#".

9. MOBILE CONTACT BAR: fixed to the bottom on screens under 768px with a "Call" button (tel link) and the "Request Plumbing Service" button. Add bottom padding to the page so it never covers content.

DO NOT
- Do NOT add a Reviews or Testimonials section, star ratings, review counts or customer quotes.
- Do NOT add license numbers, insurance badges, "licensed and insured", years in business, awards, guarantees, prices, "free" offers, or "24/7" or "emergency" claims.
- Do NOT publish. Leave the site as a draft.

REQUIREMENTS
- Click-to-call links for every phone number. Keyboard-accessible controls with visible focus states.
- One H1, logical heading order, alt text on every image.
- No horizontal scrolling at 390px wide.
