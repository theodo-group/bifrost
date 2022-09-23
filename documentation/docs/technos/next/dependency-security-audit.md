---
sidebar_position: 8
---

# Dependency security auditing

`pnpm audit` to see if your application has any dependencies with known vulnerabilities

In most situations, upgrading the dependencies will be enough to ensure you have no vulnerabilities. If you're not sure how to do that, see the [Upgrading Dependencies](./upgrading-dependencies) docs.

> "But what if that's not enough? My dependency's dependency has a high vulnerability and they're not patching it, what can I do?!"

Don't panic, we can set the acceptable version ranges for the dependency of the dependency using the `"overrides"` key in `package.json` (see [pnpm overrides docs](https://pnpm.io/package_json#pnpmoverrides)).

```javascript
// package.json
...
  "pnpm": {
    "overrides": {
      "foo": "^1.0.0",
      "quux": "npm:@myorg/quux@^1.0.0",
      "bar@^2.1.0": "3.0.0",
      "qar@1>zoo": "2"
    }
  }
...
```

> "Cool, so how do I know what version I am using right now?"

`pnpm list {dependency}` will tell you what versions of the dependency you are using in your app e.g. `pnpm list next`.

> "How do I which version I need to set in resolutions?"

Running `pnpm audit` will tell you the recommended patched version.

## Adding a dependency

If you want to add a new dependency, I recommend checking its maintenance/security/popularity score on [Snyk advisor](https://snyk.io/advisor/)
