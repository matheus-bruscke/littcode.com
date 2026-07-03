const APP_ROUTES = {
	"/": "Home",
	"/blog": "Blog",
	"/works": "Works",
} as const;

type AppRoute = keyof typeof APP_ROUTES;

export type { AppRoute };
export { APP_ROUTES };
