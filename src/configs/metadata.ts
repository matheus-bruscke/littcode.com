import type { Metadata } from "next";

const SITE_URL = "https://littcode.com";
const SITE_NAME = "Littcode";
const DEFAULT_DESCRIPTION = "Matheus Bruscke's portfolio and technical blog.";
const DEFAULT_OG_IMAGE = "/og.jpg";

const SOCIALS = {
	bluesky: {
		label: "Bluesky",
		href: "https://bsky.app/profile/littcode.com",
	},
	linkedin: {
		label: "LinkedIn",
		href: "https://linkedin.com/in/matheus-bruscke",
	},
	github: {
		label: "GitHub",
		href: "https://github.com/matheus-bruscke",
	},
};

const CALLENDLY_URL = "https://calendly.com/matheus-bruscke/30min";

function absoluteUrl(path: string) {
	return new URL(path, SITE_URL).toString();
}

type PageMetadataOptions = {
	title: string;
	description?: string;
	path: string;
	image?: string | null;
	absolute?: boolean;
	type?: "website" | "article";
	publishedTime?: string;
	tags?: string[];
};

function createPageMetadata({
	title,
	description = DEFAULT_DESCRIPTION,
	path,
	image = DEFAULT_OG_IMAGE,
	absolute = false,
	type = "website",
	publishedTime,
	tags,
}: PageMetadataOptions): Metadata {
	const url = absoluteUrl(path);

	const metadata: Metadata = {
		title: absolute ? { absolute: title } : title,
		description,
		alternates: {
			canonical: url,
		},
		openGraph: {
			title,
			description,
			url,
			type,
			...(type === "article" && publishedTime ? { publishedTime, tags } : {}),
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
		},
	};

	if (image !== null) {
		const imageUrl = absoluteUrl(image);

		metadata.openGraph = {
			...metadata.openGraph,
			images: [imageUrl],
		};
		metadata.twitter = {
			...metadata.twitter,
			images: [imageUrl],
		};
	}

	return metadata;
}

const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		template: `%s | ${SITE_NAME}`,
		default: SITE_NAME,
	},
	description: DEFAULT_DESCRIPTION,
	icons: {
		icon: "/favicon.ico",
	},
	authors: [
		{
			name: "Matheus Bruscke",
			url: SITE_URL,
		},
	],
	creator: "Matheus Bruscke",
	openGraph: {
		type: "website",
		locale: "en_US",
		url: SITE_URL,
		siteName: SITE_NAME,
		images: [absoluteUrl(DEFAULT_OG_IMAGE)],
	},
	twitter: {
		card: "summary_large_image",
		images: [absoluteUrl(DEFAULT_OG_IMAGE)],
	},
	keywords: [
		"Littcode",
		"Matheus Bruscke",
		"Blog",
		"Portfolio",
		"Developer",
		"Software Engineer",
		"Software Developer",
		"Software Architect",
	],
};

export {
	CALLENDLY_URL,
	createPageMetadata,
	DEFAULT_DESCRIPTION,
	metadata,
	SITE_NAME,
	SITE_URL,
	SOCIALS,
};
