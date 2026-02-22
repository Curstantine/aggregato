import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { svelteKitHandler } from "better-auth/svelte-kit";

import { building } from "$app/environment";

import { auth, type User } from "$lib/server/auth";
import * as theme from "$lib/server/theme";

const handleTheme: Handle = async ({ event, resolve }) => {
	const {
		locals: { user },
		request: { headers }
	} = event;

	const useSystem = user === undefined || user.prefThemeMode === "system";

	if (useSystem && theme.shouldRequestHeader(headers)) {
		return new Response(null, {
			headers: new Headers({
				"Accept-CH": theme.headerPrefersColorScheme,
				Vary: theme.headerPrefersColorScheme,
				"Critical-CH": theme.headerPrefersColorScheme
			})
		});
	}

	const mode = user?.prefThemeMode ?? "system";
	const dTheme = useSystem ? (theme.getHeaderValue(headers) ?? "dark") : user.prefThemeMode;

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
