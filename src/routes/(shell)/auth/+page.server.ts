import { fail, redirect } from "@sveltejs/kit";

import * as auth from "$lib/server/auth";

import type { Actions } from "./$types";

export const actions: Actions = {
	logout: async (event) => {
		if (!event.locals.session) return fail(401);

		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		redirect(302, "/auth/login");
	}
};
