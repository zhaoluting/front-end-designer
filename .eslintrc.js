// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    "vue/no-parsing-error": [2, { "x-invalid-end-tag": false }],
    "no-underscore-dangle": [
      "error", 
      { "allow": ["_d", "_date"] }
	],
	'no-param-reassign': 'off', // 允许修改函数引用类型入参
	'no-plusplus': 'off', // 允许 ++
	'no-restricted-syntax': [ // 覆盖掉对 for-in 和 for-of 的限制
		'error',
		'LabeledStatement',
		'WithStatement',
	],
	"no-shadow": [
		"error",
		{ 
			"allow":
			["state"] 
		}
	],
	'import/extensions': ['off', 'never'],
	'indent': ['error', 2],
	'no-console': 0,
	'no-debugger': 0,
	'import/no-extraneous-dependencies': 0,
	'no-useless-return': 0,
	'import/no-unresolved': 0,
	'no-prototype-builtins': 0,
	'strict': 0,
	"class-methods-use-this": 0,
	'no-undef': 0,
	'no-use-before-define': 0,
	'no-extend-native': 0,
	'no-script-url': 0,
  }
}
