import Vue from 'vue/dist/vue.esm';
import App from './App';

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
});

module.hot && module.hot.accept();
