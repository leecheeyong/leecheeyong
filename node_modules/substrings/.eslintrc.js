
// ESLint Config

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true,
    amd: true,
  },
  extends: "eslint:recommended",
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    indent: ["error", 2],
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "no-console": "off",
    "space-before-function-paren": ["error", "always"]
  }
}
