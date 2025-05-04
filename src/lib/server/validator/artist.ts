import { type } from "arktype";

export const ImportArtistBody = type({
	name: "string",
	"cover?": "string.url",

	"spotifyId?": "0 < string <= 22",
	"appleMusicId?": "string.numeric",
	"lastfmUrl?": "string.url",
	"youtubeMusicId?": "string",
	"musicbrainzId?": "string.uuid",
	"deezerId?": "string.numeric"
}).narrow((n, ctx) => {
	if (
		n.appleMusicId ||
		n.spotifyId ||
		n.lastfmUrl ||
		n.youtubeMusicId ||
		n.musicbrainzId ||
		n.deezerId
	) {
		return true;
	}

	return ctx.reject("one of identifiers to be populated");
});
