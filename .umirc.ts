import { defineConfig } from 'umi';
const CompressionPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;
// const BundleAnalyzerPlugin = require("umi-webpack-bundle-analyzer").BundleAnalyzerPlugin;

export default defineConfig({
  history: {
    type: 'hash',
  },
  ignoreMomentLocale: true,
  dynamicImport: {},
  chunks: ['vendors', 'umi'],
  links: [
    { rel: 'icon', href: 'https://i.loli.net/2020/03/14/8dOlI1aDeQngbA2.png' },
  ],
  locale: { antd: true, default: 'en-US' },
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
  chainWebpack(config, { webpack }) {
    config.plugin('CompressionPlugin').use(
      new CompressionPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: productionGzipExtensions,
        threshold: 10240,
        minRatio: 0.8,
        deleteOriginalAssets: false,
      }),
    );
    // config.plugin("umi-webpack-bundle-analyzer").use(new BundleAnalyzerPlugin());
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'all',
          minSize: 30000,
          minChunks: 3,
          automaticNameDelimiter: '.',
          cacheGroups: {
            vendor: {
              name: 'vendors',
              test({ resource }) {
                return /[\\/]node_modules[\\/]/.test(resource);
              },
              priority: 10,
            },
          },
        },
      },
    });
  },
});
