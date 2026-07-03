import { WorksList } from "@/components/modules/works/works-list";

export default function WorksPage() {
	return (
		<main className="px-4 space-y-8 w-full md:max-w-5xl md:mx-auto md:px-0 md:flex-1">
			<article className="order-2 md:order-1 py-4 flex flex-col gap-4 col-span-12 md:col-span-8">
				<h1 className="text-title">Works</h1>
				<h2 className="px-4 text-heading-20 text-ds-text-secondary font-medium">
					An overview of my professional experience, featuring selected projects
					and roles that showcase my skills and impact.
				</h2>
			</article>

			<WorksList />
		</main>
	);
}
