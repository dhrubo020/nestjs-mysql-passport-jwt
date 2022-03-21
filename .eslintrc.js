module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion:12,
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    es2021: true,
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    indent: ['error', 'tab'],
    'linebreak-style':['error','windows'],
    quotes:['error','singleb'],
    semi:['error','always']
  },
};
