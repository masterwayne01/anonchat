# Fill these in before launch

Everything unresolved is marked in the page with a `.tbd` span, which renders in clay with a
dotted underline so it is impossible to miss. To find them all:

    grep -n 'tbd' index.html

## 1. Turnaround time

Replace every `[X]` with the real number of days.

- `index.html` → Process, step 03: "First delivery in [X] days."
- `index.html` → Comparison, Reframe card: "First delivery in [X] days from approving the direction."
- `index.html` → FAQ, "How fast is it?": two `[X]` values (first delivery, revisions).

## 2. Pricing

Replace every `[$X]` and `[N]`.

- `index.html` → Pricing list: six starting prices.
- `index.html` → Pricing retainer: `[N]` pieces at `[$X]` a month.
- `index.html` → Comparison, Reframe card: "From [$X] a piece."
- `index.html` → Pricing, ad creative pack: `[N]` variations.

Decide whether the starting prices are per image or per set, and keep the unit labels honest.

## 3. Real work in the gallery

See `assets/images/README.md`. Placeholders are obvious at a glance and the gallery is the
biggest section on the page, so this is the one that actually has to happen first.

While replacing images, rewrite the alt text. Search for `alt="Placeholder`.

## 4. Before/after copy

The before/after block currently says "Most brands are running a supplier photo or a phone
shot on a white background." That is a general claim, not a client story, so it is safe as
written. If you swap in a real client pair and want to say so, say so accurately, and get
the brand's permission first.

## 5. Contact method

Currently three routes, all in the Contact section of `index.html`:

- A Netlify form, posting to the `project` form. It works as soon as the site is deployed on
  Netlify. Turn on form notifications in Netlify → Forms so submissions reach your inbox.
- `hello@wereframe.studio` — **confirm this mailbox exists**, or change it. It appears in the
  contact list, in the form's error message (`assets/js/main.js`) and in the JSON-LD block.
- `@reframe.al` on Instagram.

If you would rather do Instagram DMs only, delete the `.contact__form` block and widen
`.contact__copy`.

## 6. Social preview image

`index.html` has the `og:image` tags commented out. Export a 1200 x 630 JPG of a real
visual to `assets/images/og-cover.jpg` and uncomment them. Until then, links shared to
Instagram, iMessage and Slack will show text only.

Also worth adding: a 180 x 180 `apple-touch-icon.png` at the repo root.

## 7. Case study naming

Not built yet. If you decide to name a brand, the natural home is a short line under the
before/after block. If you keep it unbranded, change nothing.

## 8. Analytics

None installed, deliberately. If you want it, Netlify Analytics is server-side and needs no
script tag, no cookie banner and no performance cost. Anything client-side goes just before
`</body>`.
