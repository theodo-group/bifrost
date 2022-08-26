---
sidebar_position: 7
---

# Dependency security auditing

`yarn audit` to see if your application has any dependencies with known vulnerabilities

In most situations, upgrading the dependencies will be enough to ensure you have no vulnerabilities. If you're not sure how to do that, see the [Upgrading Dependencies](./docs/upgrading-dependencies) docs.

> "But what if that's not enough? My dependency's dependency has a high vulnerability and they're not patching it, what can I do?!"

Don't panic, we can set the acceptable version ranges for the dependency of the dependency using the `"resolutions"` key in `package.json` (see [docs](https://classic.yarnpkg.com/en/docs/package-json#toc-resolutions)). We've had to do this for a couple of libraries:

```javascript
// package.json
...
  "resolutions": {
    "bl": "^4.0.3",
    "node-fetch": "^2.6.1"
  }
...
```

> "Cool, so how do I know what version I am using right now?"

`yarn list {dependency}` will tell you what versions of the dependency you are using in your app e.g. `yarn list bl`.

> "How do I know which version I need to set in resolutions?"

And when you run `yarn audit` it will tell you which version the dependency is patched in!
