import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { svelteKitHandler } from "better-auth/svelte-kit";

import { building } from "$app/environment";

import { auth, type User } from "$lib/server/auth";
import * as theme from "$lib/server/theme";

const VALID_THEMES = new Set(["light", "dark"]);

const handleTheme: Handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith("/api") || event.isDataRequest) return resolve(event);

	const {
		locals: { user },
		request: { headers }
	} = event;

	const hasExplicitPref = user !== undefined && user.prefThemeMode !== "system";
	if (!hasExplicitPref && theme.shouldRequestHeader(headers)) {
		return new Response(null, {
			status: 200,
			headers: new Headers({
				"Accept-CH": theme.headerPrefersColorScheme,
				Vary: theme.headerPrefersColorScheme,
				"Critical-CH": theme.headerPrefersColorScheme
			})
		});
	}

	const mode = user?.prefThemeMode ?? "system";
	const resolved = hasExplicitPref ? user.prefThemeMode : theme.getHeaderValue(headers);
	const dTheme = VALID_THEMES.has(resolved ?? "") ? resolved : "dark";

	return resolve(event, {
		transformPageChunk: ({ html }) => {
			return html.replace("<html", `<html data-theme="${dTheme}" data-theme-mode="${mode}"`);
		}
	});
};

const handleBetterAuth: Handle = async ({ event, resolve }) => {
	const session = await auth.api.getSession({ headers: event.request.headers });

	if (session) {
		event.locals.session = session.session;
		event.locals.user = session.user as User;
	}

	return svelteKitHandler({ event, resolve, auth, building });
};

export const handle = sequence(handleBetterAuth, handleTheme);
