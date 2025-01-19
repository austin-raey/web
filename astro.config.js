// @ts-check
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	build: {
		inlineStylesheets: "always"
	},
	integrations: [tailwind(), sitemap()],
	output: "static",
	security: {
		checkOrigin: true
	},
	site: "https://raey.link"
});
