// @ts-check
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";
import Icons from "unplugin-icons/vite";

export default defineConfig({
	build: {
		inlineStylesheets: "always"
	},
	fonts: [
		{
			cssVariable: "--font",
			name: "Schibsted Grotesk",
			provider: fontProviders.google(),
			styles: ["normal", "italic"],
			weights: ["400 900"]
		}
	],
	integrations: [mdx(), sitemap()],
	output: "static",
	security: {
		csp: {
			algorithm: "SHA-512"
		}
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
