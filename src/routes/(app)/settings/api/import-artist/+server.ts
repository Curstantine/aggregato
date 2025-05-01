import { error, json } from "@sveltejs/kit";
import { type } from "arktype";

import { getMBZArtist } from "$lib/server/external-meta";
import { ImportArtistBody } from "$lib/server/validator/artist";

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async (event) => {
	if (!event.locals.user) {
		error(401, { message: "You need to be logged in" });
	}

	const body = ImportArtistBody(await event.request.json());
	if (body instanceof type.errors) {
		error(400, body.summary);
	}

	if (body.mbid) {
		try {
			const mbzData = await getMBZArtist(body.mbid);
			console.log(mbzData);
		} catch (e) {
			if (e instanceof Error) error(400, { message: e.toString() });
			error(400, "Unknown MusicBrainz error");
		}
	}

	return json({ message: "done" });
};
