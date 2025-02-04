// @ts-check

import { addIconSelectors } from "@iconify/tailwind";
export default addIconSelectors({
	backgroundSelector: ".i",
	extraBackgroundRules: {
		"vertical-align": "text-top"
	},
	extraMaskRules: {
		"vertical-align": "text-top"
	},
	maskSelector: ".ic",
	prefixes: ["ph", "logos"],
	scale: 1.2
});
