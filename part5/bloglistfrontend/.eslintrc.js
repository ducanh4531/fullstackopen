module.exports = {
	env: {
		browser: true,
		es2021: true,
		node: true,
		jest: true,
		cypress: true,
	},
	extends: ["eslint:recommended", "plugin:react/recommended"],
	parserOptions: {
		sourceType: "module",
		allowImportExportEverywhere: true,
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 13,
	},
	plugins: ["react", "cypress"],
	rules: { indent: ["error", "tab"], "react/react-in-jsx-scope": "off" },
};
