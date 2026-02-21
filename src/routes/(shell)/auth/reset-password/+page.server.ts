import { hash } from "@node-rs/argon2";
import { fail, redirect } from "@sveltejs/kit";
import { type } from "arktype";
import { eq } from "drizzle-orm";

import * as auth from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { validatePasswordResetToken } from "$lib/server/password-reset";
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

		const userId = await validatePasswordResetToken(out.token);
		if (!userId) {
			return fail(400, {
				message: "Invalid or expired reset token"
			});
		}

		const passwordHash = await hash(out.password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		await db.transaction(async (tx) => {
			await tx.update(table.user).set({ passwordHash }).where(eq(table.user.id, userId));
			await tx.delete(table.session).where(eq(table.session.userId, userId));
		});

		return redirect(302, "/auth/login");
	}
};
