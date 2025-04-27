/**
 * Attributions:
 * Originally part of ivanhofer's sthemer library: https://github.com/ivanhofer/sthemer/blob/main/src/lib/hooks.ts
 */

import { UAParser } from "ua-parser-js";

export const headerPrefersColorScheme = "Sec-CH-Prefers-Color-Scheme";

export function shouldRequestHeader(headers: Headers) {
	return isSupported(headers) && !hasHeader(headers);
}

export function isSupported(headers: Headers): boolean {
	const { engine, browser } = UAParser(headers.get("user-agent") ?? "");

	// Disabling CH on mobile browsers, because none of the popular alternatives support it
	// This is a temporary measure until we handle technically supported browsers that ignores the CH response sent to the client
	//
	// Cromite: https://github.com/uazo/cromite/issues/2043
	// Brave: https://github.com/brave/brave-browser/issues/39977
	if (browser.name === "Mobile Chrome") return false;

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
