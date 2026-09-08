# Reframe — wereframe.studio

Single-page marketing site for Reframe, an AI-native product visuals studio for e-commerce
brands. Static HTML, CSS and about 90 lines of JavaScript. No build step, no framework,
no dependencies.

## Files

    index.html              the whole site
    thanks.html             form success page (no-JS path)
    favicon.svg
    robots.txt / sitemap.xml
    netlify.toml            publish config + headers
    assets/css/styles.css   @font-face declarations, then the design system, then components
    assets/js/main.js       header hairline, scroll reveals, before/after slider, form
    assets/fonts/           Fraunces and Inter, self-hosted, with their licences
    assets/images/          gallery placeholders — see the README in there
    PLACEHOLDERS.md         everything still to fill in before launch
    anonchat.html           unrelated older demo, kept so nothing was lost

## Running it locally

Any static server. From the repo root:

    python3 -m http.server 8000

Then open <http://localhost:8000>. Opening `index.html` straight off disk mostly works, but
the absolute `/assets/...` paths will not resolve, so use a server.

## Deploying

Netlify, no build command, publish directory `.`. `netlify.toml` already says this, so
connecting the repo is enough. Drag-and-drop deploys work too.

The contact form uses Netlify Forms. It is detected automatically at deploy time from the
`data-netlify="true"` attribute. After the first deploy, turn on notifications in
Netlify → Forms so submissions actually reach a person.

## Design system

Set in `:root` at the top of `styles.css`. Change colour or type there, not in components.

- **Bone** `#F6F1E9` background, **espresso** `#2A211B` text, **clay** `#A85A3E` accent,
  **sand** `#ECE2D2` secondary surfaces. No pure white, no pure black, no cool grey,
  no gradients.
- **Fraunces** for the wordmark and display headlines, **Inter** for body copy.
- The **viewfinder** motif is the `.vf` class: eight single-colour background layers drawing
  four corner brackets. It is used four times on the whole page. Keep it that way.

Body text runs at 5.8:1 against the background and the accent used at text size (`--clay-deep`)
at 6:1, both above the WCAG AA threshold. If you change the palette, re-check that.

## Performance notes

- Images carry `width`/`height` so nothing shifts as the page loads; everything below the
  fold is lazy-loaded.
- **Zero third-party requests.** Fraunces and Inter are served from `/assets/fonts` as
  variable woff2, preloaded, `font-display: swap`, with a real fallback stack behind them.
  Both are SIL Open Font License 1.1 and the licences ship alongside the files.
- First load is nine requests and about 165 KB uncompressed, two thirds of which is the two
  font files. Everything below the fold is deferred.
- No tracking, no cookie banner, nothing to consent to.

## Accessibility

Skip link, semantic landmarks, real heading order, visible focus rings, alt text on every
image, native `<details>` for the FAQ, and a keyboard-operable before/after slider (it is a
real range input, so arrow keys work). `prefers-reduced-motion` disables the scroll reveals
and smooth scrolling.
