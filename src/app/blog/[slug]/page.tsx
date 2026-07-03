import type { Metadata } from "next";
import Image from "next/image";
import { Markdown } from "@/components/shared/markdown";
import { createPageMetadata } from "@/configs/metadata";
import { resolvePostCoverPath } from "@/lib/posts/resolve-cover";
import { PostsService } from "@/services/posts";

const postsService = new PostsService();

interface PostPageProps {
	params: Promise<{
		slug: string;
	}>;
}

export async function generateMetadata({
	params,
}: PostPageProps): Promise<Metadata> {
	const { slug } = await params;
	const post = await postsService.getPostMeta(`${slug}.md`);

	return createPageMetadata({
		title: post.title,
		description: post.headline,
		path: `/blog/${slug}`,
		image: null,
		type: "article",
		publishedTime: post.date.toISOString(),
		tags: post.tags,
	});
}

function transformObsidianImages(markdown: string) {
	return markdown.replace(
		/!\[\[([^\]]+\.(png|jpg|jpeg|gif|webp|svg))\]\]/gi,
		(_, filename) => `![](/posts/attachments/${filename})`,
	);
}

export default async function Post({ params }: PostPageProps) {
	const { slug } = await params;

	const filename = `${slug}.md`;

	const post = await postsService.getPostMeta(filename);
	const content = postsService.getPostContent(filename);

	const transformedContent = transformObsidianImages(content);

	const cover = resolvePostCoverPath(post.cover)?.replace("/posts/attachments/", "");

	return (
		<article className="px-8 flex flex-col gap-8 py-4 md:max-w-3xl md:mx-auto">
			<header className="relative w-full  min-h-80">
				<time className="absolute top-0 md:-left-36 left-0 [writing-mode:vertical-lr] text-label-12 uppercase font-light text-ds-border-hover">
					{post.date.toLocaleString("en-US", {
						year: "2-digit",
						month: "2-digit",
						day: "2-digit",
					})}
				</time>
				<div className="absolute left-0 bottom-8 flex flex-col gap-3">
					<ul className="flex flex-row gap-2">
						{post.tags.map((tag, idx) => (
							<li
								className="flex items-center gap-2 text-ds-primary uppercase text-copy-16 font-pixel"
								key={tag}
							>
								<span>{tag}</span>
								{idx < post.tags.length - 1 && (
									<span className="h-2 w-px bg-ds-border-hover" />
								)}
							</li>
						))}
					</ul>

					<div className="flex flex-col gap-4 md:max-w-2/3">
						<h1 className="text-heading-32 w-fit leading-none font-bold tracking-tighter text-ds-text">
							{post.title}
						</h1>
						<h2 className="text-heading-24 w-fit font-medium text-ds-text-secondary">
							{post.headline}
						</h2>
					</div>
				</div>

				<div className="absolute right-0 top-0 h-full w-3/4 md:w-2/4 -z-10">
					<figure className="relative h-full w-full">
						<Image
							src={`/posts/attachments/${cover}`}
							alt={post.title}
							fill
							className="object-cover object-center opacity-50"
							loading="eager"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>
					</figure>
				</div>
			</header>
			<Markdown content={transformedContent} />
		</article>
	);
}
