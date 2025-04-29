export type SwImportMessage = {
	status: "active" | "completed";
	type: "lastfm" | "listenbrainz";
	message: string;
	current?: number;
	total?: number;
};

export type SwImportError = {
	status: "failed";
	message: string;
};
