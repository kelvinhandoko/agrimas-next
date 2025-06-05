/** @type {import("eslint").Linter.Config} */
const config = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  ignorePatterns: [
    ".eslintrc.cjs",
    "prettier.config.js",
    "next.config.js",
    "**/*.jsx",
  ],
  plugins: ["@typescript-eslint", "eslint-plugin-unused-imports"],
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:@typescript-eslint/stylistic-type-checked",
  ],
  overrides: [
    {
      files: ["*.js", "*.jsx"],
      rules: {
        // Disable TS rules for JS files
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/require-await": "off",
        "@typescript-eslint/no-misused-promises": "off",
        "@typescript-eslint/prefer-nullish-coalescing": "off",
        "@typescript-eslint/array-type": "off",
        "@typescript-eslint/consistent-type-definitions": "off",
        "@typescript-eslint/consistent-type-imports": "off",
      },
    },
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/array-type": "off",
    "@typescript-eslint/consistent-type-definitions": "off",
    "@typescript-eslint/consistent-type-imports": [
      "warn",
      {
        prefer: "type-imports",
        fixStyle: "inline-type-imports",
      },
    ],
    "@typescript-eslint/require-await": "off",
    "@typescript-eslint/no-misused-promises": [
      "error",
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      {
        vars: "all",
        varsIgnorePattern: "^_",
        args: "after-used",
        argsIgnorePattern: "^_",
      },
    ],
  },
};

module.exports = config;
