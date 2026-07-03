import { Slot } from "@radix-ui/react-slot";
import { cva, cx, type VariantProps } from "class-variance-authority";

const postContainerVariants = cva(
	"relative flex min-h-40 h-full w-full min-w-0 flex-col items-start justify-between overflow-hidden p-4 group",
	{
		variants: {
			featured: {
				true: "",
			},
			withSquaresBg: {
				true: "squares-with-gradient",
			},
		},
		defaultVariants: {
			withSquaresBg: true,
		},
	},
);

type PostContainerProps = React.HTMLAttributes<HTMLElement> &
	VariantProps<typeof postContainerVariants> & {
		featured?: boolean;
		asChild?: boolean;
	};

function PostContainer({
	children,
	className,
	asChild,
	featured,
	withSquaresBg,
	...props
}: PostContainerProps) {
	const Comp = asChild ? Slot : "article";
	if (featured) {
		return (
			<div className="flex flex-col">
				<span className="text-label-12 -mt-6 z-10 flex items-center justify-center h-6 font-medium uppercase bg-ds-primary text-ds-background">
					Featured
				</span>

				<Comp
					className={cx(
						postContainerVariants({ featured, withSquaresBg, className }),
					)}
					{...props}
				>
					{children}
				</Comp>
			</div>
		);
	}
	return (
		<Comp
			className={cx(
				postContainerVariants({ featured, withSquaresBg, className }),
			)}
			{...props}
		>
			{children}
		</Comp>
	);
}

type PostHeaderProps = React.HTMLAttributes<HTMLElement>;

function PostHeader({ children, className, ...props }: PostHeaderProps) {
	return (
		<header
			className={cx(
				"flex w-full min-w-0 flex-row items-start justify-between gap-2",
				className,
			)}
			{...props}
		>
			{children}
		</header>
	);
}

type PostBodyProps = React.HTMLAttributes<HTMLElement>;

function PostBody({ children, className, ...props }: PostBodyProps) {
	return (
		<section
			aria-labelledby="post-body"
			className={cx(
				"flex flex-col gap-1 md:gap-2 items-start justify-between w-full",
				className,
			)}
			{...props}
		>
			{children}
		</section>
	);
}

type PostTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

function PostTitle({ children, className, ...props }: PostTitleProps) {
	return (
		<h3
			id="post-title"
			className={cx(
				"text-heading-20 font-medium text-ds-text-accent",
				className,
			)}
			{...props}
		>
			{children}
		</h3>
	);
}

type PostDescriptionProps = React.HTMLAttributes<HTMLParagraphElement>;

function PostDescription({
	children,
	className,
	...props
}: PostDescriptionProps) {
	return (
		<p
			className={cx(
				"w-full min-w-0 line-clamp-2 text-copy-16 font-light text-ds-text-secondary",
				className,
			)}
			{...props}
		>
			{children}
		</p>
	);
}
const Post = {
	Container: PostContainer,
	Header: PostHeader,
	Body: PostBody,
	Title: PostTitle,
	Description: PostDescription,
};

export { Post, PostContainer };
