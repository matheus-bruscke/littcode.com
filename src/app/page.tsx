import { Separator } from "@/components/layout/separator";
import { About } from "@/components/modules/home/about";
import { Posts } from "@/components/modules/home/posts";
import { Projects } from "@/components/modules/home/projects";
import { Works } from "@/components/modules/home/works";
import { createPageMetadata, SITE_NAME } from "@/configs/metadata";

export const metadata = createPageMetadata({
	title: SITE_NAME,
	path: "/",
	absolute: true,
});

export default async function Home() {
	return (
		<main className="flex flex-col">
			<About />
			<Separator />
			<Posts />
			<Separator />
			<Works />
			<Separator />
			<Projects />
		</main>
	);
}
