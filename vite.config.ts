import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// AntDesignVueResolver
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// WindiCSS
import WindiCSS from 'vite-plugin-windicss'
// ESLint
import eslintPlugin from 'vite-plugin-eslint'

const { resolve } = require('path')

export default defineConfig({
  publicDir: 'public',
  base: './',
  plugins: [
    vue(),
    WindiCSS(),
    eslintPlugin({
      exclude: ['./node_modules', './dist'],
      cache: false
    }),
    Components({
      resolvers: [AntDesignVueResolver()]
    })
  ],
  assetsInclude: '',
  logLevel: 'info',
  clearScreen: true,
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
    terserOptions: {},
    write: true,
    emptyOutDir: true,
    brotliSize: true,
    chunkSizeWarningLimit: 500
  }
})
