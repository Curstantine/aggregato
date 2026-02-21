import { error, json } from "@sveltejs/kit";
import { type } from "arktype";
import { or } from "drizzle-orm";

import { db } from "$lib/server/db";
import { eqn } from "$lib/server/db/ops";
import * as table from "$lib/server/db/schema";
import { getMBZArtist } from "$lib/server/external-meta";
import { generateRandomId } from "$lib/server/utils";
import { ImportArtistBody } from "$lib/server/validator/artist";

import { ContentStatus } from "$lib/types/schema";
import type { ImportArtistBodyType } from "$lib/types/validator-shims";

import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async ({ request, locals }) => {
	if (!locals.user) error(401, { message: "You need to be logged in" });

	const body = ImportArtistBody(await request.json());
	if (body instanceof type.errors) {
		error(400, body.summary);
	}

	const existing = await db
		.select()
		.from(table.artist)
		.where(
			or(
				eqn(table.artist.externalLastfmLink, body.lastfmUrl),
				eqn(table.artist.externalMusicBrainzId, body.musicbrainzId),
				eqn(table.artist.externalAppleMusicId, body.appleMusicId),
				eqn(table.artist.externalYouTubeMusicId, body.youtubeMusicId),
				eqn(table.artist.externalSpotifyId, body.spotifyId)
			)
		)
		.limit(1);

	if (existing.length > 0) {
		return json({ data: existing[0] });
	}

	if (body.musicbrainzId) {
		try {
			const data = await handleMusicBrainz(body.musicbrainzId, body);
			return json({ data });
		} catch (e) {
			if (e instanceof Error) error(400, { message: e.toString() });
			error(400, "Unknown MusicBrainz error");
		}
	}

	return json({ message: "done" });
};

async function handleMusicBrainz(id: string, extra: ImportArtistBodyType) {
	const data = await getMBZArtist(id);

	let appleMusicId = extra.appleMusicId ?? null;
	let lastfmUrl = extra.lastfmUrl ?? null;
	let youtubeMusicId = extra.youtubeMusicId ?? null;
	let deezerId = extra.deezerId ?? null;
	let spotifyId = extra.spotifyId ?? null;

	const REGEX_DEEZER_ARTIST_URL = /deezer\.[a-z]{2,3}\/artist\/(\d*)$/;
	const REGEX_YOUTUBE_CHANNEL_ID = /(?<=channel\/).*$/;
	const REGEX_ITUNES_ARTIST_ID = /itunes\.apple\.com\/[a-z]{2,3}\/artist\/id(\d*)$/;
	const REGEX_APPLE_MUSIC_ARTIST_ID = /music\.apple\.com\/[a-z]{2,3}\/artist\/(\d*)$/;
	const REGEX_SPOTIFY_ARTIST_ID = /spotify\.[a-z]{2,3}\/artist\/(.*$)/;

	data.relations?.forEach((relation) => {
		if (!relation?.url?.resource) return;

		if (relation.type === "last.fm") {
			lastfmUrl = relation.url.resource;
			return;
		}

		if (relation.type === "youtube") {
			const match = relation.url.resource.match(REGEX_YOUTUBE_CHANNEL_ID);
			if (match) youtubeMusicId = match[0];
			return;
		}

		const appleMusicMatch = relation.url.resource.match(REGEX_APPLE_MUSIC_ARTIST_ID);
		if (appleMusicMatch) {
			if (appleMusicMatch[1]) appleMusicId = appleMusicMatch[1];
			return;
		}

		const itunesMatch = relation.url.resource.match(REGEX_ITUNES_ARTIST_ID);
		if (itunesMatch) {
			if (itunesMatch[1]) appleMusicId = itunesMatch[1];
			return;
		}

		const spotifyMatch = relation.url.resource.match(REGEX_SPOTIFY_ARTIST_ID);
		if (spotifyMatch) {
			if (spotifyMatch[1]) spotifyId = spotifyMatch[1];
			return;
		}

		const deezerMatch = relation.url.resource.match(REGEX_DEEZER_ARTIST_URL);
		if (deezerMatch) {
			if (deezerMatch[1]) deezerId = deezerMatch[1];
			return;
		}
	});

	return await db
		.insert(table.artist)
		.values({
			id: generateRandomId(),
			name: data.name,
			status: ContentStatus.Pending,
			externalMusicBrainzId: id,
			externalLastfmLink: lastfmUrl,
			externalYouTubeMusicId: youtubeMusicId,
			externalAppleMusicId: appleMusicId,
			externalSpotifyId: spotifyId,
			externalDeezerId: deezerId
		})
		.returning();
}
