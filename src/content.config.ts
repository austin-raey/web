import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
	schema: z.object({
		date: z.date(),
		description: z.string().optional(),
		kind: z
			.array(z.enum(["bug", "computer", "framework", "personal", "tutorial"]))
			.max(3),
		title: z.string()
	})
});

export const collections = { blog };
