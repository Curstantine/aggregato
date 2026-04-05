import { admin, username } from "better-auth/plugins";
import { createAuthClient } from "better-auth/svelte";

import type { auth } from "$lib/server/auth";

export const authClient = createAuthClient({
	plugins: [username(), admin()]
});

export type Session = typeof auth.$Infer.Session;
