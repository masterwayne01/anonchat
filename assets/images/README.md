# Gallery images

Every file in this folder is a **placeholder**. They are flat SVG stand-ins drawn in the
brand palette so the layout reads correctly before the real work exists. Replace all of them
before the site goes anywhere near an Instagram bio link.

## What each file is used for

| File | Where | Aspect | Suggested export |
|---|---|---|---|
| `hero.svg` | Hero | 4:5 | 1400 x 1750 |
| `work-before.svg` | Before/after, left | 4:5 | 1400 x 1750 |
| `work-after.svg` | Before/after, right | 4:5 | 1400 x 1750 |
| `work-01.svg` | Gallery, full width | 16:9 | 2000 x 1125 |
| `work-02.svg` | Gallery, 2-up left | 4:5 | 1400 x 1750 |
| `work-03.svg` | Gallery, 2-up right | 4:5 | 1400 x 1750 |
| `work-04.svg` | Gallery, video tile | 1:1 | 1400 x 1400 |
| `work-05.svg` | Gallery, offset right | 3:4 | 1400 x 1867 |
| `work-06.svg` | Gallery, captioned row | 3:4 | 1400 x 1867 |
| `var-01…04.svg` | Ad variation strip | 1:1 | 1000 x 1000 |

The aspect ratios matter. The `width` and `height` attributes on each `<img>` in
`index.html` reserve the right amount of space while the image loads, which is what stops
the page jumping around. **If you change an aspect ratio, change those two attributes too.**

## Swapping in real work

1. Export the image at the size above, then make three versions: `.avif`, `.webp`, `.jpg`.
2. Replace the `<img>` in `index.html` with a `<picture>`:

```html
<figure class="shot">
  <picture>
    <source srcset="/assets/images/work-01.avif" type="image/avif">
    <source srcset="/assets/images/work-01.webp" type="image/webp">
    <img src="/assets/images/work-01.jpg"
         alt="Write what is actually in the frame."
         width="2000" height="1125" loading="lazy" decoding="async">
  </picture>
  <figcaption class="cap">Drinkware · lifestyle scene</figcaption>
</figure>
```

3. Keep `loading="lazy"` and `decoding="async"` on everything **except** the hero image,
   which should stay `fetchpriority="high"` with no `loading` attribute.
4. **Rewrite the alt text.** Every alt attribute currently starts with "Placeholder:".
   Describe what is genuinely in the shot: the product, the setting, the light.
   Search `index.html` for `alt="Placeholder` to find them all.

## The video tile

`work-04.svg` is a still standing in for a product video. When you have the real loop,
swap it for:

```html
<video class="shot__video" width="1400" height="1400" autoplay muted loop playsinline
       preload="metadata" poster="/assets/images/work-04-poster.jpg"
       aria-label="Product video: a candle jar turning slowly in warm light.">
  <source src="/assets/images/work-04.webm" type="video/webm">
  <source src="/assets/images/work-04.mp4" type="video/mp4">
</video>
```

Keep it under a couple of megabytes. Most of this site's traffic is on a phone.

## Sizes

Nothing here uses `srcset` width descriptors yet, because the placeholders are vectors.
Once real photography is in, add `srcset`/`sizes` to the largest images (hero, `work-01`,
`work-05`) so phones do not download desktop-sized files.
