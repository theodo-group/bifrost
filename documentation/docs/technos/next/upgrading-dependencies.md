---
sidebar_position: 8
---

# Upgrading Dependencies

`yarn outdated` to see your out of date dependencies

`yarn upgrade` to automatically upgrade your dependencies to the latest version based on the range defined in your package.json file

`yarn upgrade-interactive` lets you choose which packages dependencies to upgrade to the latest version based on the range defined in your package.json file

> ^version “Compatible with version”, will update you to all future minor/patch versions, without incrementing the major version e.g. ^2.3.4 will use releases from 2.3.4 to <3.0.0. (more info on this [here](https://stackoverflow.com/a/22345808))

`yarn add {dependency}@latest` to upgrade dependency to the latest version e.g.`yarn add next@latest`

`yarn add {dependency}@x.x.x` to upgrade depenedency to specific version e.g. `yarn add next@9.4.4`
