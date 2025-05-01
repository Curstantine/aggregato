import { version } from "$app/environment";

export interface MusicBrainzArtist {
	id: "string";
	type: "Person";
	name: string;
	"sort-name": string;
	country: string;
}

export async function getMBZArtist(mbid: string): Promise<MusicBrainzArtist> {
	const resp = await fetch(`https://musicbrainz.org/ws/2/artist/${mbid}?fmt=json`, {
		headers: { "user-agent": `Aggregato/${version} (https://aggegato.riamu.lol)` }
	});

	const body = await resp.json();
	if (!resp.ok) throw Error(`MusicBrainz returned ${body.error}`);

	return body as MusicBrainzArtist;
}
