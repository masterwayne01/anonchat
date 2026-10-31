/* ==========================================================================
   [INSERT FOOD CONTENT]
   Edit this file to change the Taste menu — no HTML needed.

   Each group  : { title, items: [...] }
   Each item   : {
     name   : string            — dish name
     desc   : string            — one short line
     price  : string            — shown as written, e.g. "€12" or "12"
     img    : string            — path under /assets/food (JPG/WebP recommended, ~1200×900)
     alt    : string            — describe the photo for screen readers
     tag    : string (optional) — small label on the photo, e.g. "New"
     accent : "green" | "purple" (optional) — tag dot colour, defaults to green
   }
   ========================================================================== */
window.PINKOIL_MENU = [
  {
    title: "[INSERT CATEGORY — e.g. Plates]",
    items: [
      { name: "[INSERT DISH 01]", desc: "[Short description — ingredients, mood.]", price: "[00]", img: "assets/food/dish-01.svg", alt: "[INSERT ALT]", tag: "New" },
      { name: "[INSERT DISH 02]", desc: "[Short description — ingredients, mood.]", price: "[00]", img: "assets/food/dish-02.svg", alt: "[INSERT ALT]" },
      { name: "[INSERT DISH 03]", desc: "[Short description — ingredients, mood.]", price: "[00]", img: "assets/food/dish-03.svg", alt: "[INSERT ALT]", tag: "Signature", accent: "purple" }
    ]
  },
  {
    title: "[INSERT CATEGORY — e.g. Sweet & Drinks]",
    items: [
      { name: "[INSERT DISH 04]", desc: "[Short description — ingredients, mood.]", price: "[00]", img: "assets/food/dish-04.svg", alt: "[INSERT ALT]" },
      { name: "[INSERT DISH 05]", desc: "[Short description — ingredients, mood.]", price: "[00]", img: "assets/food/dish-05.svg", alt: "[INSERT ALT]" },
      { name: "[INSERT DISH 06]", desc: "[Short description — ingredients, mood.]", price: "[00]", img: "assets/food/dish-06.svg", alt: "[INSERT ALT]", tag: "Seasonal" }
    ]
  }
];
