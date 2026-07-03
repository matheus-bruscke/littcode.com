"use client";
import Link from "next/link";
import { parseAsArrayOf, parseAsString, useQueryState } from "nuqs";
import { useMemo } from "react";
import { Empty } from "@/components/shared/empty";
import { Post } from "@/components/templates/post";
import type { PostMeta } from "@/services/posts/models";

type PostsListProps = {
	posts: PostMeta[];
};

const PostsList = ({ posts }: PostsListProps) => {
	const [q] = useQueryState("q");
	const [selectedTags] = useQueryState(
		"tag",
		parseAsArrayOf(parseAsString).withDefault([]),
	);

	const filteredPosts = useMemo(() => {
		const filteredPosts: PostMeta[] = [];

		for (const post of posts) {
			if (q) {
				if (
					!post.title.toLowerCase().includes(q.toLowerCase()) &&
					!post.headline.toLowerCase().includes(q.toLowerCase()) &&
					!post.tags.some((tag: string) =>
						tag.toLowerCase().includes(q.toLowerCase()),
					)
				) {
					continue;
				}
			}

			if (selectedTags.length > 0) {
				if (!post.tags.some((tag: string) => selectedTags.includes(tag))) {
					continue;
				}
			}

			filteredPosts.push(post);
		}

		return filteredPosts;
	}, [posts, q, selectedTags]);

	if (filteredPosts.length === 0) {
		return (
			<div className="h-40 px-4">
				<Empty message="No posts found" className="uppercase" />
			</div>
		);
	}

	return (
		<nav className="flex px-4 flex-col">
			{filteredPosts.map((post) => (
				<Post.Container
					withSquaresBg={false}
					key={post.slug}
					asChild
					className="border-b first:-mt-4 px-0 border-ds-border border-dashed"
				>
					<Link href={`/blog/${post.slug}`}>
						<Post.Header>
							<span className="text-label-12 font-pixel uppercase text-ds-primary">
								{post.tags[0] ?? "Uncategorized"}
							</span>
							<time
								dateTime="2026-06-26"
								className="text-label-12 uppercase font-light text-ds-border-hover group-hover:text-ds-text-secondary"
							>
								{post.date.toLocaleDateString("en-US", {
									year: "2-digit",
									month: "short",
									day: "2-digit",
								})}
							</time>
						</Post.Header>
						<Post.Body>
							<Post.Title className="group-hover:text-ds-primary">
								{post.title}
							</Post.Title>
							<Post.Description>{post.headline}</Post.Description>
						</Post.Body>
					</Link>
				</Post.Container>
			))}
		</nav>
	);
};

export { PostsList };
