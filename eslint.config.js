import { defineConfig } from 'eslint-define-config';

export default defineConfig({
  plugins: ['prettier'],
  overrides: [
    {
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      rules: {
        'prettier/prettier': 'error',
      },
    },
  ],
});
