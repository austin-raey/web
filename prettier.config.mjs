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
	plugins: ["prettier-plugin-astro"],
	singleQuote: false,
	trailingComma: "none",
	useTabs: true
};
