# FontContext → TD Design System Case Study: Code & Styling Analysis

**Source of truth:** `src/app/projects/figma-edu/page.tsx` (FontContext case study)  
**Target:** `src/app/projects/td-design-system/page.tsx` (TD Design System case study)

---

## 1. Page structure (FontContext)

```
min-h-screen bg-white text-gray-800
└── fc-container (flex, min-height 100vh)
    ├── fc-sidebar (fixed left, 240px, padding 40px 24px)
    │   ├── fc-back-link (svg + "BACK")
    │   └── fc-nav-links (vertical anchor list)
    └── fc-main-content (margin-left 240px, padding 48px 80px 48px 80px, children max-width 900px)
        ├── fc-project-meta (small caps label)
        ├── fc-project-title (h1, 48px)
        ├── fc-hero-image (420px height, overflow hidden)
        │   ├── .fc-hero-poster (img, absolute) [optional]
        │   └── video [optional]
        ├── fc-project-info (grid 4 cols, gap 32px)
        │   └── fc-info-item × 4 (h4 + p)
        ├── section.fc-section × N (id, margin-bottom 48px)
        │   ├── fc-section-label (small caps)
        │   ├── fc-section-title (h2, 28px)
        │   ├── fc-section-text (16px, max-width 720px)
        │   └── [optional blocks: fc-feature-showcase, fc-user-quote-blue, fc-key-insight, fc-design-decisions, fc-story-block]
        └── footer.fc-footer (margin-top 40px, no border)
            ├── fc-footer-credit
            └── fc-footer-links
```

---

## 2. All fc-* styles in FontContext (figma-edu)

| Class | Purpose |
|-------|--------|
| **Layout** | |
| `.fc-container` | Flex wrapper, min-height 100vh |
| `.fc-sidebar` | Fixed left nav, 240px, border-right #f0f0f0 |
| `.fc-back-link` | Back link, 12px, #666, gap 8px |
| `.fc-nav-links` | Column flex, gap 4px |
| `.fc-nav-links a` | 14px, #999, padding 8px 0 |
| `.fc-main-content` | margin-left 240px, padding 48px 80px, children max-width 900px |
| **Hero & meta** | |
| `.fc-project-meta` | IBM Plex Mono, 12px, 600, uppercase, #999, margin-bottom 16px |
| `.fc-project-title` | Inter, 48px, 600, #111, margin-bottom 48px, letter-spacing -0.03em |
| `.fc-hero-image` | 100% width, 420px height, margin-bottom 48px, position relative |
| `.fc-hero-image .fc-hero-poster` | Absolute, full size, object-fit cover |
| `.fc-hero-image video` | Absolute, full size, object-fit cover |
| `.fc-project-info` | Grid 4 cols, gap 32px, margin-bottom 48px |
| `.fc-info-item h4` | IBM Plex Mono, 11px, 600, uppercase, #999, margin-bottom 8px |
| `.fc-info-item p` | 14px, #111, line-height 1.7, font-weight 450 |
| **Sections** | |
| `.fc-section` | margin-bottom 48px |
| `.fc-section-label` | IBM Plex Mono, 11px, 600, letter-spacing 1.5px, uppercase, #999, margin-bottom 16px |
| `.fc-section-title` | Inter, 28px, 600, line-height 1.35, #111, margin-bottom 24px, letter-spacing -0.015em |
| `.fc-section-text` | 16px, #666, line-height 1.75, max-width 720px, margin-bottom 16px |
| `.fc-section-subtitle` | 14px, #999, line-height 1.6, margin-bottom 24px, max-width 720px |
| **Special blocks** | |
| `.fc-key-insight` | border-left 3px #0C8CE9, padding-left 24px, margin 48px 0 |
| `.fc-key-insight p` | Source Serif 4, 20px, italic, #111 |
| `.fc-user-quote-blue` | margin 32px 0, padding-left 24px, border-left 3px #0C8CE9 |
| `.fc-user-quote-blue p` | Source Serif 4, 20px, italic, #111 |
| `.fc-feature-showcase` | Grid 1.1fr 1fr, gap 48px, margin 48px 0 |
| `.fc-feature-showcase.reverse` | 1fr 1.1fr, image order 2 |
| `.fc-feature-image` | #f5f5f7, border-radius 12px, padding 32px, min-height 280px, border #e5e5e5 |
| `.fc-feature-text h3` | Inter, 20px, 600, #111, margin-bottom 8px |
| `.fc-feature-text p` | 14px, #666, line-height 1.7 |
| `.fc-design-decisions` | margin 48px 0 |
| `.fc-decision-item` | flex, gap 16px, padding 24px, margin-bottom 16px, border #e5e5e5, border-radius 12px, hover border #0C8CE9 |
| `.fc-decision-icon` | 44×44px, #E8F4FD, border-radius 8px, color #0C8CE9, flex center (SVG inside) |
| `.fc-decision-content h4` | Inter, 14px, 600, #111, margin-bottom 4px |
| `.fc-decision-content p` | 14px, #666, line-height 1.65 |
| `.fc-story-block` | flex, gap 16px, padding 24px, border #e5e5e5, border-radius 12px, margin 40px 0, hover border #0C8CE9 |
| `.fc-story-icon` | 44×44px, #E8F4FD, border-radius 8px, color #0C8CE9 |
| `.fc-story-content h4` | 14px, 600, #111, margin-bottom 4px |
| `.fc-story-content p` | 14px, #666, line-height 1.65 |
| **Footer** | |
| `.fc-footer` | margin-top 40px, padding 0, flex space-between |
| `.fc-footer-credit` | 12px, #999 |
| `.fc-footer-links` | gap 24px |
| `.fc-footer-links a` | 12px, #666, hover #0C8CE9 |

---

## 3. TD Design System vs FontContext

| Item | FontContext | TD Design System | Match? |
|------|-------------|------------------|--------|
| Outer wrapper | `min-h-screen bg-white text-gray-800` | Same | ✅ |
| fc-container, fc-sidebar, fc-main-content | Yes | Yes | ✅ |
| fc-back-link (svg + BACK) | Yes | Yes | ✅ |
| fc-nav-links (anchors) | Yes | Yes | ✅ |
| fc-project-meta, fc-project-title | Yes | Yes | ✅ |
| fc-hero-image | background transparent | background #1a3a2f (TD green) | ✅ Intentional |
| fc-project-info, fc-info-item | 4 cols | 4 cols | ✅ |
| Section pattern | label + title (h2) + text | label + title (h2) + text | ✅ |
| fc-design-decisions, fc-decision-item | SVG in fc-decision-icon | Emoji in fc-decision-icon | ⚠️ Visual only |
| fc-footer | margin-top 40px, no border | Same | ✅ |
| fc-aside (locked callout) | N/A | TD-only (red left border) | ✅ TD-specific |
| fc-section-subtitle | Defined | Not in TD styles | Optional add |
| fc-key-insight, fc-user-quote-blue | Defined | Not in TD styles | Optional add |

---

## 4. Recommendations for TD

1. **Keep** current structure and shared fc-* classes; they match FontContext.
2. **Optional:** Add `fc-section-subtitle`, `fc-key-insight`, and `fc-user-quote-blue` to the TD style block so any future quote or subtitle uses the same tokens as FontContext.
3. **Optional:** Use SVG icons inside `fc-decision-icon` (e.g. path/road for 🛤️, handshake for 🤝, megaphone for 📣) so the Learnings/Key Takeaways block matches FontContext’s Learnings section exactly.

---

## 5. File reference

- **FontContext (all code + styling):** `src/app/projects/figma-edu/page.tsx`
- **TD Design System (aligned to FontContext):** `src/app/projects/td-design-system/page.tsx`
