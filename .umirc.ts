import { defineConfig } from 'umi';

export default defineConfig({
  layout: {
    logo: 'https://i.loli.net/2020/03/14/8dOlI1aDeQngbA2.png',
    navTheme: 'realDark',
    primaryColor: '#1890ff',
    layout: 'topmenu',
    contentWidth: 'Fluid',
    fixedHeader: true,
    autoHideHeader: false,
    fixSiderbar: false,
    menu: {
      locale: true,
    },
    title: 'Todo Manager',
    pwa: false,
    iconfontUrl: '',
  },
  links: [
    { rel: 'icon', href: 'https://i.loli.net/2020/03/14/8dOlI1aDeQngbA2.png' },
  ],
  locale: { antd: true },
  routes: [
    { exact: true, path: '/', redirect: '/todo' },
    {
      exact: true,
      path: '/todo',
      icon: 'calendar',
      name: 'Todo',
      component: '@/pages/index',
    },
    {
      exact: true,
      path: '/completed',
      icon: 'check',
      name: 'Completed',
      component: '@/pages/completed',
    },
    {
      exact: true,
      path: '/deleted',
      icon: 'delete',
      name: 'Deleted',
      component: '@/pages/deleted',
    },
  ],
  antd: {
    dark: true,
  },
});
