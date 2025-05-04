/// <reference types="@sveltejs/kit" />
/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />
/// <reference types="../.svelte-kit/ambient.d.ts" />

import { wait } from "@jabascript/core";
import { createURL } from "@jabascript/query";

import { build, files, version } from "$service-worker";
import { PUBLIC_LASTFM_API_KEY } from "$env/static/public";

import SafeBroadcastChannel from "./lib/client/sw/broadcast";
import type { LastfmTopArtistData, SwImportMessage } from "./lib/client/sw/types";
import { parseImportInput } from "./lib/client/sw/utils";

import { ImportType, type ImportModeType } from "./lib/types/form";
import type { ImportArtistBodyType } from "./lib/types/validator-shims";

const CACHE = `cache-${version}`;
const ASSETS = [...build, ...files];

const sw = self as unknown as ServiceWorkerGlobalScope;
const importChannel = new SafeBroadcastChannel<SwImportMessage>("sw-import");

sw.addEventListener("install", (event) => {
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});

sw.addEventListener("activate", (event) => {
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
	event.waitUntil(sw.clients.claim());
});

sw.addEventListener("fetch", (event) => {
	if (event.request.method !== "GET") return;

	async function respond() {
		const url = new URL(event.request.url);
		const cache = await caches.open(CACHE);

		if (ASSETS.includes(url.pathname)) {
			const response = await cache.match(url.pathname);
			if (response) return response;
		}

		try {
			const response = await fetch(event.request);

			// Note: if we're offline, fetch can return a value that is not a Response
			if (!(response instanceof Response)) {
				throw new Error("invalid response from fetch");
			}

			if (response.status === 200) {
				cache.put(event.request, response.clone());
			}

			return response;
		} catch (err) {
			const response = await cache.match(event.request);

			if (response) {
				return response;
			}

			throw err;
		}
	}

	event.respondWith(respond());
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
	const url = createURL("https://ws.audioscrobbler.com/2.0", {
		method: "user.gettopartists",
		format: "json",
		user: username,
		api_key: PUBLIC_LASTFM_API_KEY,
		limit: [{ "top-10": "10", "top-50": "50", all: "100" }, mode]
	});

	const resp = await fetch(url);
	const body = (await resp.json()) as LastfmTopArtistData;

	if (!resp.ok) {
		importChannel.postMessage({
			type: ImportType.Lastfm,
			status: "failed",
			message: `Request to Last.fm failed with ${resp.statusText} (${resp.status})`
		});

		return;
	}

	importChannel.postMessage({
		type: ImportType.Lastfm,
		status: "active",
		message: "Starting Last.fm import",
		current: 0,
		total: body.topartists.artist.length
	});

	for (let i = 0; i < body.topartists.artist.length; i++) {
		const artist = body.topartists.artist[i];

		const payload: ImportArtistBodyType = {
			name: artist.name,
			musicbrainzId: artist.mbid + "i",
			lastfmUrl: artist.url,
			cover:
				artist.image.find((x) => x.size === "extralarge")?.["#text"] ??
				artist.image[artist.image.length - 1]["#text"]
		};
		const resp = await fetch("/settings/api/import-artist", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload)
		});

		if (!resp.ok) {
			const error = (await resp.json()) as App.Error;
			importChannel.postMessage({
				type: ImportType.Lastfm,
				status: "failed",
				message: error.message
			});

			return;
		}

		importChannel.postMessage({
			type: ImportType.Lastfm,
			status: "active",
			message: `Resolving ${artist.name}`,
			current: i + 1,
			total: body.topartists.artist.length
		});

		await wait(1000);
	}

	importChannel.postMessage({
		type: ImportType.Lastfm,
		status: "completed",
		message: `Imported ${body.topartists.artist.length} artists`
	});

	console.dir(body, { depth: null });
}

async function importListenBrainz(username: string, mode: ImportModeType) {
	console.log("listenbrainz", { username, mode });
}
