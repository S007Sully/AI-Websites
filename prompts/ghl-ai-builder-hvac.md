# GHL AI builder prompt: hvac demo template

Paste everything below the line into the GHL AI website builder's own prompt box (not into the Claude sidebar).

---

Build a complete, mobile-first local-service website for a HVAC (heating and cooling) company. Use native GHL sections, rows and elements. Use a native GHL Form element for the request form.

This is a reusable DEMO TEMPLATE. The business name, phone number and city below are demo values that will be replaced later for each client. Use them exactly as written. Do not ask for more details and do not leave brackets.

BUSINESS (demo values)
- Name: Evergreen Heating & Air
- City / service area: Springfield / Springfield and surrounding areas
- Phone (display / tel link): (555) 010-0199 / +15550100199
- Primary button label (use exactly on every main button): "Request HVAC Service"

DESIGN
- Colors: Navy #0F2A3D (header, hero, process and footer sections), ice #F4F8FB (light sections), pale blue #E5EEF5 (alternate light sections), orange #B43C0A (buttons with white text, links and icons on light), bright orange #FF8A4C (accents on dark), light blue #7CC4EC (small cool accents).
- Fonts: Headings and body: Inter, headings extra bold.
- Mobile-first. Generous spacing, rounded cards (14px radius), subtle shadows, alternating dark and light sections.
- Body text 16px minimum, line height 1.6. Buttons are pill shaped, 48px minimum height, WCAG AA contrast.
- Imagery: relevant to HVAC (heating and cooling). Use a tasteful illustration or generic placeholder image in the hero. No fake logos, no fake photos of people.
- Animation: only gentle fade and slide-in on scroll. Respect reduced-motion.

PAGE SECTIONS, in this order. Use this exact copy.

1. HEADER (sticky): business name as logo text, nav links (Services, Why Us, FAQ), click-to-call phone "(555) 010-0199", primary button "Request HVAC Service". Hamburger menu on mobile.

2. HERO
- Eyebrow: HVAC in Springfield
- Headline (H1): Comfort that works every season.
- Paragraph: Evergreen Heating & Air repairs, replaces and maintains heating and cooling systems for homeowners across Springfield and surrounding areas. Request service and get a clear diagnosis and a straight answer.
- Buttons: "Request HVAC Service" and "Call (555) 010-0199" (tel link)
- Three trust points with check icons:
  - Written quotes before work starts
  - Plain-English diagnosis, no pressure
  - Careful, clean in-home service
- Hero image or illustration on the right (stacked below on mobile).

3. SERVICES
- Heading: Heating, cooling and air quality, handled.
- Intro: Whether your system is struggling today or you’re planning ahead, every visit starts with a clear diagnosis so you know your options.
- Six cards, each with a simple line icon, title, one sentence, and a link reading "Request service" to the form:
1. Cooling & AC Repair: Warm air, strange noises or a system that won’t keep up? We find the cause and fix it.
2. Heating & Furnace Repair: Restore reliable heat with a proper diagnosis, not guesswork.
3. System Replacement & Installation: Right-sized equipment, installed properly, with your options explained up front.
4. Seasonal Maintenance: Tune-ups that catch small problems early and keep your system running efficiently.
5. Indoor Air Quality: Filtration, humidity and ventilation solutions for a cleaner, more comfortable home.
6. Ductwork & Thermostats: Fix uneven rooms and hot or cold spots with duct repairs and smarter controls.

4. WHY US
- Heading: A simpler, more honest HVAC experience.
- Four points with check icons:
1. Clear diagnosis: We find the cause and explain it in plain English before recommending anything.
2. Upfront, written quotes: Scope, equipment and pricing in writing before any work begins.
3. Honest repair or replace advice: You see your options, including when a repair is the smarter choice.
4. Respect for your home: Careful, tidy service from the moment we arrive to the moment we leave.

5. HOW IT WORKS (dark section)
- Heading: From first call to a working system.
- Four numbered steps:
1. Request service: Tell us what’s going on and when you’re available. We’ll reach out to confirm a time.
2. We diagnose the problem: A technician checks your system, finds the cause, and explains it in plain English.
3. You review options and pricing: Repair, replace or maintain: you see your choices and a written quote before work begins.
4. We fix it and verify: The work is completed, the system is tested, and we walk you through what was done.
- Primary button "Request HVAC Service" below the steps.

6. FAQ (accordion, native expand/collapse)
- Heading: Questions homeowners ask.
1. Q: Should I repair or replace my HVAC system?
   A: It depends on the system's age, condition, repair history and efficiency. A diagnosis shows whether a repair makes sense or replacement is the better long-term value, and you get the reasoning in writing.
2. Q: How often should my system be serviced?
   A: Manufacturers commonly recommend annual maintenance, ideally before each heating and cooling season. Your technician can advise based on your specific equipment.
3. Q: Why is my AC running but not cooling?
   A: Common causes include dirty filters or coils, low refrigerant, airflow problems or thermostat issues. A technician should diagnose the cause rather than guess.
4. Q: What happens during a service visit?
   A: A technician inspects your system, diagnoses the problem, explains the findings and options, and provides a written quote for any recommended work before starting.
5. Q: Can you help me choose a new system?
   A: Yes. Proper sizing and equipment choice depend on your home and how you use it. We explain the options so you can decide with confidence.
6. Q: What areas do you serve?
   A: We serve Springfield and surrounding areas. Not sure if you're in range? Call or send a request and we'll confirm.

7. REQUEST FORM (anchor ID "assessment")
- Heading: Request HVAC service
- Intro: Tell us what's going on with your heating or cooling and the best way to reach you. We'll follow up to confirm a time.
- Three short bullets: Takes about a minute / We reply to confirm a time that works for you / Prefer to talk? Call (555) 010-0199
- Native GHL form fields: full name, phone, email, address or city, service needed (dropdown matching the six services), short message, consent checkbox.
- Every button and CTA on the page scrolls to this section.

8. FOOTER (dark): business name, one-line blurb, Explore links (Services, Why Us, How it works, FAQ), phone, "Request HVAC Service" link, copyright line, and a Privacy Policy link pointing to "#".

9. MOBILE CONTACT BAR: fixed to the bottom on screens under 768px with a "Call" button (tel link) and the "Request HVAC Service" button. Add bottom padding to the page so it never covers content.

DO NOT
- Do NOT add a Reviews or Testimonials section, star ratings, review counts or customer quotes.
- Do NOT add license numbers, insurance badges, "licensed and insured", years in business, awards, guarantees, prices, "free" offers, or "24/7" or "emergency" claims.
- Do NOT publish. Leave the site as a draft.

REQUIREMENTS
- Click-to-call links for every phone number. Keyboard-accessible controls with visible focus states.
- One H1, logical heading order, alt text on every image.
- No horizontal scrolling at 390px wide.
