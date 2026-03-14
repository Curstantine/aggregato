export const ImportMode = {
	Top10: "top-10",
	Top50: "top-50",
	Top100: "top-100"
} as const;

export type ImportModeType = (typeof ImportMode)[keyof typeof ImportMode];

export const ImportType = {
	Lastfm: "Last.fm",
	ListenBrainz: "ListenBrainz"
} as const;

export type ImportTypeType = (typeof ImportType)[keyof typeof ImportType];
