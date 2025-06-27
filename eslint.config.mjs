import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import { fileURLToPath } from 'url';

export default tseslint.config(
  eslint.configs.recommended,

  {
    files: ['**/*.ts', '**/*.tsx'],
    ...tseslint.configs.recommendedTypeChecked[0],
    languageOptions: {
      globals: globals.node,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: fileURLToPath(new URL('.', import.meta.url)),
      },
    },
  },

  {
    files: ['**/*.ts', '**/*.tsx'],
    ...tseslint.configs.stylisticTypeChecked[0],
  },

  {
    files: ['**/*.js', '**/*.mjs'],
    languageOptions: {
      globals: globals.node,
    },
    ...eslint.configs.recommended,
  },

  {
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  }
);
