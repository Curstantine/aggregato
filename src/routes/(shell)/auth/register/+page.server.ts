import { hash } from "@node-rs/argon2";
import { encodeBase32LowerCase } from "@oslojs/encoding";
import { fail, redirect } from "@sveltejs/kit";
import { type } from "arktype";

import * as auth from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { arkFormParser, toSerArkErrors } from "$lib/server/validator/utils";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) return redirect(302, "/");
};

const RegisterCredentials = type({
	email: "string.email",
	username: "3 < string.alphanumeric <= 31",
	password: "6 < string <= 255",
	confirmPassword: "string"
}).narrow((data, ctx) => {
	if (data.password === data.confirmPassword) return true;

	return ctx.reject({
		expected: "identical to password",
		actual: "",
		path: ["confirmPassword"]
	});
});

const formRegisterCredentials = arkFormParser.pipe(RegisterCredentials);

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const out = formRegisterCredentials(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid credentials",
				invalid: toSerArkErrors(out)
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
			await db.insert(table.user).values({
				id: userId,
				username: out.username,
				email: out.email,
				passwordHash,
				createdAt: new Date()
			});

			const sessionToken = auth.generateSessionToken();
			const session = await auth.createSession(sessionToken, userId);
			auth.setSessionTokenCookie(event, sessionToken, session.expiresAt);
		} catch (e) {
			console.error(e);
			return fail(500, { message: "An error has occurred", invalid: undefined });
		}

		redirect(302, "/");
	}
};

function generateUserId() {
	// ID with 120 bits of entropy, or about the same as UUID v4.
	const bytes = crypto.getRandomValues(new Uint8Array(15));
	const id = encodeBase32LowerCase(bytes);
	return id;
}
