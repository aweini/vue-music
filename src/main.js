import 'babel-polyfill';
import Vue from 'vue';
import App from './App';
import router from './router';
import './common/style/index.scss';
import fastclick from 'fastclick';
import VueLazyload from 'vue-lazyload';
// 千万别忘了在index文件引入store
import store from './store';

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
  store,
  render: h => h(App)
})
