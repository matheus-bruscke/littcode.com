import Link from "next/link";
import { Markdown } from "@/components/shared/markdown";
import getMdnContent from "@/utils/get-mdn-content";
import { AboutPicture } from "./about-picture";

async function About() {
	const aboutText = getMdnContent("about");
	const { default: profile } = await import("@/assets/images/me.png");

	return (
		<section className="flex flex-col md:max-w-5xl md:mx-auto md:px-0 md:grid md:grid-cols-12">
			<div className="flex flex-col gap-4 px-4 pt-4 md:px-0 md:col-span-8">
				<h1 className="text-title">Who am I?</h1>
				<Markdown content={aboutText} className="px-4" />
				<nav className="flex items-center uppercase [&_a]:text-label-12 [&_a]:hover:text-ds-primary [&_a]:font-light [&_a]:bg-ds-background h-9 px-4 text-ds-text-secondary gap-4 trace-texture border-t border-ds-border border-dashed">
					<Link href="/">download resume</Link>
					<Link href="/">read more</Link>
				</nav>
			</div>
			<AboutPicture image={profile} />
		</section>
	);
}

export { About };
