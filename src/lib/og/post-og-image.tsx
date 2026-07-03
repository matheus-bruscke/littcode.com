import { ImageResponse } from "next/og";
import { resolvePostCoverFilename } from "@/lib/posts/resolve-cover";
import type { PostMeta } from "@/services/posts/models";
import {
	createRepeatingTextureDataUrl,
	getCoverDataUrl,
	getOgFonts,
} from "./assets";
import { ogColors } from "./colors";

const postOgSize = {
	width: 1200,
	height: 630,
};

const inset = 40;
const contentPadding = 28;
const dividerX = 760;

function createFrameDataUrl(width: number, height: number) {
	const right = width - inset;
	const bottom = height - inset;
	const markers = [
		[inset, inset],
		[dividerX, inset],
		[right, inset],
		[inset, bottom],
		[dividerX, bottom],
		[right, bottom],
	];

	const markerSvg = markers
		.map(
			([x, y]) =>
				`<text x="${x}" y="${y}" fill="${ogColors.marker}" font-size="24" font-family="monospace" text-anchor="middle" dominant-baseline="middle">+</text>`,
		)
		.join("");

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" fill="none">
		<line x1="${inset}" y1="${inset}" x2="${right}" y2="${inset}" stroke="${ogColors.border}" stroke-width="1" stroke-dasharray="2 4"/>
		<line x1="${inset}" y1="${inset}" x2="${inset}" y2="${bottom}" stroke="${ogColors.border}" stroke-width="1" stroke-dasharray="2 4"/>
		<line x1="${inset}" y1="${bottom}" x2="${right}" y2="${bottom}" stroke="${ogColors.border}" stroke-width="1" stroke-dasharray="2 4"/>
		<line x1="${right}" y1="${inset}" x2="${right}" y2="${bottom}" stroke="${ogColors.border}" stroke-width="1" stroke-dasharray="2 4"/>
		<line x1="${dividerX}" y1="${inset}" x2="${dividerX}" y2="${bottom}" stroke="${ogColors.border}" stroke-width="1" stroke-dasharray="2 4"/>
		${markerSvg}
	</svg>`;

	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

async function createPostOgImage(post: PostMeta) {
	const textureWidth = dividerX - inset - contentPadding;
	const textureHeight = 300;
	const contentWidth = dividerX - inset - contentPadding;

	const [fonts, squaresTexture, frame] = await Promise.all([
		getOgFonts(),
		createRepeatingTextureDataUrl(
			textureWidth,
			textureHeight,
			"squares-texture.svg",
		),
		Promise.resolve(createFrameDataUrl(postOgSize.width, postOgSize.height)),
	]);

	const coverFilename = resolvePostCoverFilename(post.cover);
	const coverSrc = coverFilename
		? await getCoverDataUrl(coverFilename).catch(() => null)
		: null;

	const tags = post.tags.join(" · ").toUpperCase();
	const coverPanelWidth = postOgSize.width - dividerX - inset;

	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				position: "relative",
				backgroundColor: ogColors.background,
				fontFamily: "Aspekta",
			}}
		>
			<div
				style={{
					position: "absolute",
					left: inset + contentPadding,
					bottom: inset + contentPadding,
					width: textureWidth,
					height: textureHeight,
					display: "flex",
					overflow: "hidden",
				}}
			>
				{/* biome-ignore lint/performance/noImgElement: required by next/og ImageResponse */}
				<img
					alt=""
					src={squaresTexture}
					width={textureWidth}
					height={textureHeight}
					style={{
						position: "absolute",
						inset: 0,
						width: "100%",
						height: "100%",
					}}
				/>
			</div>

			<div
				style={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "space-between",
					width: contentWidth,
					height: postOgSize.height - inset * 2,
					marginLeft: inset + contentPadding,
					// marginTop: inset + contentPadding,
					paddingRight: 24,
				}}
			>
				<div
					style={{
						display: "flex",
						fontFamily: "VCR OSD Mono",
						fontSize: 14,
						color: ogColors.text,
						textTransform: "uppercase",
						letterSpacing: "0.08em",
						marginTop: inset + contentPadding,
					}}
				>
					{tags}
				</div>

				<div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
					<div
						style={{
							fontSize: 52,
							fontWeight: 700,
							color: ogColors.text,
							lineHeight: 1.05,
							letterSpacing: "-0.03em",
						}}
					>
						{post.title}
					</div>
					<div
						style={{
							fontSize: 28,
							fontWeight: 500,
							color: ogColors.primary,
							lineHeight: 1.2,
							letterSpacing: "-0.02em",
						}}
					>
						{post.headline}
					</div>
				</div>
			</div>

			<div
				style={{
					position: "absolute",
					top: inset,
					right: inset,
					bottom: inset,
					width: coverPanelWidth,
					display: "flex",
					backgroundColor: ogColors.backgroundSecondary,
					overflow: "hidden",
				}}
			>
				{coverSrc ? (
					/* biome-ignore lint/performance/noImgElement: required by next/og ImageResponse */
					<img
						alt=""
						src={coverSrc}
						style={{
							width: "100%",
							height: "100%",
							objectFit: "cover",
						}}
					/>
				) : null}
			</div>

			{/* biome-ignore lint/performance/noImgElement: required by next/og ImageResponse */}
			<img
				alt=""
				src={frame}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					width: postOgSize.width,
					height: postOgSize.height,
				}}
			/>
		</div>,
		{
			...postOgSize,
			fonts,
		},
	);
}

export { createPostOgImage, postOgSize };
