/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

import { ImportMode, type ImportModeType } from "./lib/types/form";

const sw = self as unknown as ServiceWorkerGlobalScope;

sw.addEventListener("install", () => {
	sw.skipWaiting();
	console.log("Service worker installed");
});

sw.addEventListener("activate", (event) => {
	event.waitUntil(sw.clients.claim());
});

sw.addEventListener("message", (event) => {
	if (event.data?.type === "import-lastfm") {
		const { username, mode } = parseImportInput(event.data);
		return event.waitUntil(importLastFm(username, mode));
	}

	if (event.data?.type === "import-listenbrainz") {
		const { username, mode } = parseImportInput(event.data);
		return event.waitUntil(importListenBrainz(username, mode));
	}
});

async function importLastFm(username: string, mode: ImportModeType) {
	console.log("lastfm", { username, mode });
}

async function importListenBrainz(username: string, mode: ImportModeType) {
	console.log("listenbrainz", { username, mode });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseImportInput(data: any) {
	if (typeof data.username !== "string" && !Object.values(ImportMode).includes(data.mode)) {
		throw Error("Invalid input. import-lastfm requires (username: string, mode: ImportMode)");
	}

	return { username: data.username as string, mode: data.mode as ImportModeType };
}
