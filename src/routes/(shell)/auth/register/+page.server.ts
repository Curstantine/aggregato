import { fail, redirect } from "@sveltejs/kit";
import { type } from "arktype";
import { APIError } from "better-auth";

import { auth } from "$lib/server/auth";
import { arkFormParser, toSerArkErrors } from "$lib/server/validator/utils";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (event.locals.user) return redirect(302, "/");
};

const RegisterCredentials = type({
	email: "string.email",
	username: "3 < string.alphanumeric <= 31",
	password: "6 < string <= 255",
	confirmPassword: "string",
	remember: "boolean = false"
}).narrow((data, ctx) => {
	if (data.password === data.confirmPassword) return true;

	return ctx.reject({
		expected: "identical to password",
		actual: "",
		path: ["confirmPassword"]
	});
});

const formRegisterCredentials = arkFormParser.pipe(RegisterCredentials);

export const actions: Actions<ActionUtils.GenericFormActionData> = {
	default: async (event) => {
		const formData = await event.request.formData();
		const out = formRegisterCredentials(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid credentials",
				invalid: toSerArkErrors(out)
			});
		}

		try {
			await auth.api.signUpEmail({
				body: {
					name: out.username,
					email: out.email,
					password: out.password,
					username: out.username,
					rememberMe: out.remember,
					callbackURL: "/"
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, {
					message: error.message ?? "Failed to register a new account",
					invalid: undefined
				});
			}

			return fail(500, { message: "Unexpected error", invalid: undefined });
		}

		return redirect(302, "/");
	}
};
