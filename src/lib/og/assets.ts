import { readFile } from "node:fs/promises";
import path from "node:path";

type OgFont = {
	name: string;
	data: ArrayBuffer;
	weight: 400 | 500 | 700;
	style: "normal";
};

let fontsPromise: Promise<OgFont[]> | null = null;

function getOgFonts() {
	if (!fontsPromise) {
		fontsPromise = Promise.all([
			readFile(
				path.join(process.cwd(), "src/assets/fonts/aspekta/aspekta-700.otf"),
			),
			readFile(
				path.join(process.cwd(), "src/assets/fonts/aspekta/aspekta-500.otf"),
			),
			readFile(
				path.join(
					process.cwd(),
					"src/assets/fonts/vsr-osd/VCR_OSD_MONO_1.001.ttf",
				),
			),
		]).then(([bold, medium, pixel]) => [
			{
				name: "Aspekta",
				data: bold.buffer as ArrayBuffer,
				weight: 700 as const,
				style: "normal" as const,
			},
			{
				name: "Aspekta",
				data: medium.buffer as ArrayBuffer,
				weight: 500 as const,
				style: "normal" as const,
			},
			{
				name: "VCR OSD Mono",
				data: pixel.buffer as ArrayBuffer,
				weight: 400 as const,
				style: "normal" as const,
			},
		]);
	}

	return fontsPromise;
}

async function getTextureDataUrl(filename: string) {
	const file = await readFile(
		path.join(process.cwd(), "src/assets/textures", filename),
	);

	return `data:image/svg+xml;base64,${file.toString("base64")}`;
}

async function createRepeatingTextureDataUrl(
	width: number,
	height: number,
	filename: string,
	options?: { tileWidth?: number; tileHeight?: number; opacity?: number },
) {
	const tileWidth = options?.tileWidth ?? 169;
	const tileHeight = options?.tileHeight ?? 78;
	const opacity = options?.opacity ?? 0.35;

	const textureSvg = await readFile(
		path.join(process.cwd(), "src/assets/textures", filename),
		"utf-8",
	);
	const inner = textureSvg.match(/<svg[^>]*>([\s\S]*)<\/svg>/i)?.[1] ?? "";

	const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
		<defs>
			<pattern id="texture" width="${tileWidth}" height="${tileHeight}" patternUnits="userSpaceOnUse">
				<svg width="${tileWidth}" height="${tileHeight}" viewBox="0 0 170 79">${inner}</svg>
			</pattern>
			<linearGradient id="fade" x1="0%" y1="100%" x2="85%" y2="0%">
				<stop offset="0%" stop-color="#000000" stop-opacity="0.95" />
				<stop offset="50%" stop-color="#000000" stop-opacity="0.5" />
				<stop offset="100%" stop-color="#000000" stop-opacity="0" />
			</linearGradient>
		</defs>
		<rect width="${width}" height="${height}" fill="url(#texture)" opacity="${opacity}" />
		<rect width="${width}" height="${height}" fill="url(#fade)" />
	</svg>`;

	return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

async function getCoverDataUrl(filename: string) {
	const file = await readFile(
		path.join(process.cwd(), "public/posts/attachments", filename),
	);
	const extension = path.extname(filename).slice(1).toLowerCase();
	const mime = extension === "jpg" ? "jpeg" : extension;

	return `data:image/${mime};base64,${file.toString("base64")}`;
}

export {
	createRepeatingTextureDataUrl,
	getCoverDataUrl,
	getOgFonts,
	getTextureDataUrl,
};
