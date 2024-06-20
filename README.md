<div align="center">
  <img
  width="200px"
  src="https://github.com/creazy231/strapi-plugin-raw-query/blob/main/logo-transparent-cropped.png?raw=true" />

  <h1>Strapi Plugin: Raw Query</h1>

  <p style="margin-top: 0;">Raw Query allows you to send raw query strings to the database within <a href="https://github.com/strapi/strapi">
    Strapi CMS
  </a> backend. That's it 🤷🏻‍♂️</p>

  <p>
    <a href="https://github.com/creazy231/strapi-plugin-raw-query/graphs/commit-activity">
      <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" alt="Maintenance" />
    </a>
    <a href="https://github.com/creazy231">
      <img src="https://img.shields.io/badge/maintainer-creazy231-blue" alt="Maintainer" />
    </a>
    <a href="https://github.com/creazy231/strapi-plugin-raw-query/releases/">
      <img src="https://img.shields.io/github/release/creazy231/strapi-plugin-raw-query.svg" alt="GitHub release" />
    </a>
    <a href="https://www.npmjs.org/package/strapi-plugin-raw-query">
      <img src="https://img.shields.io/npm/v/strapi-plugin-raw-query" alt="NPM release" />
    </a>
    <a href="https://GitHub.com/creazy231/strapi-plugin-raw-query/releases/">
      <img src="https://img.shields.io/npm/dt/strapi-plugin-raw-query" alt="Github all releases" />
    </a>
    <a href="https://ko-fi.com/creazy231">
      <img alt="Support me on Ko-fi" src="https://img.shields.io/badge/Support_me-on_Ko--fi_☕-43D7AA">
    </a>
    <a href="https://GitHub.com/creazy231/strapi-plugin-raw-query/network/">
      <img src="https://img.shields.io/github/forks/creazy231/strapi-plugin-raw-query.svg?style=social&label=Fork&maxAge=2592000" alt="GitHub forks" />
    </a>
    <a href="https://GitHub.com/creazy231/strapi-plugin-raw-query/stargazers/">
      <img src="https://img.shields.io/github/stars/creazy231/strapi-plugin-raw-query.svg?style=social&label=Star&maxAge=2592000" alt="GitHub stars" />
    </a>
    <a href="https://GitHub.com/creazy231/strapi-plugin-raw-query/watchers/">
      <img src="https://img.shields.io/github/watchers/creazy231/strapi-plugin-raw-query.svg?style=social&label=Watch&maxAge=2592000" alt="GitHub watchers" />
    </a>
  </p>
</div>

<img src="https://raw.githubusercontent.com/creazy231/strapi-plugin-raw-query/main/public/assets/preview.jpeg" alt="Strapi Plugin - Raw Query" />


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

- Enable the plugin

```js
// config/plugins.js

module.exports = {
  'raw-query': {
    enabled: true,
  },
  // ...
}

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


# 🏚 Strapi v3 Support
For Strapi v3, you can install the plugin using the following command and continue with the installation:
```bash
yarn add strapi-plugin-raw-query@0.0.3

# or

npm i strapi-plugin-raw-query@0.0.3
```

## 🖐 Requirements

**Supported Strapi versions**:

- Strapi: >= 4.x.x


**Supported Node / NPM versions**:
- Node: >= 12.x.x <= 20.x.x
- NPM: >= 6.0.0


_We recommend always using the latest version of Strapi to start your new projects_.

## 🤝 Contributing

Feel free to fork and make a Pull Request to this plugin project. All the input is warmly welcome!

## ⭐️ Show your support

Give a star if this project helped you.

<a href="https://ko-fi.com/creazy231">
  <img width="270px" src="https://storage.ko-fi.com/cdn/brandasset/kofi_button_stroke.png" alt="Support me on Ko-fi">
</a>

## 🔗 Links

- [NPM package](https://www.npmjs.com/package/strapi-plugin-raw-query)
- [GitHub repository](https://github.com/creazy231/strapi-plugin-raw-query)

## 📝 License

MIT License Copyright (c) 2024 creazy231


[![ForTheBadge built-with-love](http://ForTheBadge.com/images/badges/built-with-love.svg)](https://GitHub.com/creazy231/)
