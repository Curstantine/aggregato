import { defineRelations } from "drizzle-orm";

import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	artistAlias: {
		artist: r.one.artist({
			from: r.artistAlias.artistId,
			to: r.artist.id
		})
	},
	artist: {
		artistAliases: r.many.artistAlias(),
		releases: r.many.release({
			from: r.artist.id.through(r.artistsToReleases.artistId),
			to: r.release.id.through(r.artistsToReleases.releaseId)
		})
	},
	session: {
		user: r.one.user({
			from: r.session.userId,
			to: r.user.id
		})
	},
	user: {
		sessions: r.many.session()
	},
	release: {
		artists: r.many.artist()
	}
}));
