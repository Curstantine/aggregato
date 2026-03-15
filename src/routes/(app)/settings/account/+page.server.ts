import { error, fail, isRedirect, redirect } from "@sveltejs/kit";
import { type } from "arktype";
import { APIError } from "better-auth";
import { eq } from "drizzle-orm";

import { auth } from "$lib/server/auth";
import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";
import { arkFormParser, toSerArkErrors } from "$lib/server/validator/utils";

import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
	if (!event.locals.user) return redirect(307, "/auth/login");

	const result = await db.query.user.findFirst({
		where: { id: event.locals.user.id },
		columns: {
			username: true,
			displayUsername: true
		},
		with: {
			accounts: {
				columns: {
					providerId: true,
					accountId: true
				}
			}
		}
	});

	if (!result) return error(404, { message: "Tried to retrieve a user whose id does not exist" });

	return result;
};

const AccountData = type({
	displayUsername: "string.trim | null = null"
});

const formAccountData = arkFormParser.pipe(AccountData);

const LinkData = type({ provider: "'github'" });
const formLinkData = arkFormParser.pipe(LinkData);

const UnlinkData = type({ providerId: "'github'" });
const formUnlinkData = arkFormParser.pipe(UnlinkData);

export const actions: Actions = {
	profile: async ({ request, locals }) => {
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

		return { success: true };
	},

	link: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, {
				message: "You need to be logged in to link an account",
				invalid: {}
			});
		}

		const formData = await request.formData();
		const out = formLinkData(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid link data",
				invalid: toSerArkErrors(out)
			});
		}

		try {
			const result = await auth.api.linkSocialAccount({
				body: { provider: out.provider + "i", callbackURL: "/settings/account" },
				headers: request.headers
			});

			if (result.url) return redirect(302, result.url);
		} catch (error) {
			if (isRedirect(error)) throw error;

			console.error("[account:link]:", error);
			if (error instanceof APIError) {
				return fail(400, {
					message: error.message ?? "Failed to link account",
					invalid: {}
				});
			}

			return fail(500, { message: "Unexpected error", invalid: {} });
		}

		return fail(400, { message: "Failed to initiate account linking", invalid: {} });
	},

	unlink: async ({ request, locals }) => {
		if (!locals.user) {
			return fail(401, {
				message: "You need to be logged in to unlink an account",
				invalid: {}
			});
		}

		const formData = await request.formData();
		const out = formUnlinkData(formData);

		if (out instanceof type.errors) {
			return fail(400, {
				message: "Invalid unlink data",
				invalid: toSerArkErrors(out)
			});
		}

		// Guard against locking the user out: if they have no credential account,
		// they must keep at least one OAuth provider linked.
		const accounts = await db.query.account.findMany({
			where: { userId: locals.user.id },
			columns: { providerId: true }
		});

		const hasCredentialAccount = accounts.some((a) => a.providerId === "credential");
		const oauthAccounts = accounts.filter((a) => a.providerId !== "credential");

		if (!hasCredentialAccount && oauthAccounts.length <= 1) {
			return fail(400, {
				message: "You must set a password before unlinking your only sign-in method.",
				invalid: {}
			});
		}

		try {
			await auth.api.unlinkAccount({
				body: { providerId: out.providerId },
				headers: request.headers
			});

			return { success: true };
		} catch (error) {
			console.error("[account:unlink]:", error);

			if (error instanceof APIError) {
				return fail(400, {
					message: error.message ?? "Failed to unlink account",
					invalid: {}
				});
			}

			return fail(500, { message: "Unexpected error", invalid: {} });
		}
	}
};
