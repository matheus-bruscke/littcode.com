import "@/styles/index.css";
import { cx } from "class-variance-authority";
import { NuqsAdapter } from "nuqs/adapters/next";
import { GuideLines } from "@/components/layout/guide";
import { Header } from "@/components/layout/header";
import { aspekta, fragmentMono, vsrOsd } from "@/configs/fonts";

export { metadata } from "@/configs/metadata";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cx(aspekta.variable, vsrOsd.variable, fragmentMono.variable)}
		>
			<NuqsAdapter>
				<body className="flex flex-col min-h-screen">
					<Header />
					<GuideLines />
					{children}
				</body>
			</NuqsAdapter>
		</html>
	);
}
