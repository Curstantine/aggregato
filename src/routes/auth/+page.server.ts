import { hash, verify } from "@node-rs/argon2";
import { encodeBase32LowerCase } from "@oslojs/encoding";
import { fail, redirect } from "@sveltejs/kit";
import { type } from "arktype";
import { eq } from "drizzle-orm";

import * as auth from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { formDataParser } from "$lib/server/validator/utils";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) return redirect(302, "/auth/login");
	return {};
};

const AuthCredentials = type({
	username: "3 < string <= 31",
	password: "6 < string <= 255"
});

const formAuthCredentials = formDataParser.pipe(AuthCredentials);

export const actions: Actions = {
	login: async (event) => {
		const formData = await event.request.formData();
		const out = formAuthCredentials(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid credentials",
				errors: out.summary
			});
		}

		const results = await db
			.select()
			.from(table.user)
			.where(eq(table.user.username, out.username));

		const existingUser = results.at(0);
		if (!existingUser) {
			return fail(400, { message: "Incorrect username or password" });
		}

		const validPassword = await verify(existingUser.passwordHash, out.password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			return fail(400, { message: "Incorrect username or password" });
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		return redirect(302, "/");
	},
	register: async (event) => {
		const formData = await event.request.formData();
		const out = formAuthCredentials(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid credentials",
				errors: out.summary
			});
		}

		const userId = generateUserId();
		const passwordHash = await hash(out.password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		try {
			await db
				.insert(table.user)
				.values({ id: userId, username: out.username, passwordHash });

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch (e) {
			console.error(e);
			return fail(500, { message: "An error has occurred" });
		}

		return redirect(302, "/");
	},
	logout: async (event) => {
		if (!event.locals.session) return fail(401);

		await auth.invalidateSession(event.locals.session.id);
		auth.deleteSessionTokenCookie(event);

		return redirect(302, "/auth/login");
	}
};

function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}
