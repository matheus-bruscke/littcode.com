/** biome-ignore-all lint/a11y/noSvgWithoutTitle: sample svg */
import { cx } from "class-variance-authority";

type EmptyProps = {
	message?: string;
	className?: string;
};
const Empty = ({ message = "WIP", className }: EmptyProps) => {
	return (
		<div
			className={cx(
				"w-full h-full border border-ds-border  relative flex items-center justify-center",
				className,
			)}
		>
			<svg
				aria-hidden
				className="pointer-events-none absolute inset-0 size-full text-ds-border"
			>
				<line
					x1="0"
					y1="0"
					x2="100%"
					y2="100%"
					stroke="currentColor"
					strokeWidth="1"
				/>
			</svg>
			<span className="text-ds-fg text-sm font-pixel uppercase font-extralight bg-ds-background z-10 w-fit px-4">
				{message}
			</span>
		</div>
	);
};

export { Empty };
