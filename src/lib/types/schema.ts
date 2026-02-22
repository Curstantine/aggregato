import { createEnum } from "@jabascript/core/enum";

export const ContentStatus = createEnum({
	Approved: "Approved",
	Deleted: "Deleted",
	Pending: "Pending"
} as const);

export const ReleaseType = createEnum({
	Single: "Single",
	EP: "EP",
	Album: "Album"
} as const);

export const PrefThemeMode = createEnum({
	System: "system",
	Light: "light",
	Dark: "dark"
} as const);

export type ContentStatus = typeof ContentStatus.infer;
export type ReleaseType = typeof ReleaseType.infer;
export type PrefThemeMode = typeof PrefThemeMode.infer;
