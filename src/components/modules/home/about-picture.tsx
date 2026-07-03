"use client";

import type { StaticImageData } from "next/image";
import Image from "next/image";

type AboutPictureProps = {
	image: StaticImageData;
};

function AboutPicture({ image }: AboutPictureProps) {
	return (
		<div className="flex-col hidden md:flex relative justify-end md:border-l md:h-full border-ds-border border-dashed md:col-span-4">
			<figure className="h-[400px] w-full relative">
				<Image
					src={image}
					alt="Matheus Bruscke"
					fill
					loading="eager"
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className="object-cover object-top"
				/>
			</figure>
			<code className="text-label-12 text-ds-border hover:text-ds-accent uppercase font-pixel [writing-mode:vertical-lr] absolute top-4 right-4">
				Matheus Bruscke
			</code>
		</div>
	);
}

export { AboutPicture };
