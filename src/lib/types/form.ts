import { createEnum } from "@jabascript/core/enum";

export const ImportMode = createEnum({
	Top10: "top-10",
	Top50: "top-50",
	Top100: "top-100"
} as const);

export type ImportModeType = typeof ImportMode.infer;

export const ImportType = createEnum({
	Lastfm: "Last.fm",
	ListenBrainz: "ListenBrainz"
} as const);

export type ImportTypeType = typeof ImportType.infer;
