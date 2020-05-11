"use strict";

const eslintrc = require("./.eslintrc.js");
const stylelintrc = require("./.stylelintrc.js");
const prettierrc = require("./.prettierrc.js");

module.exports = {
  eslint: () => eslintrc,
  stylelint: () => stylelintrc,
  prettier: () => prettierrc,
};
