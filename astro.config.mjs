// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";

export default defineConfig({
	build: {
		inlineStylesheets: "always"
	},
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
			themes: {
				dark: "catppuccin-macchiato",
				light: "catppuccin-latte"
			}
		}
	},
	output: "static",
	site: "https://raey.me",
	trailingSlash: "never",
	vite: {
		plugins: [
			Icons({
				compiler: "astro",
				defaultClass: "i"
			})
		]
	}
});
