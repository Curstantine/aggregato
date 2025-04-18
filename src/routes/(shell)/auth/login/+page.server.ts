import { verify } from "@node-rs/argon2";
import { fail, redirect } from "@sveltejs/kit";
import { type } from "arktype";
import { eq } from "drizzle-orm";

import * as auth from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { arkFormParser, toSerArkErrors, type FormSerArkErrors } from "$lib/server/validator/utils";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) return redirect(302, "/");
};

const LoginCredentials = type({
	username: "string.email | (3 < string.alphanumeric <= 31)",
	password: "6 < string <= 255"
});

const formLoginCredentials = arkFormParser.pipe(LoginCredentials);

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const out = formLoginCredentials(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid credential format",
				invalid: toSerArkErrors(out)
			});
		}

		const isEmail = type("string.email").allows(out.username);
		const results = await db
			.select()
			.from(table.user)
			.limit(1)
			.where(
				isEmail ? eq(table.user.email, out.username) : eq(table.user.username, out.username)
			);

		const existingUser = results.at(0);
		if (!existingUser) {
			return fail(400, {
				message: "Incorrect username or password",
				invalid: {} as FormSerArkErrors
			});
		}

		const validPassword = await verify(existingUser.passwordHash, out.password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});
		if (!validPassword) {
			return fail(400, {
				message: "Incorrect username or password",
				invalid: {} as FormSerArkErrors
			});
		}

		const sessionToken = auth.generateSessionToken();
		const session = await auth.createSession(sessionToken, existingUser.id);
		auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);

		// redirect(302, "/");
		return { success: true };
	}
};
