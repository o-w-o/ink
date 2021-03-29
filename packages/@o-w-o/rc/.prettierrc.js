module.exports = {
  printWidth: 120,               // 换行字符串阈值
  semi: true,                    // 句末加分号
  singleQuote: false,            // 使用双引号
  jsxSingleQuote: false,         // jsx 使用双引号
  trailingComma: "all",          // 最后一个对象元素加逗号
  bracketSpacing: true,          // 对象，数组加空格
  jsxBracketSameLine: true,      // jsx > 是否另起一行
  arrowParens: "always",         // (x) => {} 是否要有小括号
  requirePragma: false,          // 是否要注释来决定是否格式化代码
  proseWrap: "never",         // 是否要换行
  htmlWhitespaceSensitivity: 'css',  // 根据显示样式决定 html 要不要折行
};
