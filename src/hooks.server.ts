import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

import * as auth from "$lib/server/auth";
import * as theme from "$lib/server/theme";

const handleTheme: Handle = async ({ event, resolve }) => {
	const {
		locals: { user },
		request: { headers }
	} = event;

	const useSystem = user === null || user.prefThemeMode === "system";

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

const handleAuth: Handle = async ({ event, resolve }) => {
	const sessionToken = event.cookies.get(auth.sessionCookieName);

	if (!sessionToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	const { session, user } = await auth.validateSessionToken(sessionToken);

	if (session) {
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
	} else {
		auth.deleteSessionTokenCookie(event);
	}

	event.locals.user = user;
	event.locals.session = session;
	return resolve(event);
};

export const handle: Handle = sequence(handleAuth, handleTheme);
