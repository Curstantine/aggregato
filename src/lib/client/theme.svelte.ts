export type ThemeMode = "dark" | "light" | "system";

export const themeState = $state({ value: "system" as ThemeMode });

const STORAGE_THEME_KEY = "theme";

export function init() {
	const savedTheme = localStorage.getItem(STORAGE_THEME_KEY) as ThemeMode | null;
	if (savedTheme && ["dark", "light", "system"].includes(savedTheme)) {
		setThemeMode(savedTheme, false);
		return;
	}

	setThemeMode("system", false);
}

export function setThemeMode(mode: ThemeMode, saveToStorage = true): void {
	if (typeof document === "undefined") return;

	themeState.value = mode;
	document.documentElement.setAttribute("data-theme", mode);

	if (saveToStorage) localStorage.setItem(STORAGE_THEME_KEY, mode);
}
