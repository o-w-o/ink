"use strict";

module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  extends: ["prettier", "prettier/@typescript-eslint", "prettier/babel", "prettier/react"],
  plugins: ["@typescript-eslint", "babel", "react", "prettier", "eslint-comments", "jest", "unicorn", "react-hooks"],
  rules: {
    "prettier/prettier": "error",
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  settings: {
    // support import modules from TypeScript files in JavaScript files
    "import/resolver": { node: { extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"] } },
    polyfills: ["fetch", "Promise", "URL", "object-assign"],
  },
};
