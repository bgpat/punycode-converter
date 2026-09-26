import Vue from 'vue/dist/vue.esm';
import AppRoot from './AppRoot';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  components: { AppRoot },
  template: '<AppRoot/>',
});

module.hot && module.hot.accept();
