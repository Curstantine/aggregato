import { fail, redirect } from "@sveltejs/kit";
import { type } from "arktype";
import { APIError } from "better-auth";

import { auth } from "$lib/server/auth";
import { arkFormParser, toSerArkErrors } from "$lib/server/validator/utils";

import type { Actions } from "./$types";

const ForgotPasswordSchema = type({
	email: "string.email"
});

const formForgotPassword = arkFormParser.pipe(ForgotPasswordSchema);

export const actions: Actions<ActionUtils.GenericFormActionData> = {
	default: async (event) => {
		const formData = await event.request.formData();
		const out = formForgotPassword(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid email format",
				invalid: toSerArkErrors(out)
			});
		}

		try {
			await auth.api.requestPasswordReset({
				body: {
					email: out.email,
					redirectTo: "/auth/reset"
				}
			});
		} catch (error) {
			if (error instanceof APIError) {
				return fail(400, {
					message: error.message ?? "Failed to initiate a password reset",
					invalid: undefined
				});
			}

			return fail(500, { message: "Unexpected error", invalid: undefined });
		}

		return redirect(302, "/");
	}
};
