# Technical Assessment: TeddyPups U.A.E. Website Clone
**Candidate Development Log, AI Prompts & Workflow Documentation**

---

## 1. Project Overview & Objectives
- **Target Reference Site**: [TeddyPups U.A.E.](https://puppy.instabizweb.com/)
- **Brand Identity**: Teddy bear and teacup puppies boutique based in Downtown Dubai, UAE.
- **Key Deliverables**:
  1. Complete, pixel-accurate responsive clone of the website.
  2. Clean, modular, and maintainable project architecture (React + Vite).
  3. All 7 core routes:
     - Home (`/`)
     - Puppies Catalog (`/puppies`)
     - Puppy Detail Page (`/puppies/:slug`)
     - Gone Home Adopted Boarding Passes (`/gone-home`)
     - Happy Families Polaroid Wall (`/happy-families`)
     - How It Works Adoption Guide (`/how-it-works`)
     - Frequently Asked Questions (`/faq`)
     - Visit & Contact Handwritten Letter (`/contact`)
  4. Full dataset with 40+ authentic puppies, real photos, breeds, specs, and reviews.
  5. Interactive features: Animated puppy runner curtain, interactive playroom doors, WhatsApp adoption chat simulator, breed/gender filters, live search, and lightbox modal.
  6. Documentation for Loom walkthrough, GitHub repository, and live deployment.

---

## 2. Exact Prompts & Development Stages

### Stage 1: Exploration & Architecture Planning
**Prompt:**
> "Analyze https://puppy.instabizweb.com/ thoroughly. Identify all sitemap URLs, pages, dynamic routes, styling systems, color variables, typography, interactive animations, and data schemas. Outline an architecture using React + Vite that will be clean, easy to understand, easy to explain on a Loom recording, and effortless to modify over time."

**Execution & Findings:**
- Discovered 49 URLs across 8 distinct page types.
- Extracted design tokens: Fraunces serif (`--font-plush`), Patrick Hand / Caveat (`--font-scrawl`), Plus Jakarta Sans, warm honey (`#fbe3b4`), cocoa (`#2a170e`), toffee (`#c2622b`), and milk cream (`#fffdf8`).
- Extracted SVG assets: scalloped hems, running puppy animation with bobbing ears and wagging tail, boarding pass tickets, and wax stamps.

### Stage 2: Data Extraction & Dataset Normalization
**Prompt:**
> "Extract all available puppies, adopted puppies, polaroid photos, and FAQ schema from the reference website into structured, clean JavaScript modules. Ensure each puppy has complete specifications: breed, gender, age, location, adult weight, microchip status, vaccination status, and personalized WhatsApp message generator."

**Execution & Files Generated:**
- `src/data/puppies.js`: 15 active available puppies with real images and health specs.
- `src/data/goneHome.js`: 27 adopted puppies with vintage flight routes (e.g., "Seoul ✈️ Dubai").
- `src/data/polaroids.js`: 64 authentic happy customer family polaroid memories.
- `src/data/faqs.js`: 9 categorized questions and answers covering health checks, showroom visits, and travel.
- `src/data/siteConfig.js`: Centralized contact numbers, showroom hours, and WhatsApp link builder.

### Stage 3: Modular Component Development
**Prompt:**
> "Develop clean, reusable React components corresponding to each distinct section of the site:
> 1. `Navbar.jsx`: Header with logo, navigation links with active paw indicator, WhatsApp CTA, and mobile drawer dialog.
> 2. `Curtain.jsx`: Opening curtain animation featuring the golden puppy runner and 'every puppy is family' scrawl with click-to-skip.
> 3. `PuppyCard.jsx`: Hand-drawn sketchbook card with SVG wash, doodle lines, badge, video indicator, and puppy meta.
> 4. `TicketCard.jsx`: Vintage perforated boarding pass ticket for adopted puppies.
> 5. `PolaroidCard.jsx`: Polaroid photo with washi tape at angles, tilt, and modal preview.
> 6. `PhoneChat.jsx`: Interactive smartphone mockup simulating the 4-step WhatsApp adoption journey.
> 7. `DoorRoom.jsx`: Interactive playroom doors that swing open to reveal puppies inside.
> 8. `Footer.jsx`: Night sky with twinkling stars, crescent moon, and woven basket with sleeping puppy."

### Stage 4: Pages & Route Assembly
**Prompt:**
> "Assemble all routes in `src/App.jsx` using React Router DOM with automatic scroll-to-top on route change. Implement full functionality for each page:
> - Home: Hero with sun, interactive door rooms, travel paths, chat simulator, trust passport, polaroids preview, FAQ, and CTA.
> - Puppies: Real-time search bar, breed filter pills (Maltipoo, Pomeranian, Pomsky, Poodle, etc.), gender filter, and adopted strip.
> - PuppyDetail: Dynamic route `/puppies/:slug` with pedigree specs, health passport guarantee, and WhatsApp adoption CTA.
> - GoneHome: Boarding pass ticket booth for adopted litters.
> - HappyFamilies: 64-polaroid Wall of Love with lightbox modal.
> - HowItWorks: Toggle between Downtown Dubai Showroom visit and Direct Worldwide Import.
> - Faq: Accordion list with category filters and search.
> - Contact: Handwritten letter inquiry form with WhatsApp submission and Downtown Dubai map."

### Stage 5: Verification, Testing & Polish
**Prompt:**
> "Run production build with Vite (`npm run build`). Verify zero build errors. Run local preview server (`npm run preview`) and launch automated browser subagent to test navigation, mobile responsiveness, animations, filters, detail pages, and interactive components. Document findings."

---

## 3. Key Implementation Decisions & Rationale
1. **React + Vite instead of monolithic Next.js SSR**:
   - Clean, transparent project structure where each file has a single, well-defined responsibility.
   - Extremely fast development iteration (`npm run dev`) and sub-5-second production builds (`npm run build`).
   - Generates static output in `dist/` deployable to Vercel, Netlify, or GitHub Pages with zero server config.
   - Ideal for explaining clearly in a candidate Loom video.
2. **Centralized Data Layer (`src/data/`)**:
   - Separating data from UI allows changing showroom hours, adding new puppies, or modifying FAQs in a single place without touching UI components.
3. **Pure CSS & Tailored SVG Animations**:
   - Leveraged authentic keyframes (`tp-runner-x`, `tp-runner-leg-a`, `tp-twinkle`, `tp-door-open`) for 60fps hardware-accelerated animations without bulky external animation libraries.

---

## 4. Challenges & Solutions
- **Challenge 1: Capturing Streaming Next.js Server Components from Reference**:
  - *Solution*: Parsed the embedded JSON-LD schema and streaming script payloads to recover full puppy details and all 64 family photos.
- **Challenge 2: Windows PowerShell Quoting in Shell Commands**:
  - *Solution*: Created dedicated Node.js automation scripts in `scripts/` to ensure safe, cross-platform execution.
- **Challenge 3: Preserving Handcrafted Visual Identity**:
  - *Solution*: Integrated authentic Google Fonts (Fraunces serif and Patrick Hand scrawl) and exact SVG scallop patterns, matching the reference's premium boutique aesthetic.
