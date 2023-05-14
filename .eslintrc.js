module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended"
	],
	"parserOptions": {
		"ecmaFeatures": {
			"jsx": true
		},
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react"
	],
	"rules": {
		"linebreak-style": 0,
		"react/prop-types": 0,
		"global-require": 0,
		"eslint linebreak-style": [0, "error", "windows"],
		"semi": [
			"error",
			"always"
		]
	}
};
