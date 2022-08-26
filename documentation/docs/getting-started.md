---
sidebar_position: 2
title: "Getting Started"
---

## 📦 Installing

These instructions will get you a copy of the latest version of forge on your local machine.

### Prerequisites

-   [Install fnm](https://github.com/Schniz/fnm#installation) (node version manager)
-   [Node 16+](https://nodejs.org/en/) `fnm install lts/gallium`
-   [Yarn](https://yarnpkg.com/fr/) (`npm install -g yarn`)

**For Django**

-   [`poetry`][poetry]
-   [`python3.10`][python3.10]

**For Elastic Beanstalk**

-   [`terraform`][terraform]

### Installing

Clone this repository:

```bash
git clone git@github.com:theodo/forge.git
cd forge
```

You're done! 🎉

## 🔧 Generating a new project

Navigate to your copy of seed and make sure it is up to date:

```bash
cd /path/to/forge
yarn install
git pull
```

Run:

```bash
make generate
```

> Do you encounter _any_ problem? Check the [troubleshooting section](#troubleshooting)

You're done! 🎉

## 🏃‍Running the generated project

**Follow the `README` of the generated project.** 😉

## 📝 License

[MIT](../../.docs/LICENSE)

[poetry]: https://python-poetry.org/docs/
[python3.10]: https://www.notion.so/m33/Install-Python-31f3c8495a5d43aebf7845fcb3b9ce79
[terraform]: https://www.terraform.io/downloads.html
[yarn]: https://yarnpkg.com/en/docs/install#mac-stable
