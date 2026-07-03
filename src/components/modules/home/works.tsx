"use client";

import { cva, cx, type VariantProps } from "class-variance-authority";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { ProjectCard } from "@/components/modules/home/project-card";
import works from "@/contents/works.json";
import { useIsVisible } from "@/hooks/use-is-visible";
import { useMedia } from "@/hooks/use-media";
import { CompanyCard } from "./company-card";

const PROJECT_TIME_INTERVAL = 2000;

function TechStackItem({
	tech,
	"aria-hidden": ariaHidden,
}: {
	tech: string;
	"aria-hidden"?: boolean;
}) {
	return (
		<li
			aria-hidden={ariaHidden}
			className="flex shrink-0 font-pixel uppercase text-copy-14 items-center gap-2 font-medium text-ds-text-secondary"
		>
			<span>{tech}</span>
			<span className="size-1 bg-ds-text-secondary" aria-hidden />
		</li>
	);
}

const cardVariants = cva(
	"absolute top-0 left-1/2 scale-80 opacity-50 transition-transform duration-500 ease-out",
	{
		variants: {
			position: {
				current: "z-10 -translate-x-1/2 scale-100 opacity-100",
				previous: "z-0 -translate-x-[calc(50%+5.5rem)]",
				next: "z-0 -translate-x-[calc(50%-5.5rem)]",
			},
		},
	},
);

function getProjectPosition(
	index: number,
	activeProject: number,
	projectCount: number,
): NonNullable<VariantProps<typeof cardVariants>["position"]> {
	if (projectCount <= 1) return "current";
	if (index === activeProject) return "current";

	const nextIndex = (activeProject + 1) % projectCount;

	return index === nextIndex ? "next" : "previous";
}

function formatWorkDate(startDate: string, endDate: string) {
	return `${startDate} – ${endDate}`;
}

type Project = {
	name: string;
	description: string;
	link: string;
	icon: string;
};

const ProjectList = ({
	projects,
	activeProject,
	onProjectChange,
	isVisible,
	technologies,
	embedded = false,
}: {
	projects: Project[];
	activeProject: number;
	onProjectChange: (index: number) => void;
	isVisible: boolean;
	technologies: string[];
	embedded?: boolean;
}) => {
	const projectCount = projects.length;

	return (
		<div
			id={embedded ? undefined : "work-projects"}
			className={cx(
				embedded
					? "flex w-full flex-col gap-6"
					: "relative hidden col-span-6 flex-col items-center justify-center gap-4 md:flex",
			)}
		>
			<header
				className={cx(
					"flex w-full items-center justify-between gap-2",
					!embedded && "absolute top-4 left-0 px-4",
				)}
			>
				<h3 className="text-label-12 uppercase text-ds-border">Projects</h3>
				{projectCount > 1 && (
					<div className="flex items-center gap-2">
						{projects.map((project, index) => (
							<button
								className={cx(
									"size-1 bg-ds-border",
									index === activeProject && "bg-ds-text-accent",
								)}
								key={project.name}
								type="button"
								onClick={() => onProjectChange(index)}
							/>
						))}
					</div>
				)}
			</header>
			{projectCount > 1 && (
				<div
					className={cx(
						"relative h-px w-full bg-ds-border",
						embedded ? "max-w-full" : "mb-8 max-w-3/5",
					)}
				>
					<span
						key={activeProject}
						className={cx(
							"absolute top-0 left-0 h-px w-full bg-ds-text-accent",
							isVisible && "animate-progress-bar",
						)}
					/>
				</div>
			)}
			<ul className="relative mx-auto mb-20 h-72 w-full overflow-hidden">
				{projects.map((project, index) => (
					<li
						key={project.name}
						className={cardVariants({
							position: getProjectPosition(index, activeProject, projectCount),
						})}
					>
						<Link href={project.link} target="_blank" rel="noopener noreferrer">
							<ProjectCard
								icon={project.icon}
								title={project.name}
								description={project.description}
							/>
						</Link>
					</li>
				))}
			</ul>
			<div
				className={cx(
					"space-y-4 border-t border-ds-border border-dashed py-4",
					!embedded && "absolute bottom-0 left-0 w-full overflow-hidden",
				)}
			>
				<h3
					className={cx(
						"text-label-12 uppercase text-ds-border",
						!embedded && "ml-4",
					)}
				>
					Tech Stack
				</h3>
				<div className="overflow-hidden">
					<ul className="flex w-max items-center gap-2 animate-infinite-scroll">
						{technologies.map((tech) => (
							<TechStackItem key={tech} tech={tech} />
						))}
						{technologies.map((tech) => (
							<TechStackItem
								key={`${tech}-duplicate`}
								tech={tech}
								aria-hidden
							/>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

function Works() {
	const [activeCompany, setActiveCompany] = useState(0);
	const [activeProject, setActiveProject] = useState(0);

	const ref = useRef<HTMLElement | null>(null);
	const isVisible = useIsVisible(ref as React.RefObject<HTMLElement>);

	const isMobile = useMedia("(max-width: 640px)");

	const { projects, projectCount, technologies } = useMemo(() => {
		const activeWork = works[activeCompany];

		return {
			projects: activeWork.projects,
			projectCount: activeWork.projects.length,
			technologies: activeWork.technologies,
		};
	}, [activeCompany]);

	useEffect(() => {
		if (!isVisible || projectCount <= 1) return;

		const interval = setInterval(() => {
			setActiveProject((prev) => (prev + 1) % projectCount);
		}, PROJECT_TIME_INTERVAL);

		return () => clearInterval(interval);
	}, [isVisible, projectCount]);

	function handleCompanyChange(index: number) {
		setActiveCompany(index);
		setActiveProject(0);
	}

	const sidebarProjects = useMemo(
		() => (
			<ProjectList
				projects={projects}
				activeProject={activeProject}
				onProjectChange={setActiveProject}
				isVisible={isVisible}
				technologies={technologies}
			/>
		),
		[projects, activeProject, isVisible, technologies],
	);

	const embeddedProjects = useMemo(
		() => (
			<ProjectList
				embedded
				projects={projects}
				activeProject={activeProject}
				onProjectChange={setActiveProject}
				isVisible={isVisible}
				technologies={technologies}
			/>
		),
		[projects, activeProject, isVisible, technologies],
	);

	return (
		<section
			ref={ref}
			className="flex w-full flex-col gap-8 pt-4 md:max-w-5xl md:mx-auto md:px-0"
		>
			<div className="flex flex-col gap-12 px-4 md:px-0">
				<h2 className="text-title">I've been part of</h2>
			</div>
			<div className="w-full md:grid md:grid-cols-16">
				{!isMobile && sidebarProjects}
				<div
					id="work-companies"
					className="w-full md:col-span-10 px-4 md:px-0 flex md:max-h-[524px] overflow-y-auto flex-col border-l border-ds-border border-dashed"
				>
					{works.map((work, index) => (
						<CompanyCard
							key={work.company}
							position={work.role}
							company={work.company}
							description={work.description}
							date={formatWorkDate(work.startDate, work.endDate)}
							active={activeCompany === index}
							showProjects={isMobile}
							onClick={() => handleCompanyChange(index)}
							projects={embeddedProjects}
						/>
					))}
				</div>
			</div>
		</section>
	);
}

export { Works };
