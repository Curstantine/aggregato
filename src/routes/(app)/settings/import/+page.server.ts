import { fail, redirect } from "@sveltejs/kit";
import { type } from "arktype";
import { eq } from "drizzle-orm";

import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { arkFormParser, toSerArkErrors } from "$lib/server/validator/utils";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) return redirect(307, "/auth/login");

	const user = await db
		.select({
			lastfmUsername: table.user.importLastfmUsername,
			listenBrainzUsername: table.user.importListenBrainzUsername
		})
		.from(table.user)
		.where(eq(table.user.id, event.locals.user.id))
		.limit(1);

	return user.at(0);
};

const ImportData = type({ username: "string", mode: "'top-10' | 'top-50' | 'all'" });

const formImportData = arkFormParser.pipe(ImportData);

export const actions: Actions = {
	lastfm: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, {
				message: "You need to be logged into start an import",
				invalid: []
			});
		}

		const formData = await request.formData();
		const isJSAllowed = formData.has("js-allowed");
		const out = formImportData(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid lastfm data",
				invalid: toSerArkErrors(out)
			});
		}

		await db
			.update(table.user)
			.set({ importLastfmUsername: out.username })
			.where(eq(table.user.id, locals.user.id));

		return { success: true, runImportLocally: isJSAllowed, type: "import-lastfm", params: out };
	},
	listenbrainz: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, {
				message: "You need to be logged into start an import",
				invalid: []
			});
		}

		const formData = await request.formData();
		const isJSAllowed = formData.has("js-allowed");
		const out = formImportData(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid lastfm data",
				invalid: toSerArkErrors(out)
			});
		}

		await db
			.update(table.user)
			.set({ importListenBrainzUsername: out.username })
			.where(eq(table.user.id, locals.user.id));

		return {
			success: true,
			runImportLocally: isJSAllowed,
			type: "import-listenbrainz",
			params: out
		};
	}
};
