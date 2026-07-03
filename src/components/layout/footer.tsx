import Image from "next/image";
import Link from "next/link";
import wiredLogo from "@/assets/icons/wired-logo.svg";
import { CALLENDLY_URL, SOCIALS } from "@/configs/metadata";
import RealTimeDate from "../shared/real-time-date";

function Footer() {
	return (
		<footer className="w-full pt-4 pb-2 self-end border-t border-ds-border border-dashed">
			<div className="md:max-w-5xl md:mx-auto h-full p-4 flex flex-col gap-8 md:flex-row md:items-end justify-between">
				<div className="flex flex-col gap-8 px-4 md:px-0">
					<div className="flex items-start gap-16">
						<div className="flex flex-col gap-3">
							<span className="text-xs uppercase text-ds-primary font-pixel">
								socials
							</span>
							<nav className="flex flex-col gap-1">
								{Object.entries(SOCIALS).map(([_, social]) => (
									<Link
										href={social.href}
										target="_blank"
										className="text-copy-14 text-ds-text-secondary hover:text-ds-primary"
										key={social.href}
									>
										{social.label}
									</Link>
								))}
							</nav>
						</div>
						<div className="flex flex-col gap-3">
							<span className="text-xs uppercase text-ds-primary font-pixel">
								contact
							</span>
							<div className="flex flex-col gap-1">
								<Link
									href="mailto:matheusbruscke@gmail.com"
									className="text-copy-14 text-ds-text-secondary hover:text-ds-primary"
								>
									matheus-bruscke@gmail.com
								</Link>
								<Link
									href={CALLENDLY_URL}
									target="_blank"
									className="px-4 py-1 text-label-12 w-fit font-pixel font-medium text-ds-background bg-ds-primary uppercase hover:bg-ds-primary/80"
								>
									Book a call with me
								</Link>
							</div>
						</div>
					</div>
					<span className="text-label-12 text-ds-border-hover md:px-0">
						© {new Date().getFullYear()} Matheus Bruscke.
					</span>
				</div>
				<div className="flex flex-col md:items-center items-start gap-4 px-4 md:px-0">
					<Image src={wiredLogo} alt="Wired Org" width={100} height={100} />
					<p className="text-label-12 text-ds-text-secondary md:text-end min-w-44">
						Cacoal City, Brazil <RealTimeDate />
					</p>
				</div>
			</div>
		</footer>
	);
}

export { Footer };
