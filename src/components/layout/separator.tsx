type SeparatorProps = {
	type?: "dashed-line" | "slashed-line" | "dotted-line";
};
function Separator({ type = "dashed-line" }: SeparatorProps) {
	if (type === "slashed-line") {
		return (
			<span
				className="h-8 w-full block border-y border-ds-border border-dashed trace-texture"
				aria-hidden
			/>
		);
	}

	if (type === "dotted-line") {
		return <span className="h-8 w-full block dots-texture" aria-hidden />;
	}

	return (
		<span
			className="h-px border-b border-ds-border border-dashed w-full block pointer-events-none"
			aria-hidden
		/>
	);
}

export { Separator };
