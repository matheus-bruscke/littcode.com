import { Suspense } from "react";
import { PostsFilters } from "@/components/modules/blog/posts-filters";
import { PostsList } from "@/components/modules/blog/posts-list";
import { createPageMetadata } from "@/configs/metadata";
import { PostsService } from "@/services/posts";

const postsService = new PostsService();

export const metadata = createPageMetadata({
	title: "Blog",
	description:
		"Technical articles on software engineering, React, and developer experience.",
	path: "/blog",
});

export default async function Blog() {
	const posts = await postsService.getAll();
	const tags = await postsService.getTags();

	return (
		<main className="grid grid-cols-12 px-4 w-full md:max-w-5xl md:mx-auto md:px-0 md:flex-1">
			<div className="order-2 md:order-1 py-4 flex flex-col gap-4 col-span-12 md:col-span-8">
				<h1 className="hidden md:block text-title">Blog</h1>
				<Suspense fallback={<div>Loading...</div>}>
					<PostsList posts={posts} />
				</Suspense>
			</div>
			<div className="order-1 sticky top-0 md:relative md:order-2 py-4 flex flex-col gap-4 col-span-12 md:col-span-4 border-l border-ds-border border-dashed">
				<h1 className="block md:hidden text-title">Blog</h1>
				<Suspense fallback={<div>Loading...</div>}>
					<PostsFilters tags={tags} />
				</Suspense>
			</div>
		</main>
	);
}
