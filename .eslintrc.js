module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:vue/essential', 'standard'],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser'
  },
  plugins: ['vue', '@typescript-eslint'],
  rules: {
    'space-before-function-paren': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-multiple-template-root': 'off',
    'vue/no-v-model-argument': 'off',
    camelcase: 'off'
  }
}
