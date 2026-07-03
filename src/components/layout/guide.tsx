function GuideLines() {
	return (
		<div
			aria-hidden
			className="fixed inset-0 pointer-events-none z-50 flex justify-center"
		>
			<div className="w-full max-w-5xl md:px-4 h-full relative">
				<span className="h-full w-px border-r border-ds-border border-dashed absolute top-0 right-4 md:right-0" />
				<span className="h-screen w-px border-r border-ds-border border-dashed absolute top-0 left-4 md:left-0" />
			</div>
		</div>
	);
}

export { GuideLines };
