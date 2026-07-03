"use client";

import { cx } from "class-variance-authority";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { APP_ROUTES, type AppRoute } from "@/configs/routes";
import { type HotkeyConfig, useCustomHotkey } from "@/hooks/use-hotkeys";

function isActiveRoute(pathname: string, path: string) {
	if (path === "/") return pathname === path;

	// Remove the first slash from the path
	const [, ...rest] = path.split("/");

	return pathname.includes(rest.join("/"));
}

function Header() {
	const pathname = usePathname() as AppRoute;
	const router = useRouter();

	const HOTKEYS: HotkeyConfig[] = useMemo(
		() =>
			Object.entries(APP_ROUTES).map(([path, label]) => ({
				targetKey: label.charAt(0).toLocaleLowerCase(),
				callback: () => {
					router.push(path);
				},
			})),
		[router],
	);

	useCustomHotkey(HOTKEYS);

	return (
		<header className="sticky top-0 z-50 bg-ds-background/50 backdrop-blur-sm h-9 border-b border-ds-border border-dashed">
			<div className="grid grid-cols-3 px-4 md:px-0 max-w-5xl md:mx-auto h-full md:flex md:items-center">
				{Object.entries(APP_ROUTES).map(([path, label]) => (
					<Link
						className={cx(
							"flex font-pixel uppercase h-full items-center justify-center md:px-4",
							isActiveRoute(pathname, path) && "dots-primary-texture",
						)}
						key={path}
						href={path}
					>
						<span
							className={cx(
								"bg-ds-background z-10 leading-none",
								isActiveRoute(pathname, path) && "text-ds-primary",
							)}
						>
							{`[${label.charAt(0).toLocaleLowerCase()}]`} {label}
						</span>
					</Link>
				))}
			</div>
		</header>
	);
}

export { Header };
