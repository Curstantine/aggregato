import { fail, redirect } from "@sveltejs/kit";
import { type } from "arktype";
import { APIError } from "better-auth";

import { auth } from "$lib/server/auth";
import { arkFormParser, toSerArkErrors } from "$lib/server/validator/utils";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	const token = event.url.searchParams.get("token");
	return { token };
};

const ResetPasswordSchema = type({
	token: "string",
	password: "6 < string <= 255",
	confirmPassword: "6 < string <= 255"
}).narrow((data, ctx) => {
	if (data.password !== data.confirmPassword) {
		return ctx.reject({
			path: ["confirmPassword"],
			message: "Passwords do not match"
		});
	}
	return true;
});

const formResetPassword = arkFormParser.pipe(ResetPasswordSchema);

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const out = formResetPassword(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid input",
				invalid: toSerArkErrors(out)
			});
		}

		try {
			const data = await auth.api.resetPassword({
				body: {
					token: out.token,
					newPassword: out.password
				}
			});

			console.log(data);
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, {
					message: error.message ?? "Failed to complete the password reset",
					invalid: undefined
				});
			}

			return fail(500, { message: "Unexpected error", invalid: undefined });
		}

		return redirect(302, "/auth/login");
	}
};
