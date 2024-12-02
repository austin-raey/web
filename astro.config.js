// @ts-check
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	build: {
		inlineStylesheets: "always"
	},
	integrations: [tailwind()],
	markdown: {
		shikiConfig: {
			theme: "dracula-soft",
			wrap: true
		},
		syntaxHighlight: "prism"
	},
	output: "static",
	security: {
		checkOrigin: true
	},
	site: "https://raey.link"
});
