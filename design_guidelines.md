# Design Guidelines: Personal Portfolio Web App

## Design Approach
**Reference-Based Approach** drawing inspiration from modern portfolio sites (Linear, Vercel, Stripe) combined with the user's stated preferences for "clean, minimal, yet bold" aesthetic. This portfolio requires strong visual impact while maintaining professional credibility.

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary Theme)**
- Background: 222 15% 8% (deep charcoal)
- Surface: 222 15% 12% (elevated elements)
- Text Primary: 0 0% 98%
- Text Secondary: 0 0% 70%
- Accent Primary: 180 85% 55% (electric teal - hero CTAs, links, highlights)
- Accent Subtle: 180 25% 25% (teal tint for borders, hover states)
- Success: 142 76% 45%
- Danger: 0 84% 60%

**Light Mode**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Text Primary: 222 15% 15%
- Text Secondary: 222 10% 45%
- Accent Primary: 180 75% 45% (adjusted teal for light backgrounds)
- Accent Subtle: 180 35% 92%

### B. Typography

**Font Families**
- Headings: Inter or DM Sans (geometric, modern)
- Body: Inter or System UI Stack
- Code: JetBrains Mono

**Hierarchy**
- Hero Heading: text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight
- Section Headings: text-4xl md:text-5xl font-bold
- Subsection Headings: text-2xl md:text-3xl font-semibold
- Body Large: text-lg md:text-xl leading-relaxed
- Body: text-base leading-relaxed
- Small: text-sm

### C. Layout System

**Spacing Primitives**: Use Tailwind units of 2, 4, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-4 md:p-8
- Section padding: py-16 md:py-24 lg:py-32
- Container max-width: max-w-7xl

**Grid System**
- Projects: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8
- Blog/Updates: grid-cols-1 md:grid-cols-2 gap-8

### D. Component Library

**Hero Section (Home Page)**
- Full viewport height (min-h-screen) with centered content
- Large bold heading with gradient text effect on name/key phrase
- Animated typewriter effect or fade-in for tagline
- Two CTAs: Primary (solid teal, glowing effect) + Secondary (outline with blur backdrop)
- Subtle animated background: gradient mesh or particle effect
- Hero image: Professional headshot or abstract tech-themed visual positioned on right side (desktop) or above text (mobile)

**Navigation**
- Sticky top navigation with blur backdrop
- Logo/name on left, nav links center/right
- Theme toggle (sun/moon icon) on far right
- Mobile: hamburger menu with slide-in drawer
- Active state: teal underline indicator

**Project Cards**
- Elevated card design (shadow-lg hover:shadow-2xl transition)
- Featured image at top (16:9 aspect ratio)
- Tech stack badges (small pills with teal border, subtle background)
- Hover: lift effect (transform scale-105) + teal accent border glow
- GitHub and Live Demo icons in footer with hover states

**About Section**
- Two-column layout: bio text left, skills/timeline right
- Skills: Icon + label grid (4 columns on desktop)
- Timeline: Vertical line with connected dots, alternating left/right content

**Bot Showcase Page**
- Hero with bot name, tagline, large demo GIF/video (prominent placement)
- Feature cards grid (3 columns) with icons
- Code example snippet with syntax highlighting
- GitHub CTA button prominently displayed

**Blog/Updates Feed**
- Card-based layout with large preview images
- Tag pills (teal border, transparent background)
- Read time and publish date metadata
- "Published" badge for admin view

**Contact Form**
- Single column, centered, max-width prose
- Large input fields with focus states (teal border)
- Submit button with loading state animation
- Success message with icon

**Admin Dashboard**
- Sidebar navigation (dark sidebar even in light mode)
- Table view for content management with action buttons
- Modal forms for create/edit (centered, max-w-2xl)
- Toast notifications for success/error (top-right)
- Delete confirmation dialog

### E. Animations

**Strategic Use Only**
- Hero: Fade-in on load (stagger children by 100ms)
- Project cards: Hover lift + glow (duration-300)
- Page transitions: Fade (duration-200)
- Theme toggle: Smooth color transition (duration-500)
- Form submissions: Button loading spinner
- NO scroll-triggered animations except fade-in for initial viewport

### F. Images

**Hero Section**: Include a professional headshot or abstract tech/coding-themed image. Desktop: position right side with 40% width. Mobile: full-width above text.

**Projects**: Each project card requires a featured image (screenshot or mockup) at 16:9 ratio, optimized and lazy-loaded.

**Bot Showcase**: Large demo GIF or video embed (prominent, centered, max-w-4xl).

**About**: Optional profile photo, skills icons from icon library.

## Accessibility & Quality Standards

- Maintain WCAG AA contrast ratios in both themes
- All interactive elements keyboard accessible with visible focus states (teal outline)
- Semantic HTML (nav, main, article, section)
- Alt text for all images
- Form labels and error messages clearly associated
- Responsive breakpoints: mobile-first, sm: 640px, md: 768px, lg: 1024px, xl: 1280px

## Page-Specific Guidelines

**Home**: Bold hero with image, concise value proposition, dual CTAs, featured projects preview (3 cards)

**About**: Story-driven bio, skills showcase with icons, career/project timeline with visual flow

**Projects**: Filterable grid (All/Web/Mobile/Bot), search functionality, featured projects at top

**Bot Page**: Dedicated showcase with hero, feature highlights, demo media, GitHub integration, documentation preview

**Blog**: Reverse chronological feed, tag filtering, search, markdown rendering with syntax highlighting

**Contact**: Simple form with context (response time, alternative contact methods)

**Admin**: Clean table views, inline actions, modal forms with validation, dashboard metrics at top