import { fail } from "@sveltejs/kit";
import { type } from "arktype";
import { eq } from "drizzle-orm";

import { createPasswordResetSession, generateSessionToken, setPasswordResetSessionTokenCookie } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { sendPasswordResetEmail } from "$lib/server/email";
import { arkFormParser, toSerArkErrors } from "$lib/server/validator/utils";

import type { Actions } from "./$types";

const ForgotPasswordSchema = type({
	email: "string.email"
});

const formForgotPassword = arkFormParser.pipe(ForgotPasswordSchema);

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const out = formForgotPassword(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid email format",
				invalid: toSerArkErrors(out)
			});
		}

		const [existingUser] = await db
			.select()
			.from(table.user)
			.where(eq(table.user.email, out.email))
			.limit(1);

        if (existingUser) {
            const sessionToken = generateSessionToken();
			const session = await createPasswordResetSession(sessionToken, existingUser.id);
            const resetLink = `${event.url.origin}/auth/reset-password?token=${session}`;
			
            setPasswordResetSessionTokenCookie(event, sessionToken, session);

			try {
				await sendPasswordResetEmail(
					existingUser.email,
					existingUser.username,
					resetLink,
					session
				);
			} catch (e) {
				return fail(500, {
					message: "Failed to send email. Please try again later."
				});
			}
		}

		// Always return success to prevent email enumeration
		return {
			success: true,
			message:
				"If an account exists with that email, we've sent instructions to reset your password."
		};
	}
};
