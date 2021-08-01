import { App } from 'vue';
import VPip from './VPip.vue';

let installed = false;

const install = {
  install(app: App): void {
    if (installed) return;
    app.component('VPip', VPip);
    installed = true;
  },
};

export default install;
