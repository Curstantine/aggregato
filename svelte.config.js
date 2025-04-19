import { execSync } from "child_process";

import adapter from "@sveltejs/adapter-vercel";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import("@sveltejs/kit").Config} */
const config = {
	compilerOptions: { runes: true },
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		version: {
			name: getGitRef()
		}
	}
};

function getGitRef() {
	try {
		return execSync("git rev-parse --short HEAD").toString().trim();
	} catch (e) {
		console.warn("Could not determine Git version:", e);
		const now = new Date();
		return `${now.getFullYear()}.${now.getMonth()}.${now.getDate()}`;
	}
}

export default config;
