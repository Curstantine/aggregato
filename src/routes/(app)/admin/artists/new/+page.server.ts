import { fail, redirect } from "@sveltejs/kit";
import { type } from "arktype";

import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { generateRandomId } from "$lib/server/utils";
import { formArtistData } from "$lib/server/validator/admin-artist";
import { toSerArkErrors } from "$lib/server/validator/utils";

import type { Actions } from "./$types";

export const actions: Actions = {
	default: async ({ request, locals }) => {
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

		await db.insert(table.artist).values({
			id: generateRandomId(),
			name: out.name,
			status: out.status,
			externalLastfmLink: out.externalLastfmLink,
			externalMusicBrainzId: out.externalMusicBrainzId,
			externalAppleMusicId: out.externalAppleMusicId,
			externalYouTubeMusicId: out.externalYouTubeMusicId,
			externalSpotifyId: out.externalSpotifyId,
			externalDeezerId: out.externalDeezerId
		});

		return redirect(303, "/admin/artists");
	}
};
