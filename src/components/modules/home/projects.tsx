import { Empty } from "@/components/shared/empty";

const Projects = () => {
	return (
		<section className="flex w-full flex-col gap-8 pt-4 md:max-w-5xl md:mx-auto md:px-0">
			<div className="flex flex-col gap-12 px-4 md:px-0">
				<h2 className="text-title">I've also built these</h2>
			</div>

			<div className="p-4">
				<Empty className="min-h-40" message="Coming soon..." />
			</div>
		</section>
	);
};

export { Projects };
