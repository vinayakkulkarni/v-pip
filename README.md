# [V-pip 🖼](https://github.com/vinayakkulkarni/v-pip#readme)

<!-- Badges -->

[![Pipeline](https://img.shields.io/github/actions/workflow/status/vinayakkulkarni/v-pip/pipeline.yml?branch=main&logo=github-actions&label=pipeline)](https://github.com/vinayakkulkarni/v-pip/actions/workflows/pipeline.yml)
[![Doctor](https://img.shields.io/badge/doctor-audited-2ea043?logo=vuedotjs&label=doctor)](https://github.com/geoql/doctor)
[![GitHub release](https://img.shields.io/github/v/release/vinayakkulkarni/v-pip?sort=semver&logo=github&label=release)](https://github.com/vinayakkulkarni/v-pip/releases)
[![npm](https://img.shields.io/npm/v/v-pip?logo=npm&label=npm)](https://www.npmjs.com/package/v-pip)
[![JSR](https://img.shields.io/jsr/v/@vinayakkulkarni/v-pip?logo=jsr&label=jsr)](https://jsr.io/@vinayakkulkarni/v-pip)
[![npm downloads](https://img.shields.io/npm/dm/v-pip?logo=npm&label=downloads)](http://npm-stat.com/charts.html?package=v-pip)
[![bundle size](https://img.shields.io/bundlephobia/minzip/v-pip?label=size)](https://bundlephobia.com/package/v-pip@latest)
[![types](https://img.shields.io/npm/types/v-pip?logo=typescript&label=types)](https://github.com/vinayakkulkarni/v-pip/blob/main/package.json)
[![License](https://img.shields.io/github/license/vinayakkulkarni/v-pip?logo=github&label=license)](./LICENSE)

[![vite-plus](https://img.shields.io/github/package-json/dependency-version/vinayakkulkarni/v-pip/dev/vite-plus?logo=vite&label=vite-plus)](https://github.com/voidzero-dev/vite-plus)
[![typescript](https://img.shields.io/github/package-json/dependency-version/vinayakkulkarni/v-pip/dev/typescript?logo=TypeScript&label=typescript)](https://www.typescriptlang.org/)
[![pnpm](https://img.shields.io/github/package-json/packageManager/vinayakkulkarni/v-pip?label=pnpm&logo=pnpm)](https://pnpm.io/)
[![node](https://img.shields.io/node/v/v-pip?logo=node.js&label=node)](https://nodejs.org/)

<!-- End Badges -->

---

## Demo

[![Edit v-pip](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/edit/v-pip?file=src/App.vue)

---

## Features

- Vue 💚 Picture-in-picture!
- Built from scratch using [TypeScript](https://www.typescriptlang.org)

---

### Versions

- For Vue 3.x version – `pnpm add v-pip`
- For Vue 2.x version – `pnpm add v-pip@1`

## Table of Contents

- [V-pip 🖼](#v-pip-)
  - [Demo](#demo)
  - [Features](#features)
    - [Versions](#versions)
  - [Table of Contents](#table-of-contents)
  - [Demo](#demo-1)
  - [Requirements](#requirements)
    - [Installation](#installation)
    - [Build Setup](#build-setup)
  - [Usage](#usage)
    - [Globally](#globally)
      - [As a component](#as-a-component)
      - [As a plugin](#as-a-plugin)
    - [Locally](#locally)
    - [HTML](#html)
    - [JS](#js)
    - [HTML](#html-1)
    - [JS](#js-1)
    - [Props](#props)
    - [Events](#events)
  - [Contributing](#contributing)
  - [Author](#author)
  - [License](#license)

## Demo

[![Edit v-pip demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://bit.ly/v-pip)

## Requirements

- [vue](https://vuejs.org/) `^3.x`

### Installation

```bash
pnpm add v-pip # pnpm add v-pip
```

CDN: [UNPKG](https://unpkg.com/v-pip/dist/) | [jsDelivr](https://cdn.jsdelivr.net/npm/v-pip/dist/) (available as `window.VPip`)

### Build Setup

```bash
# install dependencies
$ pnpm install --frozen-lockfile

# package the library
$ pnpm run build
```

## Usage

### Globally

#### As a component

```javascript
import { VPip } from 'v-pip';
Vue.component('VPip', VPip);
```

#### As a plugin

```javascript
import Vue from 'vue';
import VPip from 'v-pip';

Vue.use(VPip);
```

### Locally

```javascript
import { VPip } from 'v-pip';
```

<details>
<summary>
<em>Example 1 (<a href="examples/App.vue">refer App.vue</a>)</em>
</summary>

### HTML

```html
<v-pip
  :video-options="videoOptions"
  :button-options="buttonOptions"
  @video-in-pip="handlePIP"
  @requesting-pip-failure="handlePipOpenFailure"
  @exiting-pip-failure="handlePipExitFailure"
/>
```

### JS

```javascript
import { VPip } from 'v-pip';

Vue.component('example-component', {
  components: {
    VPip,
  },
  data: () => ({
    isPip: false,
    videoOptions: {
      src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      poster:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
      wrapper: '',
      class: '',
      height: '',
      width: '',
    },
    buttonOptions: {
      wrapper: '',
      type: 'button',
      class: '',
      label: 'Toggle picture-in-picture',
    },
  }),
  methods: {
    handlePIP(e) {
      this.isPip = e;
    },
    handlePipOpenFailure(err) {
      console.log('Video failed to enter Picture-in-Picture mode.', err);
    },
    handlePipExitFailure(err) {
      console.log('Video failed to leave Picture-in-Picture mode.', err);
    },
  },
});
```

</details>

<details>
<summary>
<em>Example 2 (minimal)</em>
</summary>

### HTML

```html
<v-pip :video-options="videoOptions" />
```

### JS

```javascript
import { VPip } from 'v-pip';

Vue.component('example-component', {
  components: {
    VPip,
  },
  data: () => ({
    videoOptions: {
      src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    },
  }),
});
```

</details>

### Props

| Name             | Type   | Required? | Description                                               |
| ---------------- | ------ | --------- | --------------------------------------------------------- |
| `video-options`  | Object | Yes       | The set of options required to setup the V-Pip component. |
| `button-options` | Object | No        | The set of options for the toggle button                  |

### Events

| Name                     | Description                                                              |
| ------------------------ | ------------------------------------------------------------------------ |
| `video-in-pip`           | Emits an `Boolean` whether the Video is in PIP or not                    |
| `requesting-pip-failure` | Emits an `Object` when the video fails to enter Picture-in-Picture mode. |
| `exiting-pip-failure`    | Emits an `Object` when the video fails to leave Picture-in-Picture mode. |

## Contributing

1. Fork it ( [https://github.com/vinayakkulkarni/v-pip/fork](https://github.com/vinayakkulkarni/v-pip/fork) )
2. Create your feature branch (`git checkout -b feat/new-feature`)
3. Commit your changes (`git commit -Sam 'feat: add feature'`)
4. Push to the branch (`git push origin feat/new-feature`)
5. Create a new [Pull Request](https://github.com/vinayakkulkarni/v-pip/compare)

_Note_:

1. Please contribute using [GitHub Flow](https://web.archive.org/web/20191104103724/https://guides.github.com/introduction/flow/)
2. Commits & PRs will be allowed only if the commit messages & PR titles follow the [conventional commit standard](https://www.conventionalcommits.org/), _read more about it [here](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional#type-enum)_
3. PS. Ensure your commits are signed. _[Read why](https://withblue.ink/2020/05/17/how-and-why-to-sign-git-commits.html)_

## Author

**v-pip** &copy; [Vinayak](https://vinayakkulkarni.dev), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Vinayak Kulkarni with help from contributors ([list](https://github.com/vinayakkulkarni/v-pip/contributors)).

> [vinayakkulkarni.dev](https://vinayakkulkarni.dev) · GitHub [@vinayakkulkarni](https://github.com/vinayakkulkarni) · Twitter [@\_vinayak_k](https://twitter.com/_vinayak_k)

## License

[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-pip.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-pip?ref=badge_large)
