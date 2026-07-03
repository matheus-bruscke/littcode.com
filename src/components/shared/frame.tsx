import { cva, cx, type VariantProps } from "class-variance-authority";

type DecoratorProps = React.SVGProps<SVGSVGElement> & {
	className?: string;
};

const Decorator = ({ className, ...props }: DecoratorProps) => {
	return (
		// biome-ignore lint/a11y/noSvgWithoutTitle: decorator
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="6"
			height="6"
			viewBox="0 0 6 6"
			aria-hidden
			className={cx("absolute size-1.5", className)}
			fill="currentColor"
			{...props}
		>
			<path d="M0 0H1V5H6V6H0V0Z" />
		</svg>
	);
};

const frameVariants = cva("relative", {
	variants: {
		variant: {
			default: "text-ds-fg",
			primary: "text-ds-primary",
			idle: "text-ds-border",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

type FrameProps = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof frameVariants> & {
		className?: string;
	};

const Frame = ({
	className,
	children,
	variant = "default",
	...props
}: FrameProps) => {
	return (
		<div className={cx(frameVariants({ variant }), className)} {...props}>
			{children}
			<Decorator className="bottom-0 left-0" />
			<Decorator className="top-0 left-0 rotate-90" />
			<Decorator className="right-0 top-0 rotate-180" />
			<Decorator className="bottom-0 right-0 -rotate-90" />
		</div>
	);
};

export { Frame };
