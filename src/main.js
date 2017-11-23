import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import './common/style/index.scss';
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
Vue.config.productionTip = false;
// body下的元素的点击就会没有300ms延迟
fastclick.attach(document.body);
Vue.use(VueLazyload, {
  loading: require('./common/image/cat.jpeg')
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
