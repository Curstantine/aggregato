import { error, json } from "@sveltejs/kit";
import { type } from "arktype";
import { eq } from "drizzle-orm";

import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";

import type { RequestHandler } from "./$types";

const ChangeThemeMode = type("'light' | 'dark' | 'system'");

export const POST: RequestHandler = async (event) => {
	if (!event.locals.user) {
		error(401, { message: "You need to be logged in" });
	}

	const out = ChangeThemeMode(await event.request.text());
	if (out instanceof type.errors) {
		error(400, { message: out.summary });
	}

	await db
		.update(table.user)
		.set({ prefThemeMode: out })
		.where(eq(table.user.id, event.locals.user.id));

	return json({ message: "Successfully updated the theme mode" });
};
