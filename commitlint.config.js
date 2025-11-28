export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 禁用 subject 大小写检查，允许中文输入
    'subject-case': [0],
  },
};