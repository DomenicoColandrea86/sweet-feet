module.exports = {
	extends: ['plugin:react/recommended', 'plugin:prettier/recommended'],
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
			jsx: true,
		},
	},
	settings: {
		react: {
			version: 'detect',
		},
	},
	rules: {
		'react/prop-types': 0,
		'prettier/prettier': 'error'
	},
};
