module.exports = {
  env: { browser: true, es2020: true },
  extends: [
    "react",
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    "plugin:react/recommended",
    "prettier"
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: { sourceType: 'module' },
  plugins: ['react-refresh'],
  rules: {
    "react/react-in-jsx-scope": "off",
    'react-refresh/only-export-components': 'warn',
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
