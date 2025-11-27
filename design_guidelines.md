# Design Guidelines: Rudolf Steiner AI-Assistent

## Design Approach

**Selected Approach:** Design System with Waldorf-Inspired Modifications

This is a utility-focused conversational interface requiring clarity and efficiency. We'll use established chat interface patterns (ChatGPT, Claude) as reference while incorporating organic, humanistic design elements that reflect Waldorf philosophy.

**Core Principle:** Create a contemplative, distraction-free environment for deep philosophical discussions.

## Layout System

**Spacing Framework:**
- Use Tailwind units: 2, 4, 6, 8, 12, 16, 20, 24
- Generous breathing room between messages: gap-6 to gap-8
- Container padding: p-6 on mobile, p-8 on desktop
- Message bubbles: p-4 to p-6 internal padding

**Overall Structure:**
```
┌─────────────────────────────────┐
│  Header (fixed, h-16)           │
├─────────────────────────────────┤
│                                 │
│  Chat Messages                  │
│  (scrollable, flex-1)          │
│  max-w-3xl centered            │
│                                 │
├─────────────────────────────────┤
│  Input Area (fixed bottom)      │
└─────────────────────────────────┘
```

**Responsive Breakpoints:**
- Mobile: Single column, full width with p-4
- Desktop: max-w-4xl centered container with generous side margins

## Typography

**Font Selection:**
- Primary: "Crimson Text" or "Libre Baskerville" (scholarly, humanistic serif via Google Fonts)
- Secondary/UI: "Inter" or "Source Sans Pro" (clean sans-serif for interface elements)

**Type Scale:**
- Header/Title: text-2xl to text-3xl, font-semibold
- Message content: text-base to text-lg (optimized for reading long philosophical texts)
- Input placeholder: text-base
- Timestamps/metadata: text-sm
- Button labels: text-sm font-medium

**Reading Optimization:**
- Message text: leading-relaxed (line-height 1.625)
- Max width for readability: max-w-prose within message containers
- Paragraph spacing: space-y-4 within message content

## Component Library

### Header Component
- Fixed positioning with backdrop blur
- Height: h-16
- Contains:
  - Logo/Title: "Rudolf Steiner Assistent" in display font
  - "Neues Gespräch" button (top-right)
  - Subtle bottom border for definition

### Chat Message Components

**User Message:**
- Right-aligned: ml-auto
- Width: max-w-2xl
- Rounded corners: rounded-2xl with slight asymmetry (rounded-tl-2xl rounded-tr-sm)
- Shadow: shadow-sm
- Padding: p-4 to p-6

**AI Message (Steiner):**
- Left-aligned: mr-auto
- Width: max-w-2xl
- Rounded corners: rounded-2xl with asymmetry (rounded-tl-sm rounded-tr-2xl)
- Subtle border: border
- Padding: p-4 to p-6
- Optional avatar/icon: Small 8x8 or 10x10 circular icon with Steiner's silhouette or abstract symbol

**Message Container:**
- Vertical spacing: space-y-6 to space-y-8 between messages
- Timestamp: text-xs positioned below message, subtle opacity

### Input Area Component
- Fixed bottom positioning with backdrop blur
- Padding: p-4 to p-6
- Contains centered max-w-4xl container with:
  - Textarea: Auto-expanding, min-h-12, max-h-32
  - Border: rounded-xl with border
  - Padding: p-3 to p-4
  - Send button: Positioned bottom-right of textarea (absolute or flex)
  - Send icon: Use Heroicons "paper-airplane" (solid variant)

**Input States:**
- Default: Subtle border
- Focus: Increased border emphasis with ring
- Disabled (during API call): Reduced opacity

### Button Components

**Primary Button (Send, Neues Gespräch):**
- Size: px-4 py-2 for standard, p-3 for icon-only
- Rounded: rounded-lg
- Font: font-medium text-sm
- Icon size: w-5 h-5 for icons
- Loading state: Replace icon with spinner animation

**Secondary Button (if needed):**
- Transparent with border
- Same sizing as primary

### Welcome State Component
(Shown when no messages exist)
- Centered vertically and horizontally
- Max width: max-w-2xl
- Contains:
  - Greeting: "Guten Tag, ich bin Rudolf Steiner" (text-3xl font-semibold)
  - Introduction paragraph: About helping with Waldorf pedagogy and anthroposophy
  - 3-4 suggested questions as clickable cards:
    - Grid layout: grid-cols-1 md:grid-cols-2 gap-4
    - Card styling: rounded-xl border p-4 hover state with cursor-pointer
    - Question text: text-sm to text-base

## Icon Library

**Selected:** Heroicons (via CDN)
- Send: paper-airplane (solid)
- New conversation: plus-circle or chat-bubble-left-right
- Menu (mobile): bars-3
- Close: x-mark

## Accessibility

- Focus states: All interactive elements have visible focus rings (ring-2)
- Color contrast: Ensure text meets WCAG AA standards
- Keyboard navigation: Tab through input, buttons
- ARIA labels: Proper labeling for screen readers ("Nachricht senden", "Neues Gespräch starten")
- Auto-focus: Input field focused on page load and after sending

## Animations

**Minimal Motion:**
- Message appearance: Fade-in with slight slide-up (duration-200)
- Button hover: Subtle scale or opacity shift (transition-all duration-150)
- Loading state: Gentle spinner rotation
- NO scroll-triggered animations
- NO parallax effects

## Special Considerations

**German Language:**
- All UI labels, placeholders, and messages in German
- Input placeholder: "Stellen Sie Rudolf Steiner eine Frage über Waldorfpädagogik..."
- Button labels: "Senden", "Neues Gespräch"
- Empty state: "Keine Nachrichten"

**Content Formatting:**
- Support for paragraphs with proper spacing
- Bullet points and numbered lists in AI responses
- Proper quotation marks (German style: „...")

**Scrolling Behavior:**
- Auto-scroll to bottom on new messages
- Smooth scroll: scroll-smooth
- Sticky input at bottom

**Loading States:**
- Typing indicator: Three animated dots while AI responds
- Message appears after full response received

This design creates a contemplative, scholarly environment befitting discussions with Rudolf Steiner while maintaining modern usability standards.