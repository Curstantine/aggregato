/**
 * Attributions:
 * Originally part of ivanhofer's sthemer library: https://github.com/ivanhofer/sthemer/blob/main/src/lib/hooks.ts
 */

import { UAParser } from "ua-parser-js";

export const headerPrefersColorScheme = "Sec-CH-Prefers-Color-Scheme";

export function isSupported(headers: Headers): boolean {
	const { engine } = UAParser(headers.get("user-agent") ?? "");

	// https://github.com/Fyrd/caniuse/issues/6252
	if (engine.name === "Blink" && parseInt(engine.version ?? "") >= 93) return true;

	// Firefox Support: https://github.com/mozilla/standards-positions/issues/526
	// Safari Support: https://lists.webkit.org/pipermail/webkit-dev/2021-May/031856.html
	return false;
}

export function hasHeader(header: Headers) {
	return header.has(headerPrefersColorScheme);
}

export function getHeaderValue(headers: Headers) {
	return headers.get(headerPrefersColorScheme);
}
