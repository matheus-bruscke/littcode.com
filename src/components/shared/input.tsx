import { cva, type VariantProps } from "class-variance-authority";

const inputWrapperVariants = cva("flex items-center gap-2", {
	variants: {
		variant: {
			default:
				"border-l border-ds-border bg-ds-background-secondary focus-within:border-ds-primary focus-within:bg-ds-primary/10",
		},
		size: {
			default: "px-4 h-9",
		},
	},
	defaultVariants: {
		variant: "default",
		size: "default",
	},
});

const inputVariants = cva("w-full text-sm", {
	variants: {
		variant: {
			default:
				"text-ds-accent outline-none focus:text-ds-primary focus:outline-none",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});

type InputWrapperProps = VariantProps<typeof inputWrapperVariants> &
	React.InputHTMLAttributes<HTMLInputElement> & {
		ref?: React.RefObject<HTMLInputElement | null>;
	};

const Input = ({ variant, size, className, ...props }: InputWrapperProps) => {
	return (
		<div className={inputWrapperVariants({ variant, size, className })}>
			<input type="text" className={inputVariants({ variant })} {...props} />
		</div>
	);
};

export { Input };
