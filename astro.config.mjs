// @ts-check
import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
	build: {
		inlineStylesheets: "always"
	},
	integrations: [sitemap(), compress()],
	output: "static",
	security: {
		checkOrigin: true
	},
	site: "https://raey.me",
	vite: {
		plugins: [tailwindcss()]
	}
});
