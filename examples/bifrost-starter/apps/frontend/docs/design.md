# 🏞 Design

## Styling options

The recommendation is to use a single css system, now we recommend:

-   css module, the default css integration of nextjs (bifrost ship with this)
    -   Even if using simple css, it's highly recommended to use a stylesheet with css vars.
    -   If you have complex style ahead of you you might want the flexibility of using a css in js lib.
-   styled-component is a simple css in js lib, used a lot at theodo it's fast and powerful:
    -   Easy to install on nextjs, [see the corresponding doc about enabling it](https://nextjs.org/docs/advanced-features/compiler#styled-components) and [official example](https://github.com/vercel/next.js/tree/canary/examples/with-styled-components)
-   Tailwind css is the most well known atomic css implementation
    -   [dedicated example on tailwind css setup](https://github.com/vercel/next.js/tree/canary/examples/with-tailwindcss)

## 💠 CSS

### 🌀 Reset

There is a [`css reset file`](../styles/global.css) file that removes basic style attached to tags. The file is based on [josh Comeau's example](https://www.joshwcomeau.com/css/custom-css-reset/).

### 🌈 Stylesheet

[`stylesheet.css`](../styles/stylesheet.css) is where you should declare all style properties used on this app.

-   colors
-   font properties (size, font-faimly, boldness, line height)
-   spacing measurement unit (ex: all margin, padding must be multiple of 8px)
-   screen size breakpoints
-   shades
-   ...

This way, you can manage the app look and feel from one file instead of several, and preserve consistency.

### 🔍 Linter

The [`style linter`](../stylelint.config.js) will help checking that you don't use hard-coded values in your components. Adapt the config to your needs.
