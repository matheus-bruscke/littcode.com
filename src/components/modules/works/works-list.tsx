"use client";
import cx from "clsx";
import Link from "next/link";
import { useState } from "react";
import { Tag } from "@/components/shared/tag";
import works from "@/contents/works.json";

type AccordionItem = {
	idx: number;
	section: "stack" | "projects";
};

const WorksList = () => {
	const [activeAccordion, setActiveAccordion] = useState<AccordionItem | null>(
		null,
	);

	const handleExperienceAccordion = (
		idx: number,
		section: AccordionItem["section"],
	) => {
		if (activeAccordion?.idx === idx && activeAccordion?.section === section) {
			setActiveAccordion(null);
			return;
		}
		setActiveAccordion({ idx, section });
	};

	return (
		<ul className="px-4 flex flex-col gap-2 w-full">
			{works.map((work, idx) => (
				<li
					key={work.company}
					className="py-4 flex flex-col not-last:border-b border-ds-border border-dashed gap-4"
				>
					<header className="flex items-center justify-between w-full gap-2">
						<span className="text-label-12 font-medium font-pixel uppercase text-ds-primary">
							{work.role}
						</span>
						<time
							dateTime={work.startDate}
							className={cx("text-ds-border text-label-12 uppercase")}
						>
							{work.startDate}
						</time>
					</header>
					<div className="flex flex-col gap-2">
						<h2 className="text-heading-20 font-medium text-ds-text">
							{work.company}
						</h2>
						<p className="text-copy-16 font-light text-ds-text-secondary">
							{work.description}
						</p>
					</div>

					<footer className="relative flex flex-col gap-4">
						<span
							aria-hidden
							className="absolute left-0 top-0 bottom-0 w-px bg-ds-border"
						/>

						<div className="relative flex flex-col gap-1">
							<button
								onClick={() => handleExperienceAccordion(idx, "projects")}
								type="button"
								className="text-label-12 cursor-pointer font-medium font-pixel uppercase w-fit text-ds-border"
							>
								– projects
							</button>
							{activeAccordion?.idx === idx &&
								activeAccordion?.section === "projects" && (
									<nav className="flex flex-wrap items-center gap-2 ml-4 my-4">
										{work.projects.map((project) => (
											<Link
												href={project.link}
												key={project.name}
												target="_blank"
											>
												<Tag variant="default" label={project.name} />
											</Link>
										))}
									</nav>
								)}
						</div>

						<div className="relative flex flex-col gap-1">
							<button
								onClick={() => handleExperienceAccordion(idx, "stack")}
								type="button"
								className="text-label-12 cursor-pointer font-medium font-pixel uppercase w-fit text-ds-border"
							>
								– stack
							</button>
							{activeAccordion?.idx === idx &&
								activeAccordion?.section === "stack" && (
									<ul className="flex flex-wrap items-center gap-4 ml-4 mt-4">
										{work.technologies.map((stack) => (
											<li
												key={stack}
												className="text-label-12 font-medium font-pixel uppercase"
											>
												<Tag variant="default" label={stack} />
											</li>
										))}
									</ul>
								)}
						</div>
					</footer>
				</li>
			))}
		</ul>
	);
};

export { WorksList };
