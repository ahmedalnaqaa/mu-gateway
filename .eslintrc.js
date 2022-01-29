module.exports = {
  env: {
    es6: true,
    node: true,
    browser: true,
    worker: true,
    jest: true,
  },
  extends: 'eslint:recommended',
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    _DEV_: 'readonly',
    firebase: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },

  rules: {
    'no-unused-vars': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'no-console': 0,
  },
};
