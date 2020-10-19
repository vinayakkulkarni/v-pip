# V-Pip 🖼

<a href="http://npmjs.org/package/v-pip"><img src="https://img.shields.io/npm/v/v-pip.svg" alt="npm version"></a> <a href="https://github.com/vinayakkulkarni/v-pip/releases"><img alt="GitHub release (latest by date including pre-releases)" src="https://img.shields.io/github/v/release/vinayakkulkarni/v-pip?include_prereleases"></a> <a href="https://bundlephobia.com/result?p=v-pip"><img alt="npm bundle size" src="https://img.shields.io/bundlephobia/minzip/v-pip"></a> <a href="http://npm-stat.com/charts.html?package=v-pip"><img src="https://img.shields.io/npm/dm/v-pip.svg" alt="npm downloads"></a> <a href="https://github.com/vinayakkulkarni/v-pip/actions?query=workflow%3A%22Ship+js+trigger%22"><img alt="GitHub Workflow Status" src="https://img.shields.io/github/workflow/status/vinayakkulkarni/v-pip/Ship js trigger"></a> <a href="https://app.fossa.io/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-pip?ref=badge_shield" alt="FOSSA Status"><img src="https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-pip.svg?type=shield"/></a> <a href="https://david-dm.org/vinayakkulkarni/v-pip?type=dev" title="devDependencies status"><img src="https://david-dm.org/vinayakkulkarni/v-pip/dev-status.svg"/></a> <a href="https://github.com/vinayakkulkarni/janak" title="Built using Janak"><img alt="Janak Logo" src="https://img.shields.io/badge/built%20using-janak-brightgreen"/></a>

---

* Vue 💚Picture-in-picture!

* This is [on GitHub](https://github.com/vinayakkulkarni/v-pip) so let me know if I've b0rked it somewhere, give me a star :star: if you like it :beers:

* Demo here -> [💯 Codesandbox Link](http://bit.ly/v-pip)

## Requirements

* [Vue.js](https://vuejs.org/) 2.x

## Installation

```bash
npm install v-pip # yarn add v-pip
```

CDN: [UNPKG](https://unpkg.com/v-pip/dist/) | [jsDelivr](https://cdn.jsdelivr.net/npm/v-pip/dist/) (available as `window.VPip`)

## Usage

Register the component globally:

```javascript
Vue.component('VPip', require('v-pip'));
```

Or use locally

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
      wrapper: '',
      src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      poster: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg',
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

| Name            | Type   | Required? | Description                                                 |
| --------------  | ------ | --------- | ----------------------------------------------------------- |
| `video-options`     | Object | Yes        | The set of options required to setup the V-Pip component. defaults: [L32-L42](src/VPip.vue#L35-L42)    |
| `button-options` | Object | No        | The set of options for the toggle button defaults: [L48-L53](src/VPip.vue#L48-L53) |

### Events

| Name                 | Description                                                                 |
| -------------------- | --------------------------------------------------------------------------- |
| `video-in-pip` | Emits an `Boolean` whether the Video is in PIP or not |
| `requesting-pip-failure` | Emits an `Object` when the video fails to enter Picture-in-Picture mode. |
| `exiting-pip-failure` | Emits an `Object` when the video fails to leave Picture-in-Picture mode. |

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request :D

## Author

**v-pip** © [Vinayak](https://github.com/vinayakkulkarni), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Vinayak Kulkarni with help from contributors ([list](https://github.com/vinayakkulkarni/v-pip/contributors)).

> [vinayakkulkarni.dev](https://vinayakkulkarni.dev) · GitHub [@vinayakkulkarni](https://github.com/vinayakkulkarni) · Twitter [@\_vinayak_k](https://twitter.com/_vinayak_k)


## License
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-pip.svg?type=large)](https://app.fossa.io/projects/git%2Bgithub.com%2Fvinayakkulkarni%2Fv-pip?ref=badge_large)