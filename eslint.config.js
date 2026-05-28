import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist', 'node_modules', '.vercel', '.vite'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      // The codebase uses React.useState/useRef/etc. via the namespace import,
      // so functions like `Section`, `Caption`, etc. that take a `P` prop are
      // not implicit children consumers — they just happen to use the letter.
      'react/prop-types': 'off',
      // Unused vars that start with underscore are intentional placeholders.
      'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // The new React Compiler strictness flags valid React 18 patterns used in
      // the ported prototypes: drag handlers reading offsetRef.current in JSX
      // for initial position, and the valueRef.current = value sync pattern that
      // keeps drag pointer-move closures over the latest value. Both work; both
      // would need useEffect-based rewrites to silence. Downgrade to warning.
      'react-hooks/refs': 'warn',
      'react-hooks/immutability': 'warn',
    },
  },
];
