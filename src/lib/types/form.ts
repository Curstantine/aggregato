export const ImportMode = {
	Top10: "top-10",
	Top50: "top-50",
	All: "all"
} as const;

export type ImportModeType = (typeof ImportMode)[keyof typeof ImportMode];
