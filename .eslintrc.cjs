module.exports = {
  root: true,
  overrides: [{
    files: [ './**/*.{ts,vue}' ]
  }],
  env: {
    browser: true
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: "@typescript-eslint/parser",
    sourceType: 'module',
    project: true,
    tsconfigRootDir: __dirname,
    extraFileExtensions: [ '.vue' ],
    vueFeatures: {
      interpolationAsNonHTML: false
    }
  },
  plugins: [ '@typescript-eslint' ],
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
  ],
  rules: {
    '@typescript-eslint/no-unsafe-argument': 'off',
    indent: [ 'error', 2 ],
    'max-len': [ 'error', {
      code: 80,
      tabWidth: 2
    }],
    'vue/block-order': ['warn', {
      order: [ 'template', 'style', 'script' ]
    }],
    'vue/component-tags-order': 'off',
    'vue/html-closing-bracket-spacing': 'error',
    'vue/html-indent': 'error',    
    'vue/max-attributes-per-line': ['warn', {
      singleline: { max: 12 },
      multiline: { max: 1 }
    }],
    'vue/multi-word-component-names': 'off',    
  }
}
