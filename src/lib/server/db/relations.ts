import { defineRelations } from "drizzle-orm";

import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	artist: {
		aliases: r.many.artistAlias({
			from: r.artist.id,
			to: r.artistAlias.artistId
		}),
		releases: r.many.release({
			from: r.artist.id.through(r.artistsToReleases.artistId),
			to: r.release.id.through(r.artistsToReleases.releaseId)
		})
	},
	release: {
		artists: r.many.artist({
			from: r.release.id.through(r.artistsToReleases.releaseId),
			to: r.artist.id.through(r.artistsToReleases.artistId)
		})
	},
	user: {
		sessions: r.many.session({
			from: r.user.id,
			to: r.session.userId
		}),
		accounts: r.many.account({
			from: r.user.id,
			to: r.account.userId
		})
	}
}));
