import eslint from "@eslint/js";
import astro from "eslint-plugin-astro";
import perfectionist from "eslint-plugin-perfectionist";
import prettier from "eslint-plugin-prettier/recommended";
import tailwind from "eslint-plugin-tailwindcss";
import unicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

export default tseslint.config(
	eslint.configs.recommended,
	...tseslint.configs.stylistic,
	prettier,
	...astro.configs.recommended,
	{
		rules: {
			"astro/sort-attributes": "error"
		}
	},
	unicorn.configs["flat/recommended"],
	{
		rules: {
			"unicorn/filename-case": [
				"error",
				{
					cases: {
						kebabCase: true,
						pascalCase: true
					}
				}
			],
			"unicorn/prevent-abbreviations": [
				"error",
				{
					replacements: {
						// Astro likes "Props" for component properties
						props: false
					}
				}
			]
		}
	},

	perfectionist.configs["recommended-natural"],
	{
		rules: {
			"perfectionist/sort-imports": [
				"error",
				{
					newlinesBetween: "never"
				}
			]
		}
	},
	...tailwind.configs["flat/recommended"],
	{
		ignores: [".astro/", "dist/"]
	}
);
