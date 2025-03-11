/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable no-undef */

const js = require("@eslint/js");
const tseslint = require("typescript-eslint");
const security = require("eslint-plugin-security");

/** @type {import('eslint').Linter.FlatConfig[]} */
module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  security.configs.recommended,
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser
    },
    rules: {
      "no-console": "warn",
      "no-var": "error",
      "prefer-const": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { "argsIgnorePattern": "^_" }
      ],
      "curly": "error",
      "eqeqeq": "error"
    }
  }
];
