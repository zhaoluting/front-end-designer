// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import iView from 'iview';
import MuseUI from 'muse-ui';
import mint from 'mint-ui';
import VueHighlightJS from 'vue-highlightjs';
import pretty from 'pretty';
import Axios from 'axios';
import 'iview/dist/styles/iview.css'; // 使用 CSS
import './assets/css/common.less';
import App from './App';
import router from './router/index';
import store from './router/store.js';

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('demo-token');
  if (to.path === '/login') { // 如果是跳转到登录页的
    if (token !== 'null' && token !== null) next('/'); // 如果有token就转向todolist不返回登录页
    else next();
  } else {
    console.log('token:', token);
    if (token !== 'null' && token !== null) {
      Vue.prototype.$http.defaults.headers.common.Authorization = `Bearer ${token}`; // 全局设定header的token验证，注意Bearer后有个空格
      next(); // 如果有token就正常转向
    } else next('/login'); // 否则跳转回登录页
  }
});

Vue.config.productionTip = false;
Vue.use(iView);
Vue.use(MuseUI);
Vue.use(mint);
Vue.prototype.$http = Axios; // 类似于vue-resource的调用方法，之后可以在实例里直接用this.$http.get()等


// 为代码文本提供高亮、缩进
Vue.use(VueHighlightJS);
// 为代码文本格式化
Vue.prototype.$prettyDom = pretty;

/* eslint-disable no-new */
window.myVue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
