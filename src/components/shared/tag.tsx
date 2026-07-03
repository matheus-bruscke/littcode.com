import { cva, type VariantProps } from "class-variance-authority";
import { Frame } from "./frame";

const tagVariants = cva(
	"inline-flex relative items-center font-pixel justify-center cursor-pointer uppercase tracking-tight",
	{
		variants: {
			variant: {
				default: "dots-texture text-ds-text-secondary before:opacity-50",
				active: "dots-primary-texture text-ds-primary",
			},
			size: {
				default: "h-9 px-4",
				small: "h-8 px-3",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

const labelVariants = cva("relative z-10 bg-ds-background", {
	variants: {
		size: {
			default: "text-xs",
			small: "text-xs",
		},
	},
	defaultVariants: {
		size: "default",
	},
});

type TagProps = React.HTMLAttributes<HTMLDivElement> &
	VariantProps<typeof tagVariants> & {
		label: string;
	};

const Tag = ({ variant, size, className, label, ...props }: TagProps) => {
	return (
		<Frame variant={variant === "active" ? "primary" : "idle"}>
			<div className={tagVariants({ variant, size, className })} {...props}>
				<span className={labelVariants({ size })}>{label}</span>
			</div>
		</Frame>
	);
};

export { Tag };
