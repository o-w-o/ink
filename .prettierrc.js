/**
 * 兼容 Java 语法，以分号结尾，使用双引号等
 */
module.exports = {
  semi: true,                         // 句末加分号
  singleQuote: false,                 // 使用双引号
  jsxSingleQuote: false,              // jsx 使用双引号
  trailingComma: "es5",               // 最后一个对象元素加逗号
  bracketSpacing: true,               // 对象，数组加空格
  jsxBracketSameLine: true,           // jsx > 另起一行
  arrowParens: "always",              // (x) => {} 要有小括号
  proseWrap: "never",                 // 是否要换行
  htmlWhitespaceSensitivity: 'css',   // 根据显示样式决定 html 要不要折行
};
