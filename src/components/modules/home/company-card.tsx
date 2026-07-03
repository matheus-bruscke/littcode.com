import { cx } from "class-variance-authority";

type CompanyCardProps = React.HTMLAttributes<HTMLElement> & {
	position: string;
	company: string;
	description: string;
	date: string;
	active: boolean;
	showProjects?: boolean;
	projects?: React.ReactNode;
};

function CompanyCard({
	position,
	company,
	description,
	date,
	active = false,
	showProjects = false,
	projects,
	...props
}: CompanyCardProps) {
	return (
		<article
			className={cx(
				"flex w-full flex-col gap-4 p-4 border-l cursor-pointer group md:hover:bg-ds-background-secondary",
				active && !showProjects
					? "border-ds-primary bg-ds-primary/10 pointer-events-none"
					: active && showProjects
						? "border-ds-primary bg-ds-background-secondary/50 pointer-events-none"
						: "border-transparent",
			)}
			{...props}
		>
			<header className="flex items-center justify-between w-full gap-2">
				<span className="text-label-12 font-medium font-pixel uppercase text-ds-primary">
					{position}
				</span>
				<time
					dateTime={date}
					className={cx(
						"text-ds-border text-label-12 uppercase",
						active && "text-ds-text-secondary",
					)}
				>
					{date}
				</time>
			</header>
			<div className="flex flex-col gap-2">
				<h2 className="text-heading-20 font-medium text-ds-text">{company}</h2>
				<p className="text-copy-16 font-light text-ds-text-secondary">
					{description}
				</p>
			</div>
			{active && showProjects && (
				<div className="pointer-events-auto">{projects}</div>
			)}
		</article>
	);
}

export { CompanyCard };
