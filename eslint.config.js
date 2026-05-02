const js = require('@eslint/js')
const react = require('eslint-plugin-react')
const jest = require('eslint-plugin-jest')
const globals = require('globals')

module.exports = [
  {
    ignores: [
      'webpack.config.js',
      'eslint.config.js',
      '.eslintrc.js',
      'node_modules/**',
      'dist/**',
      'playwright.config.js'
    ]
  },
  js.configs.recommended,
  {
    files: ['index.js', 'server/**/*.js', 'e2e-tests/**/*.js', 'jest.setup.js', 'tests/**/*.js'],
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'commonjs',
      globals: {
        ...globals.node
      }
    },
    rules: {
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-console': 0,
      'no-unused-vars': 'warn',
    }
  },
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: {
      react,
      jest
    },
    languageOptions: {
      ecmaVersion: 2018,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        ...globals.browser,
        ...globals.es6,
        ...globals.jest,
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      ...react.configs.recommended.rules,
      'indent': ['error', 2],
      'linebreak-style': ['error', 'unix'],
      'quotes': ['error', 'single'],
      'semi': ['error', 'never'],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { 'before': true, 'after': true }],
      'no-console': 0,
      'react/prop-types': 0,
      'no-unused-vars': 'warn',
      "react/react-in-jsx-scope": "off",
    }
  }
]
