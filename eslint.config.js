import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        ecmaVersion: 'latest', // Use the latest ECMAScript version
        sourceType: 'module',  // Enable ECMAScript modules
      },
    },
  },
  pluginJs.configs.recommended,
  {
    rules: {
      'no-unused-vars': 'error',
      'no-console': 'off',  // Set to 'off' if you want to allow console logs
      'eqeqeq': 'error',
      'curly': 'error',
      // Add more rules as needed
    },
  },
];
