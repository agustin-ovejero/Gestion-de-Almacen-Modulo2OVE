// frontend/eslint.config.js
const globals = require('globals');
const pluginJs = require('@eslint/js');
const tseslint = require('typescript-eslint');
const pluginReactConfig = require('eslint-plugin-react/configs/recommended.js');

module.exports = [
  // --- 1. Archivos a Ignorar (reemplaza a .eslintignore) ---
  {
    ignores: [
      'node_modules/',
      'dist/',
      'dist-electron/',
      'release/',
      'coverage/',
      'vite.config.ts.timestamp-*.mjs',
    ],
  },

  // --- 2. Configuración Global para todos los archivos ---
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  // --- 3. Configuración Específica para React (.tsx) ---
  {
    files: ['src/**/*.{ts,tsx}'],
    ...pluginReactConfig, // Incluimos la configuración de React directamente
    settings: {
      react: {
        version: 'detect',
      },
    },
    languageOptions: {
      globals: {
        ...globals.browser, // Habilita variables globales del navegador
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', // No es necesario con React 17+
    },
  },

  // --- 4. Configuración Específica para archivos .js (main.js, preload.js, etc.) ---
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.node, // Habilita variables globales de Node.js
      },
    },
    rules: {
      // Desactivamos las reglas de TypeScript que prohíben 'require'
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];
