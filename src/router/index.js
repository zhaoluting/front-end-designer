import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/views/homePage/index';
import Login from '@/views/login/index';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'homePage',
      component: HomePage,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '*',
      redirect: '/', // 输入其他不存在的地址自动跳回首页
    },
  ],
});
