// @ts-check
import eslint from "@eslint/js";
import prettier from "eslint-config-prettier/flat";
import astro from "eslint-plugin-astro";
import perfectionist from "eslint-plugin-perfectionist";
import unicorn from "eslint-plugin-unicorn";
import tseslint from "typescript-eslint";

export default tseslint.config(
	eslint.configs.recommended,
	tseslint.configs.strict,
	tseslint.configs.stylistic,
	prettier,
	unicorn.configs.recommended,
	perfectionist.configs["recommended-natural"],
	astro.configs.recommended,
	{
		rules: {
			"astro/prefer-class-list-directive": "error",
			"astro/prefer-object-class-list": "error",
			"astro/prefer-split-class-list": "error",
			"astro/sort-attributes": "error",
			"unicorn/prevent-abbreviations": [
				"error",
				{
					replacements: {
						env: false,
						props: false
					}
				}
			]
		}
	},
	{
		ignores: [".astro/**", "dist/**", "node_modules/**"]
	}
);
