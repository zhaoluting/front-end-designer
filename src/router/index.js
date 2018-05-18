import Vue from 'vue';
import Router from 'vue-router';
import HomePage from '@/views/homePage/index';
import Login from '@/views/login/index';
import ColorPage from '@/views/colorPage/index';
import PersonPage from '@/views/personPage/index';
import designerPage from '@/views/designerPage/index';
import previewMobile from '@/views/designerPage/components/preview_mobile';
import previewProduct from '@/views/designerPage/components/preview_product';

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
      path: '/colorPage',
      name: 'colorPage',
      component: ColorPage,
    },
    {
      path: '/personPage',
      name: 'personPage',
      component: PersonPage,
    },
    {
      path: '/designerPage',
      name: 'designerPage',
      component: designerPage,
    },
    {
      path: '*',
      redirect: '/', // 输入其他不存在的地址自动跳回首页
    },
    {
      path: '/preview/mobile', // 手机预览
      name: 'preview_mobile',
      component: previewMobile,
    },
    {
      path: '/preview/pc', // 手机预览
      name: 'preview_product',
      component: previewProduct,
    },
  ],
});
