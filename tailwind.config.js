import { addIconSelectors } from "@iconify/tailwind";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
	experimental: {
		optimizeUniversalDefaults: true
	},
	plugins: [
		addIconSelectors({
			backgroundSelector: ".i",
			extraBackgroundRules: {
				"vertical-align": "text-top"
			},
			iconSelector: String.raw`.{prefix}\/{name}`,
			maskSelector: ".ic",
			prefixes: ["ph"],
			scale: 1.2
		})
	]
};
