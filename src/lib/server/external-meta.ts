import { createURL } from "@jabascript/query";

import { version } from "$app/environment";

export interface MusicBrainzArtist {
	id: "string";
	type: "Person";
	name: string;
	"sort-name": string;
	country: string;
	relations?: {
		url?: { resource: string; id: string };
		type:
			| "discogs"
			| "free streaming"
			| "last.fm"
			| "purchase for download"
			| "streaming"
			| "youtube";
	}[];
}

export async function getMBZArtist(mbid: string): Promise<MusicBrainzArtist> {
	const url = createURL(`https://musicbrainz.org/ws/2/artist/${mbid}`, {
		fmt: "json",
		inc: "url-rels"
	});
	const resp = await fetch(url, {
		headers: { "user-agent": `Aggregato/${version} (https://aggegato.riamu.lol)` }
	});

	const body = await resp.json();
	if (!resp.ok) throw Error(`MusicBrainz returned ${body.error}`);

	return body as MusicBrainzArtist;
}
