// @ts-check

import sitemap from "@astrojs/sitemap";
import compress from "@playform/compress";
import { defineConfig } from "astro/config";
import Icons from "unplugin-icons/vite";

export default defineConfig({
	build: {
		inlineStylesheets: "always"
	},
	integrations: [
		sitemap(),
		compress({
			HTML: {
				"html-minifier-terser": {
					collapseInlineTagWhitespace: true,
					collapseWhitespace: true,
					minifyCSS: false,
					removeComments: true,
					sortAttributes: true
				}
			}
		})
	],

	markdown: {
		shikiConfig: {
			themes: {
				dark: "catppuccin-macchiato",
				light: "catppuccin-latte"
			}
		}
	},

	// // I would add this, however, this seems to cause resizing the page
	// // to be slow / janky.
	// experimental: {
	// 	clientPrerender: true
	// },

	output: "static",

	prefetch: {
		defaultStrategy: "hover",
		prefetchAll: true
	},

	scopedStyleStrategy: "where",

	security: {
		checkOrigin: true
	},

	site: "https://raey.me",

	trailingSlash: "never",

	vite: {
		plugins: [
			Icons({
				compiler: "astro",
				defaultClass: "i",
				defaultStyle: "vertical-align: text-bottom;"
			})
		]
	}
});
