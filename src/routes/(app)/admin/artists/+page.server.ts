import { fail } from "@sveltejs/kit";
import { count, eq, like } from "drizzle-orm";

import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";

import type { Actions, PageServerLoad } from "./$types";

const PAGE_SIZE = 20;

export const load: PageServerLoad = async ({ url }) => {
	const search = url.searchParams.get("search")?.trim() || "";
	const page = Math.max(1, Number(url.searchParams.get("page")) || 1);
	const offset = (page - 1) * PAGE_SIZE;

	const whereClause = search ? like(table.artist.name, `%${search}%`) : undefined;

	const [artists, [{ total }]] = await Promise.all([
		db
			.select()
			.from(table.artist)
			.where(whereClause)
			.orderBy(table.artist.createdAt)
			.limit(PAGE_SIZE)
			.offset(offset),
		db.select({ total: count() }).from(table.artist).where(whereClause)
	]);

	const totalPages = Math.ceil(total / PAGE_SIZE);

	return { artists, search, page, totalPages, total };
};

export const actions: Actions = {
	delete: async ({ request, locals }) => {
		if (!locals.user || locals.user.role !== "admin") {
			return fail(403, { message: "Forbidden" });
		}

		const formData = await request.formData();
		const id = formData.get("id");

		if (typeof id !== "string" || !id) {
			return fail(400, { message: "Artist ID is required" });
		}

		const existing = await db
			.select({ id: table.artist.id })
			.from(table.artist)
			.where(eq(table.artist.id, id))
			.limit(1);

		if (existing.length === 0) {
			return fail(404, { message: "Artist not found" });
		}

		await db.delete(table.artist).where(eq(table.artist.id, id));

		return { success: true };
	}
};
