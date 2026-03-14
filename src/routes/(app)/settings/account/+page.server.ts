import { fail, redirect } from "@sveltejs/kit";
import { type } from "arktype";
import { eq } from "drizzle-orm";

import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { arkFormParser, toSerArkErrors } from "$lib/server/validator/utils";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) return redirect(307, "/auth/login");

	const user = await db
		.select({
			username: table.user.username,
			displayUsername: table.user.displayUsername,
			image: table.user.unusedImage
		})
		.from(table.user)
		.where(eq(table.user.id, event.locals.user.id))
		.limit(1);

	return user.at(0) ?? { username: null, displayUsername: null, image: null };
};

const AccountData = type({
	displayUsername: "string | null = null"
});

const formAccountData = arkFormParser.pipe(AccountData);

export const actions: Actions = {
	default: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, {
				message: "You need to be logged in to update your account",
				invalid: {}
			});
		}

		const formData = await request.formData();
		const out = formAccountData(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid account data",
				invalid: toSerArkErrors(out)
			});
		}

		await db
			.update(table.user)
			.set({ displayUsername: out.displayUsername })
			.where(eq(table.user.id, locals.user.id));

		return {
			success: true
		};
	}
};
