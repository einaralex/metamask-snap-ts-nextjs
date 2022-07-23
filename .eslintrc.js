module.exports = {
  extends: ['next/core-web-vitals'],
  root: true,
  overrides: [
    {
      files: ['src/snaps/*.ts'],
      extends: ['@metamask/eslint-config-typescript'],
      rules: {
        '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
      },
    },
  ],

  ignorePatterns: ['!.eslintrc.js', '!.prettierrc.js', 'dist/', '*.d.ts'],
};
