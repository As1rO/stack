const path = require('path')

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  plugins: ['prettier'],
  settings: {
    'import/resolver': {
      alias: {
        map: [['~', path.resolve(__dirname)]],
        extensions: ['.js', '.vue'],
      },
    },
  },
}
