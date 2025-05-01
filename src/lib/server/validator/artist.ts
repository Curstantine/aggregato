import { type } from "arktype";

export const ImportArtistBody = type({
	name: "string",
	"cover?": "string.url",

	"spotifyId?": "0 < string <= 22",
	"appleId?": "string.numeric",
	"lastfmUrl?": "string.url",
	"mbid?": "string"
}).narrow((n, ctx) => {
	if (n.appleId || n.spotifyId || n.lastfmUrl || n.mbid) return true;
	return ctx.reject("one of identifiers to be populated");
});
