import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: ['node_modules/', '**/node_modules/**/', 'dist/', '**/dist/**/', 'logs/', '**/logs/**/', 'docs/', '**/docs/**/', 'coverage', '**/coverage/**', 'mcl', '**/mcl/**', 'go-cqhttp', '**/go-cqhttp/**'],
  formatters: true,
  unocss: true,
  vue: true,
}, {
  rules: {
    // for nest import
    'ts/consistent-type-imports': 'off',
  },
})
