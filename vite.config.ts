import { readFile } from "node:fs/promises";
import { join as pathJoin } from "node:path";

import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { svelteTesting } from "@testing-library/svelte/vite";
import { defineConfig } from "vite";

async function getCerts(): Promise<{ key: string; cert: string } | undefined> {
	if (process.env.NODE_ENV !== "development") return undefined;

	try {
		const certPath = pathJoin(__dirname, "certs");
		const key = await readFile(pathJoin(certPath, "key.pem"), "utf-8");
		const cert = await readFile(pathJoin(certPath, "cert.pem"), "utf-8");

		return { key, cert };
	} catch (error) {
		console.error("Failed to read certificates:", error);
		return undefined;
	}
}
export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		// https: {
		// 	...(await getCerts())
		// }
	},
	test: {
		workspace: [
			{
				extends: "./vite.config.ts",
				plugins: [svelteTesting()],
				test: {
					name: "client",
					environment: "jsdom",
					clearMocks: true,
					include: ["src/**/*.svelte.{test,spec}.{js,ts}"],
					exclude: ["src/lib/server/**"],
					setupFiles: ["./vitest-setup-client.ts"]
				}
			},
			{
				extends: "./vite.config.ts",
				test: {
					name: "server",
					environment: "node",
					include: ["src/**/*.{test,spec}.{js,ts}"],
					exclude: ["src/**/*.svelte.{test,spec}.{js,ts}"]
				}
			}
		]
	}
});
