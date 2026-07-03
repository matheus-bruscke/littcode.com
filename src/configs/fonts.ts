import localFont from "next/font/local";

const aspekta = localFont({
	src: [
		{
			path: "../assets/fonts/aspekta/aspekta-200.otf",
			weight: "200",
			style: "normal",
		},
		{
			path: "../assets/fonts/aspekta/aspekta-300.otf",
			weight: "300",
			style: "normal",
		},
		{
			path: "../assets/fonts/aspekta/aspekta-400.otf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../assets/fonts/aspekta/aspekta-500.otf",
			weight: "500",
			style: "normal",
		},
		{
			path: "../assets/fonts/aspekta/aspekta-600.otf",
			weight: "600",
			style: "normal",
		},
		{
			path: "../assets/fonts/aspekta/aspekta-700.otf",
			weight: "700",
			style: "normal",
		},
	],
	variable: "--font-aspekta",
	display: "swap",
});

export const vsrOsd = localFont({
	src: [
		{
			path: "../assets/fonts/vsr-osd/VCR_OSD_MONO_1.001.ttf",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-vsr-osd",
	display: "swap",
});

const fragmentMono = localFont({
	src: [
		{
			path: "../assets/fonts/fragment-mono/FragmentMono-Regular.ttf",
			weight: "400",
			style: "normal",
		},
		{
			path: "../assets/fonts/fragment-mono/FragmentMono-Italic.ttf",
			weight: "400",
			style: "italic",
		},
	],
	variable: "--font-fragment-mono",
	display: "swap",
});

export { aspekta, fragmentMono };
