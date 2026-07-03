import { cx } from "class-variance-authority";
import type { StaticImageData } from "next/image";
import Image from "next/image";

import beastGarden from "@/assets/icons/beast-garden.png";
import decorator from "@/assets/icons/decorator.svg";
import highnote from "@/assets/icons/highnote.svg";
import octave from "@/assets/icons/octave.svg";
import oliveland from "@/assets/icons/oliveland.png";
import promptd from "@/assets/icons/promptd.svg";
import sisvenda from "@/assets/icons/sisvenda.svg";
import zipper from "@/assets/icons/zipper.svg";
import zos from "@/assets/icons/zos.png";

const projectIcons = {
	"beast-garden.png": beastGarden,
	"highnote.svg": highnote,
	"octave.svg": octave,
	"oliveland.png": oliveland,
	"promptd.svg": promptd,
	"zipper.svg": zipper,
	"zos.png": zos,
	"sisvenda.svg": sisvenda,
} satisfies Record<string, StaticImageData | string>;

function resolveProjectIcon(iconPath: string) {
	const filename = iconPath.replace(/^\/?icons\//, "");

	return projectIcons[filename as keyof typeof projectIcons] ?? decorator;
}

type ProjectCardProps = React.HTMLAttributes<HTMLElement> & {
	title: string;
	description: string;
	icon: string;
};

function ProjectCard({
	icon,
	title,
	description,
	className,
	...props
}: ProjectCardProps) {
	const projectLogo = resolveProjectIcon(icon);

	return (
		<figure
			{...props}
			className={cx(
				"flex flex-col items-center justify-center gap-4 relative bg-ds-background-secondary min-h-72 w-50 border-b border-ds-primary",
				className,
			)}
		>
			<Image
				src={projectLogo}
				alt={title}
				className="max-h-20 object-contain justify-self-center"
			/>
			<figcaption className="font-pixel absolute uppercase text-heading-24 leading-none top-3 left-3 [writing-mode:vertical-lr]">
				{title}
			</figcaption>
			<p className="text-label-10 text-ds-text-secondary uppercase font-light absolute bottom-3 left-3">
				{description}
			</p>
		</figure>
	);
}

export type { ProjectCardProps };
export { ProjectCard, resolveProjectIcon };
