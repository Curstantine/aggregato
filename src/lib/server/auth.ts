import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth/minimal";
import { username } from "better-auth/plugins";
import { sveltekitCookies } from "better-auth/svelte-kit";

import { getRequestEvent } from "$app/server";
import { env } from "$env/dynamic/private";

import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";

import { PrefThemeMode } from "$lib/types/schema";

// TODO: Remove name and image fields from the configuration
// once better-auth allows customizing the user schema.
// https://github.com/better-auth/better-auth/issues/424
export const auth = betterAuth({
	baseURL: env.ORIGIN,
	secret: env.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, { provider: "sqlite", schema }),
	emailAndPassword: { enabled: true },
	socialProviders: {
		github: {
			clientId: env.GITHUB_AUTH_ID,
			clientSecret: env.GITHUB_AUTH_SECRET
		}
	},
	user: {
		fields: {
			name: "unusedName",
			image: "unusedImage"
		},
		additionalFields: {
			prefThemeMode: {
				type: "string",
				default: "system",
				required: false,
				options: PrefThemeMode.values()
			},
			importLastfmUsername: {
				type: "string",
				required: false
			},
			importListenbrainzUsername: {
				type: "string",
				required: false
			}
		}
	},
	plugins: [username(), sveltekitCookies(getRequestEvent)]
});

export type Session = (typeof auth.$Infer.Session)["session"];
export type User = (typeof auth.$Infer.Session)["user"] & { prefThemeMode: PrefThemeMode };
