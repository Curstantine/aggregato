import type { ImportTypeType } from "$lib/types/form";

export type SwImportMessage = (SwImportData | SwImportError) & {
	type: ImportTypeType;
};

export type SwImportData = {
	status: "active" | "completed";
	message: string;
	current?: number;
	total?: number;
};

export type SwImportError = {
	status: "failed";
	message: string;
};

export interface LastfmTopArtistData {
	topartists: {
		"@attr": Record<"page" | "perPage" | "total" | "totalPages" | "user", string>;
		artist: {
			mbid: string;
			name: string;
			url: string;
			image: {
				size: "small" | "medium" | "large" | "extralarge" | "mega";
				"#text": string;
			}[];
		}[];
	};
}
