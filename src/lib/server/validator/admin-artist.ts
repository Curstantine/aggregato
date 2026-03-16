import { type } from "arktype";

import { ContentStatus } from "../../types/schema";
import { arkFormParser } from "./utils";

const ArtistData = type({
	name: "string > 0",
	status: `"${ContentStatus.Approved}" | "${ContentStatus.Pending}" | "${ContentStatus.Deleted}"`,
	externalLastfmLink: "string.trim | null = null",
	externalMusicBrainzId: "string.trim | null = null",
	externalAppleMusicId: "string.trim | null = null",
	externalYouTubeMusicId: "string.trim | null = null",
	externalSpotifyId: "string.trim | null = null",
	externalDeezerId: "string.trim | null = null"
}).narrow((n, ctx) => {
	if (
		n.externalLastfmLink ||
		n.externalMusicBrainzId ||
		n.externalAppleMusicId ||
		n.externalYouTubeMusicId ||
		n.externalSpotifyId ||
		n.externalDeezerId
	) {
		return true;
	}

	return ctx.reject("at least one external link or identifier must be provided");
});

export const formArtistData = arkFormParser.pipe(ArtistData);
