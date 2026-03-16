import { error, fail, redirect } from "@sveltejs/kit";
import { type } from "arktype";
import { eq } from "drizzle-orm";

import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { formArtistData } from "$lib/server/validator/admin-artist";
import { toSerArkErrors } from "$lib/server/validator/utils";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
	const artist = await db
		.select()
		.from(table.artist)
		.where(eq(table.artist.id, params.id))
		.limit(1);

	if (artist.length === 0) {
		return error(404, { message: "Artist not found" });
	}

	return { artist: artist[0] };
};

export const actions: Actions = {
	update: async ({ request, locals, params }) => {
		if (!locals.user || locals.user.role !== "admin") {
			return fail(403, { message: "Forbidden", invalid: undefined });
		}

		const formData = await request.formData();
		const out = formArtistData(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid artist data",
				invalid: toSerArkErrors(out)
			});
		}

		const existing = await db
			.select({ id: table.artist.id })
			.from(table.artist)
			.where(eq(table.artist.id, params.id))
			.limit(1);

		if (existing.length === 0) {
			return fail(404, { message: "Artist not found", invalid: undefined });
		}

		await db
			.update(table.artist)
			.set({
				name: out.name,
				status: out.status,
				externalLastfmLink: out.externalLastfmLink,
				externalMusicBrainzId: out.externalMusicBrainzId,
				externalAppleMusicId: out.externalAppleMusicId,
				externalYouTubeMusicId: out.externalYouTubeMusicId,
				externalSpotifyId: out.externalSpotifyId,
				externalDeezerId: out.externalDeezerId
			})
			.where(eq(table.artist.id, params.id));

		return { success: true };
	},

	delete: async ({ locals, params }) => {
		if (!locals.user || locals.user.role !== "admin") {
			return fail(403, { message: "Forbidden" });
		}

		const existing = await db
			.select({ id: table.artist.id })
			.from(table.artist)
			.where(eq(table.artist.id, params.id))
			.limit(1);

		if (existing.length === 0) {
			return fail(404, { message: "Artist not found" });
		}

		await db.delete(table.artist).where(eq(table.artist.id, params.id));

		return redirect(303, "/admin/artists");
	}
};
