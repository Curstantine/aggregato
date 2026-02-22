import { drizzle } from "drizzle-orm/libsql";

import { dev } from "$app/environment";
import { env } from "$env/dynamic/private";

import { relations } from "./relations";

if (!env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
if (!dev && !env.DATABASE_SECRET) throw new Error("DATABASE_SECRET is not set");

export const db = drizzle({
	connection: { url: env.DATABASE_URL!, authToken: env.DATABASE_SECRET! },
	relations
});
