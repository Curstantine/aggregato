import { fail, redirect } from "@sveltejs/kit";
import { type } from "arktype";

import { arkFormParser, toSerArkErrors } from "$lib/server/validator/utils";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) return redirect(307, "/auth/login");
	return {};
};

const ImportData = type({ username: "string", mode: "'top-10' | 'top-50' | 'all'" });

const formImportData = arkFormParser.pipe(ImportData);

export const actions: Actions = {
	lastfm: async ({ request }) => {
		const formData = await request.formData();
		const isJSAllowed = formData.has("js-allowed");
		const out = formImportData(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid lastfm data",
				invalid: toSerArkErrors(out)
			});
		}

		return { success: true, runImportLocally: isJSAllowed, type: "import-lastfm", params: out };
	},
	listenbrainz: async ({ request }) => {
		const formData = await request.formData();
		const isJSAllowed = formData.has("js-allowed");
		const out = formImportData(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid lastfm data",
				invalid: toSerArkErrors(out)
			});
		}

		return {
			success: true,
			runImportLocally: isJSAllowed,
			type: "import-listenbrainz",
			params: out
		};
	}
};
