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
	session: {
		user: r.one.user({
			from: r.session.userId,
			to: r.user.id
		})
	},
	user: {
		sessions: r.many.session({
			from: r.user.id,
			to: r.session.userId
		}),
		passwordResetSessions: r.many.passwordResetSession({
			from: r.user.id,
			to: r.passwordResetSession.userId
		})
	}
}));
