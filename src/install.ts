import { App as Application, Plugin } from 'vue';
import VPip from './components/VPip.vue';
import { setVueInstance } from './utils/config/index';

let installed = false;

const install: Exclude<Plugin['install'], undefined> = (app: Application) => {
  if (!installed) {
    setVueInstance(app);
    app.component('VPip', VPip);
    installed = true;
  }
};

export default install;
