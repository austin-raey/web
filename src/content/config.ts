import { defineCollection, z } from "astro:content";

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		date: z.date(),
		icons: z.array(
			z.enum([
				"ph/bug-duotone",
				"ph/gear-fine-duotone",
				"ph/laptop-duotone",
				"ph/list-numbers-duotone",
				"ph/pencil-circle-duotone"
			])
		),
		shortDescription: z.string().optional(),
		title: z.string()
	}),
	type: "content"
});

export const collections = { blog };
