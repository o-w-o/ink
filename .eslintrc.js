"use strict";

module.exports = {
  extends: [
    require.resolve("@o-w-o/linter/.eslintrc"),
  ],
  rules: {
    "prettier/prettier": "warn",
    "@typescript-eslint/interface-name-prefix": 0,
    "@typescript-eslint/no-object-literal-type-assertion": 0,
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/explicit-member-accessibility": 0,
    "@typescript-eslint/camelcase": 0
  }
};
