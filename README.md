# Strapi Plugin - Raw Query

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/creazy231/strapi-plugin-raw-query/graphs/commit-activity)
[![Maintaner](https://img.shields.io/badge/maintainer-creazy231-blue)](https://github.com/creazy231)
[![GitHub release](https://img.shields.io/github/release/creazy231/strapi-plugin-raw-query.svg)](https://github.com/creazy231/strapi-plugin-raw-query/releases/)
[![GitHub release](https://img.shields.io/npm/v/strapi-plugin-raw-query.svg)](https://www.npmjs.org/package/strapi-plugin-raw-query)
[![Github all releases](https://img.shields.io/github/downloads/creazy231/strapi-plugin-raw-query/total.svg)](https://GitHub.com/creazy231/strapi-plugin-raw-query/releases/)
[![GitHub forks](https://img.shields.io/github/forks/creazy231/strapi-plugin-raw-query.svg?style=social&label=Fork&maxAge=2592000)](https://GitHub.com/creazy231/strapi-plugin-raw-query/network/)
[![GitHub stars](https://img.shields.io/github/stars/creazy231/strapi-plugin-raw-query.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/creazy231/strapi-plugin-raw-query/stargazers/)
[![GitHub watchers](https://img.shields.io/github/watchers/creazy231/strapi-plugin-raw-query.svg?style=social&label=Watch&maxAge=2592000)](https://GitHub.com/creazy231/strapi-plugin-raw-query/watchers/)

Raw Query allows you to send raw query strings to the database within [Strapi CMS](https://github.com/strapi/strapi) backend. That's it 🤷🏻‍♂️

<img src="https://raw.githubusercontent.com/creazy231/strapi-plugin-raw-query/main/public/assets/preview.png" alt="Strapi Plugin - Raw Query" />


# 🚀 Strapi v4
For Strapi v4 use this branch: [beta-v4](https://github.com/creazy231/strapi-plugin-raw-query/tree/beta-v4)

## ⏳ Installation
Install Strapi with this **Quickstart** command to create a Strapi project instantly:

- Use **yarn** to initialize a new Strapi project (recommended). [How to install yarn](https://yarnpkg.com/lang/en/docs/install/)

```bash
# with yarn
yarn create strapi-app my-project --quickstart

# with npm/npx
npx create-strapi-app my-project --quickstart
```

_This command generates a brand new project with the default features (authentication, permissions, content management, content type builder & file upload). The **Quickstart** command installs Strapi using a **SQLite** database which is used for prototyping in development._

---

- Add the `strapi-plugin-raw-query` plugin

```bash
yarn add strapi-plugin-raw-query@latest

# or

npm i strapi-plugin-raw-query@latest
```

- After successful installation you've to build a fresh package of the Strapi backend:

```bash
yarn build && yarn develop

# or

npm run build && npm run develop
```

- or just run Strapi in the development mode with `--watch-admin` option:

```bash
yarn develop --watch-admin

#or

npm run develop --watch-admin
```

The **Raw Query** plugin should appear in the Plugins section of Strapi sidebar after you run app again.

## 🖐 Requirements

**Supported Strapi versions**:

- Strapi v3.6.x

_This plugin may work with the older Strapi versions, but these are not tested nor officially supported at this time._

**Node / NPM versions**:

- NodeJS >=10.16.0 <=14.x.x
- NPM >=6.0.0

**We recommend always using the latest version of Strapi to start your new projects**.

## 🤝 Contributing

Feel free to fork and make a Pull Request to this plugin project. All the input is warmly welcome!

## ⭐️ Show your support

Give a star if this project helped you.

## 🔗 Links

- [NPM package](https://www.npmjs.com/package/strapi-plugin-raw-query)
- [GitHub repository](https://github.com/creazy231/strapi-plugin-raw-query)

## 📝 License

[MIT License](LICENSE.md) Copyright (c) 2021 [Tobias Thiele](https://tobias-thiele.de/).

[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://GitHub.com/creazy231/)
