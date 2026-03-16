import { error, redirect } from "@sveltejs/kit";

import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
	if (!event.locals.user) return redirect(307, "/auth/login");
	if (event.locals.user.role !== "admin") return error(403, { message: "Forbidden" });
};
