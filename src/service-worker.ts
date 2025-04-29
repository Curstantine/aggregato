/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="../.svelte-kit/ambient.d.ts" />

import { wait } from "@jabascript/core";
import { createSearchParams } from "@jabascript/core/query";

import { PUBLIC_LASTFM_API_KEY } from "$env/static/public";

import SafeBroadcastChannel from "./lib/client/sw/broadcast";
import type { LastfmTopArtistData, SwImportMessage } from "./lib/client/sw/types";
import { parseImportInput } from "./lib/client/sw/utils";
import { type ImportModeType } from "./lib/types/form";

const sw = self as unknown as ServiceWorkerGlobalScope;

const importChannel = new SafeBroadcastChannel<SwImportMessage>("sw-import");

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
	const params = createSearchParams({
		method: "user.gettopartists",
		format: "json",
		user: username,
		api_key: PUBLIC_LASTFM_API_KEY,
		limit: { "top-10": "10", "top-50": "50", all: "100" }[mode]
	});

	const resp = await fetch("https://ws.audioscrobbler.com/2.0?" + params.toString());
	const body = (await resp.json()) as LastfmTopArtistData;

	if (!resp.ok) {
		importChannel.postMessage({
			status: "failed",
			message: `Request to Last.fm failed with ${resp.statusText} (${resp.status})`
		});

		return;
	}

	importChannel.postMessage({
		type: "lastfm",
		status: "active",
		message: "Starting Last.fm import",
		current: 0,
		total: body.topartists.artist.length
	});

	await wait(1000);

	for (let i = 0; i < body.topartists.artist.length; i++) {
		const artist = body.topartists.artist[i];

		importChannel.postMessage({
			type: "lastfm",
			status: "active",
			message: `Resolving ${artist.name}`,
			current: i + 1,
			total: body.topartists.artist.length
		});

		await wait(1000);
	}

	importChannel.postMessage({
		type: "lastfm",
		status: "completed",
		message: "Import complete"
	});

	console.dir(body, { depth: null });
}

async function importListenBrainz(username: string, mode: ImportModeType) {
	console.log("listenbrainz", { username, mode });
}
