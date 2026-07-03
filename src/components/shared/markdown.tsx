import { cx } from "class-variance-authority";
import { Children } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeBlock } from "./code-block";

type HastNode = {
	type: string;
	tagName?: string;
	value?: string;
	children?: HastNode[];
};

function getTextContent(node: HastNode): string {
	if (node.type === "text" && node.value) {
		return node.value;
	}

	return node.children?.map(getTextContent).join("") ?? "";
}

function isAuthorLine(text: string): boolean {
	return /^(\u2014|\u2013|-)\s/.test(text.trim());
}

function getAuthorChildIndex(children: HastNode[]): number | null {
	const paragraphIndices = children
		.map((child, index) => (child.tagName === "p" ? index : null))
		.filter((index): index is number => index !== null);

	if (paragraphIndices.length <= 1) return null;

	const lastIndex = paragraphIndices[paragraphIndices.length - 1];
	const lastParagraph = children[lastIndex];

	if (!lastParagraph) return null;

	return isAuthorLine(getTextContent(lastParagraph)) ? lastIndex : null;
}

type MarkdownProps = Omit<typeof ReactMarkdown, "children" | "components"> & {
	content: string;
	className?: string;
};

const components: Components = {
	h1: ({ node, ...props }) => {
		return (
			<h1
				className="text-2xl text-ds-accent font-semibold tracking-tighter font-accent leading-relaxed my-4"
				{...props}
			/>
		);
	},
	h2: ({ node, ...props }) => {
		return (
			<h2
				className="text-xl text-ds-accent font-semibold tracking-tighter font-accent leading-relaxed my-4"
				{...props}
			/>
		);
	},
	h3: ({ node, ...props }) => {
		return (
			<h3
				className="text-lg text-ds-accent font-medium tracking-tighter font-accent leading-relaxed my-4"
				{...props}
			/>
		);
	},
	p: ({ children }) => <p className="text-description mb-4">{children}</p>,
	strong: ({ children }) => (
		<strong className="text-ds-text-accent font-medium">{children}</strong>
	),
	ul: ({ children }) => (
		<ul className="list-[square] marker:text-ds-primary pl-4 mb-4">
			{children}
		</ul>
	),
	ol: ({ node, ...props }) => {
		return (
			<ol
				className="text-base space-y-1  text-ds-text-secondary leading-normal list-decimal ml-4 mb-4"
				{...props}
			/>
		);
	},
	li: ({ children }) => (
		<li className="text-description not-last:mb-2">{children}</li>
	),
	em: ({ children }) => <em className="font-serif italic">{children}</em>,
	a: ({ node, ...props }) => {
		return (
			<a
				className="text-base tracking-tight text-ds-primary hover:bg-ds-primary hover:text-ds-background"
				{...props}
				target="_blank"
				rel="noopener noreferrer"
			/>
		);
	},
	blockquote: ({ node, children, ...props }) => {
		const childArray = Children.toArray(children);
		const authorIndex = node?.children
			? getAuthorChildIndex(node.children as HastNode[])
			: null;

		if (authorIndex === null) {
			return (
				<blockquote
					className="w-full border-l-2 border-ds-primary bg-ds-primary/10 relative [&_p]:mb-0 p-4 my-4"
					{...props}
				>
					{children}
				</blockquote>
			);
		}

		const quoteChildren = childArray.slice(0, authorIndex);
		const authorChild = childArray[authorIndex];

		return (
			<blockquote
				className="w-full bg-ds-primary/10 relative p-4 my-4 [&_p]:mb-0"
				{...props}
			>
				<span className="absolute -top-2 -left-2 text-ds-primary font-serif text-4xl">
					"
				</span>
				<div className="flex font-serif flex-col gap-2 [&_p]:mb-0">
					{quoteChildren}
				</div>
				<footer className="mt-4 font-light text-ds-text-secondary [&_p]:mb-0 [&_p]:text-label-12 uppercase">
					{authorChild}
				</footer>
			</blockquote>
		);
	},
	hr: ({ node, ...props }) => {
		return <hr className="border-ds-border my-4" {...props} />;
	},
	code: ({ node, className, children, ...props }) => {
		const isBlock = Boolean(className?.startsWith("language-"));

		if (isBlock) {
			return (
				<code className={cx("font-mono", className)} {...props}>
					{children}
				</code>
			);
		}

		return (
			<code
				className="text-copy-14 text-ds-accent leading-normal bg-ds-border px-1 py-0.5 font-mono"
				{...props}
			>
				{children}
			</code>
		);
	},
	pre: ({ node, ...props }) => {
		return <CodeBlock {...props} />;
	},
	img: ({ node, alt, className, ...props }) => {
		const caption = alt?.trim();
		const hasCaption = Boolean(caption);

		return (
			<span
				className={cx(
					"relative my-4 inline-block max-w-full",
					hasCaption && "markdown-image-caption",
				)}
				data-alt={hasCaption ? caption : undefined}
			>
				{/* biome-ignore lint/performance/noImgElement: markdown image */}
				<img
					{...props}
					alt={alt}
					className={cx("block max-w-full", className)}
				/>
			</span>
		);
	},
	table: ({ node, ...props }) => {
		return (
			<div className="mt-4 mb-8 w-full overflow-x-auto">
				<table
					className="w-full border-collapse text-copy-14 [&_tr]:border-b [&_tr]:border-dashed [&_tr]:border-ds-border"
					{...props}
				/>
			</div>
		);
	},
	th: ({ node, ...props }) => {
		return (
			<th
				className="py-4 pr-10 text-left align-top font-bold text-ds-text [&_p]:mb-0"
				{...props}
			/>
		);
	},
	td: ({ node, ...props }) => {
		return (
			<td
				className="py-4 pr-10 text-left align-top font-light text-ds-text [&_p]:mb-0"
				{...props}
			/>
		);
	},
};

function Markdown({ content, className, ...props }: MarkdownProps) {
	return (
		<div className={className}>
			<ReactMarkdown
				components={components}
				remarkPlugins={[remarkGfm]}
				{...props}
			>
				{content}
			</ReactMarkdown>
		</div>
	);
}

export { Markdown };
