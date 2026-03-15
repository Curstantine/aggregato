import { fail, redirect } from "@sveltejs/kit";
import { type } from "arktype";
import { APIError } from "better-auth";

import { auth } from "$lib/server/auth";
import { arkFormParser, toSerArkErrors } from "$lib/server/validator/utils";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) return redirect(302, "/");
};

const LoginCredentials = type({
	username: "string.email | (3 < string.alphanumeric <= 31)",
	password: "6 < string <= 255",
	remember: type("'true' | 'false'").pipe((x) => x === "true"),
	callbackURL: "string = '/'"
});

const LoginSocial = type({
	provider: "'github'",
	callbackURL: "string = '/'"
});

const formLoginCredentials = arkFormParser.pipe(LoginCredentials);
const formLoginSocial = arkFormParser.pipe(LoginSocial);

export const actions: Actions<ActionUtils.GenericFormActionData> = {
	email: async (event) => {
		const formData = await event.request.formData();
		const out = formLoginCredentials(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid credential format",
				invalid: toSerArkErrors(out)
			});
		}

		const isEmail = type("string.email").allows(out.username);

		try {
			if (isEmail) {
				await auth.api.signInEmail({
					body: {
						email: out.username,
						password: out.password,
						rememberMe: out.remember,
						callbackURL: out.callbackURL
					}
				});
			} else {
				await auth.api.signInUsername({
					body: {
						username: out.username,
						password: out.password,
						rememberMe: out.remember,
						callbackURL: out.callbackURL
					}
				});
			}
		} catch (error) {
			console.error("[auth:login]:", error);

			if (error instanceof APIError) {
				return fail(400, {
					message: error.message ?? "Failed to login",
					invalid: undefined
				});
			}

			return fail(500, { message: "Unexpected error", invalid: undefined });
		}

		return redirect(302, out.callbackURL);
	},
	social: async (event) => {
		const formData = await event.request.formData();
		const out = formLoginSocial(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid social login format",
				invalid: toSerArkErrors(out)
			});
		}

		const result = await auth.api.signInSocial({
			body: {
				provider: out.provider,
				callbackURL: out.callbackURL
			}
		});

		if (result.url) return redirect(302, result.url);

		return fail(400, { message: "Failed to initiate social login", invalid: undefined });
	}
};
