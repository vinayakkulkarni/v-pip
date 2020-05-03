# V-Pip 🖼

<center><a href="http://npmjs.org/package/v-pip"><img src="https://img.shields.io/npm/v/v-pip.svg" alt="npm version"></a> <a href="https://github.com/vinayakkulkarni/v-pip/releases/latest"><img src="http://img.badgesize.io/vinayakkulkarni/v-pip/master/dist/v-pip.min.js?compression=gzip" alt="gzip size"></a> <a href="http://npm-stat.com/charts.html?package=v-pip"><img src="https://img.shields.io/npm/dm/v-pip.svg" alt="npm downloads"></a></center>

---

* Vue 💚Picture-in-picture!

* This is [on GitHub](https://github.com/vinayakkulkarni/v-pip) so let me know if I've b0rked it somewhere, give me a star :star: if you like it :beers:

* Demo here -> [💯 Codesandbox Link](http://bit.ly/v-pip)

## Requirements

* [Vue.js](https://vuejs.org/) 2.x

## Installation

```bash
npm install v-pip
# or
yarn add v-pip
```

CDN: [UNPKG](https://unpkg.com/v-pip/dist/) | [jsDelivr](https://cdn.jsdelivr.net/npm/v-pip/dist/) (available as `window.VPip`)

## Usage

Register the component globally:

```javascript
Vue.component('VPip', require('v-pip'));
```

Or use locally

```javascript
import VPip from 'v-pip';
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
import VPip from 'v-pip';

Vue.component('example-component', {
  components: {
    VPip,
  },
  data: () => ({
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
import VPip from 'v-pip';

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
| `video-options`     | Object | Yes        | The set of options required to setup the V-Pip component. defaults: [L22-L28](src/VPip.vue#L22-L28)    |
| `button-options` | Object | No        | The set of options for the toggle button defaults: [L29-L34](src/VPip.vue#L29-L34) |

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
