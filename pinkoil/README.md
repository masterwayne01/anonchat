# Pinkoil — brand landing

Static site, no build step. Open `index.html` directly or serve the folder (`python3 -m http.server`).

```
pinkoil/
├── index.html          page markup — every swappable slot is commented [INSERT …]
├── css/styles.css      all styling; colours/fonts are tokens at the top (:root)
├── js/main.js          reveal, parallax, top bar, Taste (food) view
├── js/menu-data.js     ← the food menu lives here (edit this, not HTML)
└── assets/
    ├── symbols/        symbol-primary.svg · symbol-secondary.svg · symbol-small.svg
    ├── photos/         photo-01 … photo-05 (brand strip)
    └── food/           dish-01 … dish-06 (Taste view)
```

## Swapping placeholders

Add `?slots` to the URL (e.g. `index.html?slots`) to see every placeholder outlined with its label.

| Slot | Where |
|---|---|
| INSERT SYMBOL FILE | `assets/symbols/symbol-primary.svg` (keep the name or update `index.html`) |
| INSERT SECONDARY SYMBOL | `assets/symbols/symbol-secondary.svg` |
| Small mark (top bar, footer, favicon, Taste view) | `assets/symbols/symbol-small.svg` |
| INSERT HERO LINE | `index.html` → `.hero__line` (draft: "A world, slowly poured.") |
| INSERT DESCRIPTION COPY | `index.html` → `.about__copy` |
| INSERT 3–6 PHOTOS | `assets/photos/` + `src`/`alt`/`width`/`height` in the `.strip` figures. Delete figures you don't need — layout holds with 3+. |
| INSERT HANDLES / CONTACT | `index.html` → footer |
| INSERT FOOD CONTENT | `js/menu-data.js` (categories, dishes, prices, photos) + intro/ordering note in `index.html` |
| Food entry label | `index.html` → `.door__label` (currently "Taste") |

## Image guidance (fast load)

- Export photos as **WebP** (or AVIF) with JPG fallback, ~80% quality.
  Sizes: portrait 1200×1500, landscape 1200×900, full-bleed 2400×1100, square 1000×1000, food 1200×900.
- Always update the `width`/`height` attributes to the real pixel size (prevents layout shift).
- Strip photos are `loading="lazy"`. Food photos are not loaded at all until the Taste view
  is first opened (they're pre-warmed in idle time after page load).
- The silver hero is pure CSS gradients — no image weight.

## Fonts

Clash Display (headings) + Satoshi (body) via Fontshare, linked in `<head>`.
If you license Söhne / Neue Haas, self-host them and change `--font-display` / `--font-body` in `css/styles.css`.

## Behaviour notes

- Taste view: opens from the top-right "Taste" door, slides up on mobile / in from the right on desktop.
  Closes via Return, Esc, clicking the silver sliver, or the browser back button. `#taste` links open it directly.
- Respects `prefers-reduced-motion` (sheen, parallax and drift turn off).
