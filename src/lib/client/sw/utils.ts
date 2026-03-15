import { ImportMode, type ImportModeType } from "$lib/types/form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function parseImportInput(data: any) {
	if (typeof data.username !== "string" && !Object.values(ImportMode).includes(data.mode)) {
		throw Error("Invalid input. import-lastfm requires (username: string, mode: ImportMode)");
	}

	return { username: data.username as string, mode: data.mode as ImportModeType };
}

export async function getActiveSW(): Promise<
	ServiceWorkerRegistration & { active: ServiceWorker }
> {
	const registration = await navigator.serviceWorker.ready;
	if (!registration.active) throw new Error("No service worker active");
	return registration as ServiceWorkerRegistration & { active: ServiceWorker };
}
