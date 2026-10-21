# 🐾 TeddyPups U.A.E. — Technical Clone

A complete, pixel-accurate clone of the luxury boutique pet adoption website [TeddyPups U.A.E.](https://puppy.instabizweb.com/). Built with **React**, **Vite**, **Tailored Vanilla CSS**, and **React Router DOM**.

---

## 🌟 Live Demo & Source Code
- **Live Deployment URL**: `[YOUR_VERCEL_OR_NETLIFY_URL_HERE]`
- **GitHub Repository**: [https://github.com/Sachin-R-star/teddy_pups](https://github.com/Sachin-R-star/teddy_pups)
- **Loom Walkthrough Video**: `[YOUR_LOOM_VIDEO_URL_HERE]`

---

## 🚀 Key Features & Interactive Highlights

1. **Authentic Storybook Design System**:
   - Fraunces serif plush typography and Patrick Hand handwritten notes.
   - Hand-drawn scalloped hems, watercolor washes, and ink outlines.
   - Warm luxury color scheme: honey (`#fbe3b4`), cocoa (`#2a170e`), toffee (`#c2622b`), and warm milk (`#fffdf8`).

2. **Interactive Elements**:
   - **Running Puppy Curtain Intro (`Curtain.jsx`)**: Animated puppy runner with bobbing ears, wagging tail, moving legs, and paw prints on stage.
   - **Showroom Door Peek-In (`DoorRoom.jsx`)**: Playroom doors swing open on hover/click to reveal puppies inside.
   - **WhatsApp Journey Simulator (`PhoneChat.jsx`)**: Interactive smartphone showing the 4-step adoption conversation with media cards and audio clips.
   - **Full Puppies Catalog (`Puppies.jsx`)**: Real-time search bar, breed filter pills (Maltipoo, Pomeranian, Pomsky, Poodle, etc.), and gender filters.
   - **Puppy Detail Page (`PuppyDetail.jsx`)**: Full specs (origin, weight, coat, microchip, vaccination), health guarantee, and WhatsApp adoption CTA.
   - **Adopted Boarding Passes (`GoneHome.jsx`)**: Vintage flight tickets for adopted puppies (e.g., "Seoul ✈️ Dubai").
   - **Wall of Love (`HappyFamilies.jsx`)**: 64 polaroid photos with authentic washi tape effects and interactive lightbox modal.
   - **How It Works (`HowItWorks.jsx`)**: Interactive switch between Downtown Dubai Showroom visit and Direct Rare Import.
   - **Categorized FAQs (`Faq.jsx`)**: Accordion questions with real-time search.
   - **Handwritten Letter Form (`Contact.jsx`)**: Interactive letter style contact form that generates pre-filled WhatsApp messages.
   - **Night Sky Footer (`Footer.jsx`)**: Twinkling stars, crescent moon, and woven basket with sleeping puppy.

---

## 📁 Clean & Modular Project Structure

```
clone_project_21-10-2026/
├── public/
│   ├── cursor/                 # Paw cursor SVG assets
│   └── favicon.png             # Site favicon
├── src/
│   ├── components/             # Reusable UI components
│   │   ├── Curtain.jsx         # Opening puppy runner curtain intro
│   │   ├── DoorRoom.jsx        # Interactive playroom doors
│   │   ├── Footer.jsx          # Night sky footer with stars and basket
│   │   ├── Navbar.jsx          # Header with logo, nav links, paw indicator & drawer
│   │   ├── PhoneChat.jsx       # Interactive smartphone WhatsApp chat simulator
│   │   ├── PolaroidCard.jsx    # Polaroid photo with washi tape & lightbox trigger
│   │   ├── PuppyCard.jsx       # Sketchbook puppy card with wash & ink doodle
│   │   └── TicketCard.jsx      # Vintage airline boarding ticket for adopted pups
│   ├── data/                   # Centralized datasets for easy modification
│   │   ├── faqs.js             # Categorized FAQ questions & answers
│   │   ├── goneHome.js         # 27 adopted puppies dataset with routes
│   │   ├── polaroids.js        # 64 authentic happy customer family polaroids
│   │   ├── puppies.js          # 15 available puppies with full pedigree & health specs
│   │   └── siteConfig.js       # Phone numbers, showroom hours, address, WhatsApp builder
│   ├── pages/                  # Page routes
│   │   ├── Contact.jsx         # Handwritten letterform & showroom visit booking
│   │   ├── Faq.jsx             # Accordion FAQs with category filters & search
│   │   ├── GoneHome.jsx        # Boarding pass ticket booth for adopted litters
│   │   ├── HappyFamilies.jsx   # 64-polaroid Wall of Love with lightbox
│   │   ├── Home.jsx            # Full landing page matching reference site
│   │   ├── HowItWorks.jsx      # 4-step adoption process with local vs import switch
│   │   ├── Puppies.jsx         # Catalog with real-time search and breed filters
│   │   └── PuppyDetail.jsx     # Individual puppy showcase page
│   ├── styles/
│   │   └── main.css            # TeddyPups design system, custom keyframes & styles
│   ├── App.jsx                 # React Router configuration & scroll-to-top
│   └── main.jsx                # React root mount
├── prompts.md                  # Detailed AI prompts, workflow, and technical decisions
├── package.json                # Dependencies and scripts
├── vite.config.js              # Vite configuration
└── index.html                  # HTML entry point with Google Fonts
```

---

## 🛠️ How to Run Locally

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```
The optimized production bundle will be generated in `dist/`.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🚢 One-Click Deployment Guide

### Deploy to Vercel (Recommended - 2 Minutes)
1. Push this repository to your GitHub account:
   ```bash
   git init
   git add .
   git commit -m "feat: complete TeddyPups website clone"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```
2. Go to [vercel.com](https://vercel.com/) and click **"Add New Project"**.
3. Import your GitHub repository.
4. Keep the default settings (Framework Preset: **Vite**, Root: `./`).
5. Click **"Deploy"**. Your live URL will be ready in under 60 seconds!

### Deploy to Netlify
1. Connect your GitHub repo on [netlify.com](https://www.netlify.com/).
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Click **Deploy site**.

---

## 🎥 Loom Video Walkthrough Script (Talking Points)

When recording your Loom video, follow this outline to make an outstanding impression:

1. **Introduction (30s)**:
   - Introduce yourself and the assignment: *"Cloning the TeddyPups U.A.E. luxury puppy boutique website."*
   - Highlight the goal: *"Matching design, layout, responsiveness, and interactive feel while keeping the codebase clean, modular, and easy to maintain."*

2. **Live Demonstration (1.5 - 2 mins)**:
   - Show the **Curtain Intro** with the running puppy animation and "every puppy is family" scrawl.
   - Walk through the **Home Page**: Show the hero section, the interactive **playroom doors** that swing open, the **WhatsApp Phone Chat simulator**, and the **night sky footer**.
   - Navigate to **Puppies**: Demonstrate live search by name, filtering by breed (Maltipoo, Pomeranian, etc.), and gender toggling.
   - Open a **Puppy Detail Page (Max)**: Point out pedigree specifications, health certifications (UAE MOCCAE), and the custom pre-filled WhatsApp inquiry button.
   - Show **Happy Families**: Click a polaroid to open the full-resolution lightbox modal.
   - Show **How It Works**: Toggle between the Downtown Dubai showroom visit and direct worldwide import paths.
   - Show **FAQ**: Expand questions and show live search.
   - Show **Visit & Contact**: Demonstrate the handwritten letterform.

3. **Code Architecture & Structure (1.5 mins)**:
   - Open VS Code and explain the clean directory structure (`src/components`, `src/pages`, `src/data`, `src/styles`).
   - Highlight how separating data into `src/data/` makes it effortless to add new puppies or change showroom hours without editing UI code.
   - Explain how React Router DOM provides smooth, instant navigation without full-page reloads.

4. **AI Tools & Exact Prompts (1 min)**:
   - Reference `prompts.md` in the repo: explain how AI was utilized for schema parsing, systematic code modularization, and aesthetic fidelity.

5. **Challenges & Testing (1 min)**:
   - Explain how you tested all routes locally using Vite preview and automated browser subagents.
   - Mention handling responsive layouts and optimizing 60fps SVG keyframe animations.

6. **Conclusion**:
   - Thank the interviewer and confirm live URL and GitHub link.
