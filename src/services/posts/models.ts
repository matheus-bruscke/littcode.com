import { z } from "zod";

const postMetaSchema = z.object({
	title: z.string(),
	slug: z.string(),
	headline: z.string(),
	cover: z.string().optional(),
	date: z.coerce.date(),
	tags: z.array(z.string()),
});

type PostMeta = z.infer<typeof postMetaSchema>;

export type { PostMeta };
export { postMetaSchema };
