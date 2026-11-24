import { execSync } from "node:child_process";
import adapter from "@sveltejs/adapter-vercel";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

function getGitRef() {
	try {
		return execSync("git rev-parse --short HEAD").toString().trim();
	} catch (e) {
		console.warn("Could not determine Git version:", e);
		const now = new Date();
		return `${now.getFullYear()}.${now.getMonth()}.${now.getDate()}`;
	}
}

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit({
			adapter: adapter(),
			version: {
				name: getGitRef()
			}
		})
	],
	server: {}
});
