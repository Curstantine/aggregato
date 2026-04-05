import { takeMapped } from "@jabascript/core";
import { parseSearchParams } from "@jabascript/query";
import { error, fail } from "@sveltejs/kit";
import { type } from "arktype";
import { eq, ilike, sql } from "drizzle-orm";

import { db } from "$lib/server/db";
import * as table from "$lib/server/db/schema";

import type { Actions, PageServerLoad } from "./$types";

const PAGE_SIZE = 20;

const AdminArtistSearch = type({
	"search?": "string.trim",
	page: "number = 0"
});

export const load: PageServerLoad = async ({ url }) => {
	const raw = parseSearchParams(url.searchParams);
	const params = AdminArtistSearch(raw);

	if (params instanceof type.errors) {
		console.error("[admin:artists:load]", params.summary);
		return error(400, { message: "Invalid search parameters" });
	}

	const offset = (params.page - 1) * PAGE_SIZE;
	const whereClause = takeMapped(params.search, (x) => ilike(table.artist.name, `%${x}%`));

	const artists = await db
		.select({
			id: table.artist.id,
			name: table.artist.name,
			status: table.artist.status,
			createdAt: table.artist.createdAt,
			total: sql<number>`count(*) over()`.as("total")
		})
		.from(table.artist)
		.where(whereClause ?? undefined)
		.orderBy(table.artist.createdAt)
		.limit(PAGE_SIZE)
		.offset(offset);

	const total = artists[0]?.total ?? 0;
	const totalPages = Math.ceil(total / PAGE_SIZE);

	artists.forEach((artist) => delete (artist as any).total);

	return {
		artists: artists as Pick<table.Artist, "id" | "name" | "status" | "createdAt">[],
		search: params.search,
		page: params.page,
		totalPages,
		total
	};
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
