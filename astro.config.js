import sitemap from "@astrojs/sitemap";
// @ts-check
import compress from "@playform/compress";
import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";

export default defineConfig({
	build: {
		inlineStylesheets: "always"
	},

	// // I would add this, however, this seems to cause resizing the page
	// // to be slow / janky.
	// experimental: {
	// 	clientPrerender: true
	// },

	integrations: [
		sitemap(),
		compress({
			HTML: {
				"html-minifier-terser": {
					collapseInlineTagWhitespace: true,
					collapseWhitespace: true
				}
			}
		})
	],

	output: "static",

	prefetch: {
		defaultStrategy: "hover",
		prefetchAll: true
	},

	security: {
		checkOrigin: true
	},

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
