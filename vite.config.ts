// import { readFile } from "node:fs/promises";
// import { join as pathJoin } from "node:path";

import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

// async function getCerts(): Promise<{ key: string; cert: string } | undefined> {
// 	try {
// 		const certPath = pathJoin(__dirname, "certs");
// 		const key = await readFile(pathJoin(certPath, "key.pem"), "utf-8");
// 		const cert = await readFile(pathJoin(certPath, "cert.pem"), "utf-8");

// 		return { key, cert };
// 	} catch (error) {
// 		console.error("Failed to read certificates:", error);
// 		return undefined;
// 	}
// }

// const certs = import.meta.env.DEV ? await getCerts() : undefined;

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		// https: {
		// 	key: certs?.key,
		// 	cert: certs?.cert
		// }
	}
});
