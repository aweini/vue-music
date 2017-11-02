import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import './common/style/index.scss';
import fastclick from 'fastclick';
Vue.config.productionTip = false;
// body下的元素的点击就会没有300ms延迟
fastclick.attach(document.body);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
