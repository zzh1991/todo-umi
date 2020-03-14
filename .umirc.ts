import { defineConfig } from 'umi';

export default defineConfig({
  layout: {
    "logo": "https://i.loli.net/2020/03/14/8dOlI1aDeQngbA2.png",
    "navTheme": "realDark",
    "primaryColor": "#1890ff",
    "layout": "topmenu",
    "contentWidth": "Fluid",
    "fixedHeader": true,
    "autoHideHeader": false,
    "fixSiderbar": false,
    "menu": {
      "locale": true,
    },
    "title": "Todo Manager",
    "pwa": false,
    "iconfontUrl": ""
  },
  links: [
    { rel: 'icon', href: 'https://i.loli.net/2020/03/14/8dOlI1aDeQngbA2.png' },
  ],
  locale: { antd: true },
  routes: [
    { path: '/', icon: 'calendar', name : 'Todo' , component: '@/pages/index' },
    { path: '/completed', icon: 'check', name : 'Completed' , component: '@/pages/completed' },
    { path: '/deleted', icon: 'delete', name : 'Deleted' , component: '@/pages/deleted' },
  ],
});
