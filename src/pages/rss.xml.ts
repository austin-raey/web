import type { AstroGlobal } from "astro";

import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import DOMPurify from "isomorphic-dompurify";
import { marked } from "marked";

export async function GET(context: AstroGlobal) {
	const blog = await getCollection("blog");
	// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
	const site = context.site!;

	return rss({
		customData: `<language>en-us</language><lastBuildDate>${new Date().toUTCString()}</lastBuildDate><image><title>Austin Raey</title><url>${site}/assets/portrait.avif</url><link>${site}</link></image>`,
		description:
			"Austin Raey's blog about web development, design, and technology.",

		items: await Promise.all(
			blog.map(async (post) => ({
				author: "Austin Raey",
				categories: post.data.kind || [],
				content: DOMPurify.sanitize(await marked.parse(post.body || "")),
				guid: `/blog/${post.id}/`,
				link: `/blog/${post.id}/`,
				...post.data
			}))
		),

		site: site,
		title: "Austin's Blog",
		trailingSlash: false
	});
}
