// @ts-check

/** @type {import("prettier").Config} */
export default {
	endOfLine: "lf",
	overrides: [
		{
			files: "*.astro",
			options: {
				parser: "astro"
			}
		}
	],
	plugins: ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
	singleQuote: false,

	tailwindStylesheet: "./src/global.css",
	trailingComma: "none",
	useTabs: true
};
