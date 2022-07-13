import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// AntDesignVueResolver
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// WindiCSS
import WindiCSS from 'vite-plugin-windicss'
// ESLint
import eslintPlugin from 'vite-plugin-eslint'

import importToCDN from 'vite-plugin-cdn-import'
import vueSetupExtend from 'vite-plugin-vue-setup-extend-plus'

import themePreprocessorPlugin from '@zougt/vite-plugin-theme-preprocessor'

const { resolve } = require('path')

export default defineConfig({
  publicDir: 'public',
  base: './',
  plugins: [
    vue(),
    WindiCSS(),
    vueSetupExtend(),
    eslintPlugin({
      exclude: ['./node_modules', './dist'],
      cache: false
    }),
    Components({
      resolvers: [AntDesignVueResolver()],
      directoryAsNamespace: true
    }),
    themePreprocessorPlugin({
      less: {
        multipleScopeVars: [
          {
            scopeName: 'theme-default',
            path: resolve('src/theme/default.less')
          },
          { scopeName: 'theme-dark', path: resolve('src/theme/dark.less') }
        ],
        defaultScopeName: 'theme-default',
        extract: false
      }
    }),
    importToCDN({
      modules: [
        {
          name: 'vue',
          var: 'Vue',
          path: 'https://unpkg.com/vue@3.2.25'
        },
        {
          name: 'vuex',
          var: 'Vuex',
          path: 'https://unpkg.com/vuex@4.0.0'
        },
        {
          name: 'vue-router',
          var: 'VueRouter',
          path: 'https://unpkg.com/vue-router@4.0.14'
        },
        {
          name: 'axios',
          var: 'axios',
          path: 'https://unpkg.com/axios@0.26.1'
        }
      ]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  assetsInclude: '',
  logLevel: 'info',
  clearScreen: true,
  server: {
    hmr: { overlay: false }
  },
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }],
    conditions: [],
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
  },
  build: {
    target: 'modules',
    outDir: 'dist',
    assetsDir: 'assets',
    assetsInlineLimit: 4096,
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {},
    commonjsOptions: {},
    manifest: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    write: true,
    emptyOutDir: true,
    brotliSize: true,
    chunkSizeWarningLimit: 500
  }
})
