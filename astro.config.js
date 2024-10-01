// @ts-check
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
	build: {
		inlineStylesheets: "always"
	},
	integrations: [tailwind()],
	output: "static",
	security: {
		checkOrigin: true
	},
	site: "https://raey.link",
	vite: {
		plugins: [
			Icons({
				compiler: "astro"
			})
		]
	}
});
