import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		icons: z.array(z.string()),
		shortDescription: z.string().optional(),
		title: z.string()
	}),
	type: "content"
});

export const collections = { blog };
