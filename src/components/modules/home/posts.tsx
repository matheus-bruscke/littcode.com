import Link from "next/link";
import { Empty } from "@/components/shared/empty";
import { Post } from "@/components/templates/post";
import { PostsService } from "@/services/posts";

const postsService = new PostsService();

async function Posts() {
	const posts = await postsService.getAll();

	return (
		<section className="flex flex-col gap-12 pt-4 md:max-w-5xl md:mx-auto md:px-0">
			<div className="flex flex-col gap-12 px-4 md:px-0">
				<h2 className="text-title">I've been thinking about</h2>
				<nav className="flex flex-col md:grid md:grid-cols-4 px-px md:h-60">
					{Array.from({ length: 4 }).map((_, index) => {
						const post = posts[index];

						if (!post) {
							return (
								<Empty
									// biome-ignore lint/suspicious/noArrayIndexKey: just a placeholder
									key={index}
									message="No posts found"
									className="-ml-px not-first:border-r-0 border-b-0 min-h-40"
								/>
							);
						}

						return (
							<Post.Container
								asChild
								withSquaresBg
								key={post.slug}
								featured={index === 0}
								className="not-last:border-b group md:not-last:border-b-0 md:not-last:border-r not-last:border-ds-border not-last:border-dashed"
							>
								<Link href={`/blog/${post.slug}`}>
									<Post.Header>
										<span className="text-label-12 font-pixel uppercase text-ds-primary">
											{post.tags[0] ?? "Uncategorized"}
										</span>
										<time
											dateTime={post.date.toISOString()}
											className="text-label-12 uppercase font-light text-ds-text-secondary"
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
						);
					})}
				</nav>
				<nav className="w-full border-t border-ds-border border-dashed -mt-12 h-8 trace-texture flex items-center justify-center">
					<Link
						href="/blog"
						className="text-label-12 text-ds-text-secondary uppercase hover:text-ds-primary bg-ds-background"
					>
						See all posts ({posts.length})
					</Link>
				</nav>
			</div>
		</section>
	);
}

export { Posts };
