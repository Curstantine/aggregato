import { redirect } from "@sveltejs/kit";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) return redirect(307, "/auth/login");
	return {};
};

export const actions: Actions = {
	lastfm: () => {},
	listenbrainz: () => {}
};
