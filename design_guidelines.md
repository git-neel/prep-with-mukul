# Design Guidelines for MasterMukul

## Design Approach
**Reference-Based Design** inspired by mastermath.in - An education services landing page combining personal branding with social proof and conversion optimization. The design balances professional credibility with approachable, student-friendly aesthetics.

## Typography

**Font Families** (via Google Fonts):
- **Primary Body**: Roboto (400, 500, 700) - clean, readable
- **Headings**: Josefin Sans (600, 700) - friendly, educational
- **Accent/Handwritten**: Allison or Dancing Script (400) - personal touch for signatures/callouts

**Hierarchy**:
- H1: 2.5rem/3.5rem (mobile/desktop), font-weight 700
- H2: 1.875rem/2.25rem, font-weight 600-700  
- H3: 1.5rem/1.75rem, font-weight 600
- H4/H5: 1.125rem/1.25rem, font-weight 600
- Body: 1rem (16px), line-height 1.6
- Small text: 0.875rem (14px)

## Layout System

**Spacing Units**: Tailwind spacing - primarily use 4, 6, 8, 12, 16, 20, 24 units (p-4, mb-8, py-12, etc.)

**Section Padding**: py-16 md:py-20 lg:py-24 for major sections

**Container**: max-w-7xl mx-auto px-4 md:px-6

**Grid Layouts**: 
- Features: grid-cols-1 md:grid-cols-3
- Testimonials: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Schools/Gallery: grid-cols-2 md:grid-cols-3 lg:grid-cols-4

## Component Library

**Navigation**:
- Sticky header with logo left, CTA button right
- Simple, clean with minimal links
- Mobile: Hamburger menu

**Buttons**:
- Primary CTA: Large, rounded-lg, font-weight 600, px-8 py-4
- When on images: backdrop-blur-md bg-white/10 border border-white/20
- Hover: transform scale-105 transition

**Cards**:
- Feature cards: Rounded-xl, p-6, shadow-sm with icon/emoji at top
- Student result cards: Image-based with score overlay
- School logos: Rounded-lg with grayscale filter, hover to color
- Testimonial cards: Video thumbnail with play icon overlay

**Badges/Tags**:
- Star ratings: Inline ⭐⭐⭐⭐⭐ 
- Stats counters: Large numbers with animated counting effect
- Trust badges: "Money back guarantee" style ribbons/badges

**Section Headers**:
- Small eyebrow text (uppercase, tracking-wide, text-sm)
- Large headline below
- Optional supporting text

## Images

**Hero Section**: 
- Full-width split layout (60/40)
- Left: Content with headline, subheadline, CTA
- Right: Featured image of tutor teaching/student learning (happy, professional)
- Add decorative elements: curved shapes, subtle patterns

**Student Results Gallery**:
- Masonry grid of student result cards/certificates
- Image placeholders showing score sheets, happy students
- Overlay with scores (e.g., "95/100")

**Schools Section**:
- Grid of school logos (grayscale by default)
- Each logo in rounded container with padding

**Live Class Snippets**:
- Grid of video thumbnails showing online class screenshots
- Play button overlay on each

**Tutor Section**:
- Professional photo of tutor (circular frame or rounded-2xl)
- Stats/credentials nearby (animated counters)
- Certificates/credentials displayed

**Testimonial Videos**:
- Video thumbnail cards with play icon
- Student name, score, 5-star rating overlay

## Key Page Sections (In Order)

1. **Hero** - Headline, subheadline, primary CTA, hero image
2. **Social Proof Bar** - "Join 1470+ achievers" with star rating
3. **Features (3-column)** - Experienced tutor, Customized plans, Interactive sessions
4. **Secondary Hero/CTA** - Reinforcement with guarantee badge
5. **Student Results Gallery** - Masonry/grid of achievements
6. **Schools Section** - Grid of school logos with heading
7. **Live Class Snippets** - Photo/video gallery from actual classes
8. **How It Works** - 4-point process with icons, left content + right image
9. **Meet the Tutor** - Bio section with photo, stats, credentials
10. **Why Learn Section** - 3 unique selling points in cards
11. **Video Testimonials** - 3-column grid of student testimonials
12. **Final CTA** - Strong conversion section
13. **Footer** - Simple, contact info, links

**Special Elements**:
- Decorative "ooo" dividers between sections
- Handwritten-style arrows/underlines using accent font
- Emoji usage for personality (🏆, 🟢, 🙏🏽)
- Stats with animated counters
- WhatsApp/Call support mentions

**Overall Vibe**: Educational yet warm, professional yet approachable, data-driven yet personal. Heavy social proof throughout.