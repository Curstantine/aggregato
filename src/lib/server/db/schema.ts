import { sql } from "drizzle-orm";
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
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`(unixepoch())`)
});

export const session = sqliteTable("session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull()
});

export const passwordResetSession = sqliteTable("password_reset_session", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	code: text("code").notNull(),
	expiresAt: integer("expires_at", { mode: "timestamp" }).notNull()
});

export const artist = sqliteTable(
	"artist",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		status: text("status", {
			enum: [ContentStatus.Approved, ContentStatus.Deleted, ContentStatus.Pending]
		}).notNull(),
		createdAt: integer("created_at", { mode: "timestamp" })
			.notNull()
			.default(sql`(unixepoch())`),

		externalLastfmLink: text("external_lastfm_link").unique(),
		externalMusicBrainzId: text("external_musicbrainz_id").unique(),
		externalAppleMusicId: text("external_apple_music_id").unique(),
		externalYouTubeMusicId: text("external_youtube_music_id").unique(),
		externalSpotifyId: text("external_spotify_id").unique(),
		externalDeezerId: text("external_deezer_id").unique()
	},
	(table) => [
		index("artist_name_idx").on(table.name),
		check(
			"artist_at_least_one_external_link",
			sql`${table.externalLastfmLink} is not null or ${table.externalMusicBrainzId} is not null or ${table.externalAppleMusicId} is not null or ${table.externalYouTubeMusicId} is not null or ${table.externalSpotifyId} is not null or ${table.externalDeezerId} is not null`
		)
	]
);

export const artistAlias = sqliteTable("artist_alias", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	artistId: text("artistId")
		.notNull()
		.references(() => artist.id, { onDelete: "cascade" })
});

export const release = sqliteTable(
	"release",
	{
		id: text("id").primaryKey(),
		name: text("name").notNull(),
		nativeName: text("nativeName"),
		type: text("type", {
			enum: [ReleaseType.Single, ReleaseType.EP, ReleaseType.Album]
		}).notNull(),
		status: text("status", { enum: [ContentStatus.Approved, ContentStatus.Deleted] }).notNull(),
		createdAt: integer("created_at", { mode: "timestamp" })
			.notNull()
			.default(sql`(unixepoch())`),

		externalLastfmLink: text("external_lastfm_link").unique(),
		externalMusicBrainzId: text("external_musicbrainz_id").unique(),
		externalAppleMusicId: text("external_apple_music_id").unique(),
		externalYouTubeMusicId: text("external_youtube_music_id").unique(),
		externalSpotifyId: text("external_spotify_id").unique(),
		externalDeezerId: text("external_deezer_id").unique()
	},
	(table) => [
		index("release_name_idx").on(table.name),
		check(
			"release_at_least_one_external_link",
			sql`${table.externalLastfmLink} is not null or ${table.externalMusicBrainzId} is not null or ${table.externalAppleMusicId} is not null or ${table.externalYouTubeMusicId} is not null or ${table.externalSpotifyId} is not null or ${table.externalDeezerId} is not null`
		)
	]
);

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

export type Session = typeof session.$inferSelect;
export type PasswordResetSession = typeof passwordResetSession.$inferSelect;
export type User = typeof user.$inferSelect;
export type Artist = typeof artist.$inferSelect;
export type ArtistAlias = typeof artistAlias.$inferSelect;
export type Release = typeof artist.$inferSelect;
