module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended', // Kết hợp ESLint với Prettier
  ],
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'off', // Tắt lỗi prettier/prettier
    '@typescript-eslint/no-unused-vars': 'warn', // Chỉ cảnh báo khi biến không sử dụng
    'no-console': 'off', // Tắt lỗi khi dùng console.log
  },
};
