---
sidebar_position: 6
---

# Upgrading Dependencies

`pnpm outdated` to see your out of date dependencies

`pnpm update` to automatically upgrade your dependencies to the latest version based on the range defined in your package.json file

`pnpm update --interactive` lets you choose which packages dependencies to upgrade to the latest version based on the range defined in your package.json file

> ^version “Compatible with version”, will update you to all future minor/patch versions, without incrementing the major version e.g. ^2.3.4 will use releases from 2.3.4 to <3.0.0. (more info on this [here](https://stackoverflow.com/a/22345808))

`pnpm add {dependency}@latest` to upgrade dependency to the latest version e.g.`pnpm add next@latest`

`pnpm add {dependency}@x.x.x` to upgrade dependency to specific version e.g. `pnpm add next@9.4.4`
