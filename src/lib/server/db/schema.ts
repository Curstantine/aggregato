import { relations, sql } from "drizzle-orm";
import { check, index, integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Note(Curstantine): We need to use relative imports in this file
// as drizzle externally reads this file. Only sveltekit can understand $lib aliases
import { ContentStatus, ReleaseType } from "../../types/schema";

export const user = sqliteTable("user", {
	id: text("id").primaryKey(),
	username: text("username").notNull().unique(),
	email: text("email").notNull().unique(),
	passwordHash: text("password_hash").notNull(),
	prefThemeMode: text("pref_theme_mode", { enum: ["light", "dark", "system"] }).default("system"),
	importLastfmUsername: text("import_lastfm_username"),
	importListenBrainzUsername: text("import_listenbrainz_username"),
	createdAt: integer("created_at", { mode: "timestamp" }).notNull()
});

export const session = sqliteTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull()
});

export const artist = sqliteTable(
	"artist",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		nativeName: text("nativeName"),
		status: text("status", {
			enum: [ContentStatus.Approved, ContentStatus.Deleted, ContentStatus.Pending]
		}),
		createdAt: integer("created_at", { mode: "timestamp" }).notNull(),

		externalLastfm: text("external_lastfm"),
		externalListenBrainz: text("external_listenbrainz"),
		externalAppleMusic: text("external_apple_music"),
		externalYouTubeMusic: text("external_youtube_music"),
		externalSpotify: text("external_spotify")
	},
	(table) => [
		index("artist_name_idx").on(table.name),
		check(
			"artist_at_least_one_external_link",
			sql`${table.externalLastfm} is not null or ${table.externalListenBrainz} is not null or ${table.externalAppleMusic} is not null or ${table.externalYouTubeMusic} is not null or ${table.externalSpotify} is not null`
		)
	]
);

export const artistRelations = relations(artist, ({ many }) => ({
	artistsToRelease: many(artistsToReleases)
}));

export const release = sqliteTable(
	"release",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		nativeName: text("nativeName"),
		type: text("type", { enum: [ReleaseType.Single, ReleaseType.EP, ReleaseType.Album] }),
		status: text("status", { enum: [ContentStatus.Approved, ContentStatus.Deleted] }),
		createdAt: integer("created_at", { mode: "timestamp" }).notNull(),

		externalLastfm: text("external_lastfm"),
		externalListenBrainz: text("external_listenbrainz"),
		externalAppleMusic: text("external_apple_music"),
		externalYouTubeMusic: text("external_youtube_music"),
		externalSpotify: text("external_spotify")
	},
	(table) => [
		index("release_name_idx").on(table.name),
		check(
			"release_at_least_one_external_link",
			sql`${table.externalLastfm} is not null or ${table.externalListenBrainz} is not null or ${table.externalAppleMusic} is not null or ${table.externalYouTubeMusic} is not null or ${table.externalSpotify} is not null`
		)
	]
);

export const releaseRelations = relations(release, ({ many }) => ({
	artistsToRelease: many(artistsToReleases)
}));

export const artistsToReleases = sqliteTable(
	"artists_to_release",
	{
		releaseId: text("release_id")
			.notNull()
			.references(() => release.id, { onDelete: "cascade" }),
		artistId: text("artist_id")
			.notNull()
			.references(() => artist.id, { onDelete: "cascade" })
	},
	(table) => [primaryKey({ columns: [table.releaseId, table.artistId] })]
);

export const artistsToReleasesRelations = relations(artistsToReleases, ({ one }) => ({
	artist: one(artist, { fields: [artistsToReleases.artistId], references: [artist.id] }),
	release: one(release, { fields: [artistsToReleases.releaseId], references: [release.id] })
}));

export type Session = typeof session.$inferSelect;
export type User = typeof user.$inferSelect;
export type Artist = typeof artist.$inferSelect;
export type Release = typeof artist.$inferSelect;
