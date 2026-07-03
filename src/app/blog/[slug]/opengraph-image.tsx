import { createPostOgImage, postOgSize } from "@/lib/og/post-og-image";
import { PostsService } from "@/services/posts";

const postsService = new PostsService();

export const runtime = "nodejs";
export const alt = "Blog post";
export const size = postOgSize;
export const contentType = "image/png";

export default async function Image({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const post = await postsService.getPostMeta(`${slug}.md`);

	return createPostOgImage(post);
}
