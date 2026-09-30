module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module', ecmaFeatures: { jsx: true } },
  extends: ['eslint:recommended', 'plugin:react-hooks/recommended'],
  plugins: ['react'],
  settings: { react: { version: 'detect' } },
  ignorePatterns: ['src/testing/', 'src/trash/', '**/*.d.ts'],
  rules: {
    // Keep pre-existing cleanup items visible without making them new build failures.
    'no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
    'react/jsx-uses-react': 'warn',
    'react/jsx-uses-vars': 'warn',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        // TypeScript checks identifiers; the base rule misreads type declarations.
        'no-undef': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['warn', { args: 'none', ignoreRestSiblings: true }],
      },
    },
    { files: ['**/*.{test,spec}.{js,jsx,ts,tsx}', '**/__tests__/**/*', 'src/setupTests.js'], env: { jest: true } },
  ],
};
