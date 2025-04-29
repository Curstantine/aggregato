/** Available themes */
export type Theme = "dark" | "light";

/** Theme modes which controls a theme */
export type ThemeMode = Theme | "system";

export const themeState = $state({ mode: "system" as ThemeMode });

/**
 * Initializes the theme settings on client.
 *
 * ### Strategy - Server
 * `hooks.server.ts` sets data-theme and data-theme-mode properties to the document by either logged in user's {@link user.prefThemeMode} (defaults to system).
 * If the mode is `"system"`, then the theme is resolved by utilizing the `Sec-CH-Prefers-Color-Scheme` header when available.
 *
 * ### Strategy - Client
 * Remove the data-theme-init attribute to allow transitions to work
 * If the initial mode is not system, nothing happens on the client.
 * However, when {@link ThemeMode.system} is passed,
 */
export function init() {
	document.documentElement.removeAttribute("data-theme-init");

	const initial = document.documentElement.getAttribute("data-theme-mode") as ThemeMode;
	themeState.mode = initial;

	if (initial !== "system") return;
	setThemeMode("system", false);
}

function _setThemeMode(mode: ThemeMode) {
	if (typeof document === "undefined") return;

	themeState.mode = mode;
	document.documentElement.setAttribute("data-theme-mode", mode);

	if (mode !== "system") {
		document.documentElement.setAttribute("data-theme", mode);
		return;
	}

	const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
	const systemTheme = prefersDark ? "dark" : "light";
	document.documentElement.setAttribute("data-theme", systemTheme);
}

export function setThemeMode(mode: ThemeMode, saveToStorage = true): void {
	_setThemeMode(mode);
	if (!saveToStorage) return;

	fetch("/settings/api/change-theme-mode", {
		method: "POST",
		body: mode,
		headers: { Accept: "application/json" }
	}).catch((err) => {
		console.error("Failed to save theme preference:", err);
	});
}
