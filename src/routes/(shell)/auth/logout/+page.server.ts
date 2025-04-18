import { fail, redirect } from "@sveltejs/kit";

import * as auth from "$lib/server/auth";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) return redirect(302, "/");
};

export const actions: Actions = {
	default: async (event) => {
		if (!event.locals.session) return fail(401);

		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		redirect(302, "/auth/login");
	}
};
