import type { App as Application, Plugin } from 'vue';
import VPip from './components/VPip.vue';

let installed = false;

const install: Exclude<Plugin['install'], undefined> = (app: Application) => {
  if (!installed) {
    app.component('VPip', VPip);
    installed = true;
  }
};

export default install;
