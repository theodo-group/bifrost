---
sidebar_position: 4
---

# Styling options

The recommendation is to use a single css system, now we recommend:

-   css module, the default css integration of nextjs (bifrost ship with this)
    -   Even if using simple css, it's highly recommended to use a stylesheet with css vars.
    -   If you have complex style ahead of you you might want the flexibility of using a css in js lib.
-   styled-component is a simple css in js lib, used a lot at theodo it's fast and powerful:
    -   Easy to install on nextjs, [see the corresponding doc about enabling it](https://nextjs.org/docs/advanced-features/compiler#styled-components) and [official example](https://github.com/vercel/next.js/tree/canary/examples/with-styled-components)
-   Tailwind css is the most well known atomic css implementation
    -   [dedicated example on tailwind css setup](https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss)
