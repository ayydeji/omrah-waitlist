# FILE: claud.md

# PURPOSE: Define design, logic, and component structure for Omrah.club landing page MVP

---

## ✨ OBJECTIVE

Create a Next.js solution that is not only functional but also adheres to the best practices in performance, security, and maintainability.

Omrah is an AI-powered Umrah itinerary planner that lets users find and personalize Umrah trips in a single sentence.

---

## 🧠 EXPERT CONTEXT

You are an expert full-stack developer proficient in TypeScript, React, Next.js, and modern UI/UX frameworks (e.g., Tailwind CSS, Shadcn UI, Radix UI). Your task is to produce the most optimized and maintainable Next.js code, following best practices and adhering to the principles of clean code and robust architecture.

---

## 🔄 METHODOLOGY

1. **System 2 Thinking**: Break down the requirements analytically.
2. **Tree of Thoughts**: Evaluate multiple possible UI/UX and architecture paths.
3. **Iterative Refinement**: Constantly test, refactor, and improve.

---

## 🔢 FILE STRUCTURE GUIDELINES

- Use functional and declarative programming patterns
- Avoid class-based components
- Structure files with exported components, helpers, types
- Use lowercase with dashes for directories (e.g., `components/prompt-rotator`)
- Use descriptive state and prop variable names (e.g., `isLoading`, `hasError`)

---

## 🔨 UI DESIGN + COMPONENT SPEC

### 💼 Layout Overview

```
[ omrah. ]            ← minimalist top-center logo (text only)

[ Find your next Umrah trip in one sentence ]  ← hero headline (centered)

[ Rotating prompt input field ]   ← animated placeholder or displayed sentence

[ Sign up to waitlist ]           ← CTA button (Opens up a modal)

[ Example itinerary card (angled left overlay) ] ← in the background
```

### 🌟 Prompt Rotator Logic

- Animate prompt every 3–4 seconds
- Use `react-simple-typewriter` or `Framer Motion` for animation
- Typing halts on input focus

**Prompt Examples:**

```json
[
  "I want to go Umrah with my wife next month",
  "Find me a 7-day Umrah trip for October half term",
  "Take me and my parents to Makkah in December",
  "Show me the cheapest Umrah package from Manchester",
  "I want to go for 10 days in Ramadan, from New York",
  "Help me book a 5-star Umrah in January",
  "I want to visit Makkah and Madinah with a Ziyarah tour"
]
```

### ✅ Waitlist Form

- Input + CTA button
- Submit to Supabase, Airtable, or Formspree
- Basic validation via Zod
- Use Toast or Inline UI for success message

### 📄 Example Itinerary Preview

The example itinerary card should serve as a visual teaser of what Omrah can generate for the user. It appears subtly in the background (angled left overlay), designed to build curiosity and trust.

#### 📐 Layout & Content

- **Trip Title**: “7-Day Couple’s Umrah – October”
- **Flights**:
  - Departure: “London ✈ Jeddah – Oct 5”
  - Return: “Jeddah ✈ London – Oct 12”
- **Hotel**:
  - Name: e.g. “Pullman Zamzam Makkah”
  - Price: “£68/night”
  - Distance: “150m from Haram”
- **Total Price**: “From £985 per person”
- **CTA Button (subtle)**: “See full itinerary →”

#### 🖌️ Visual Style

- Slightly rotated or angled (like a polaroid note)
- Low opacity or blurred (`opacity-40`, `backdrop-blur-sm`)
- Subtle card with rounded corners and soft shadow
- Example Tailwind class:
  ```tsx
  className = "rounded-xl bg-white/60 backdrop-blur-sm shadow-md p-4 w-[300px]";
  ```

#### 💡 Optional Enhancements

- Hover/tap expands into a modal preview
- AI-generated summary tag: e.g., “Optimized for comfort + budget”
- Optional local time + prayer time preview
- Static image or interactive card
- Label: “Example Itinerary”
- Opens modal or links to `/demo`

---

## 🔄 USER FLOW

1. User lands
2. Sees animated prompt cycling
3. Clicks "Join waitlist"
4. Gets confirmation toast
5. Optionally previews example itinerary

---

## 📊 TECH STACK

- **Frontend**: Next.js App Router + React Server Components
- **Styling**: Tailwind CSS + Shadcn UI
- **Animation**: Framer Motion or `react-simple-typewriter`
- **Form Handling**: Supabase or Formspree
- **Validation**: Zod
- **State Management**: Zustand or simple local state
- **Deployment**: Vercel
- **Analytics**: Posthog or Plausible

---

## 🌐 BEST PRACTICES & PERFORMANCE

- Responsive design (mobile-first)
- Lazy load images
- Use `Image` component with WebP fallback
- Prefer RSC for render efficiency
- Avoid unnecessary `useEffect`/`useState`
- Dynamic import non-critical UI
- Avoid layout shifts with consistent sizing

---

## 🚫 ERROR HANDLING

- Use early returns and guard clauses
- Validate user input via Zod
- Track form errors with UI feedback
- Wrap API calls with try/catch and user-facing error messages

---

## 🔧 COMPONENTS TO IMPLEMENT

| Component        | Description                    |
| ---------------- | ------------------------------ |
| `hero-text`      | Renders main headline          |
| `prompt-rotator` | Animated rotating prompt input |
| `waitlist-form`  | Form submission logic          |
| `itinerary-card` | Static demo itinerary preview  |
| `confirm-toast`  | Success notification           |

---

## 📅 FUTURE EXTENSIONS

- Social proof section ("Join 300+ Muslims planning smarter trips")
- Newsletter signup integration
- Landing page for pricing
- Shared itinerary saving (requires auth)
- SEO-rich pages for "Cheap Umrah in October", "Ramadan Umrah from London", etc.
- Support for uploading passports and auto-filling visa forms (with partner integrations)

---

## 🔖 FINAL NOTE

Make it fast. Make it spiritual. Make it beautiful.

Every millisecond of delight earns user trust. Every sentence entered is a potential journey of a lifetime.
