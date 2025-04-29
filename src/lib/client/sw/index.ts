import SafeBroadcastChannel from "$lib/client/sw/broadcast";
import type { SwImportError, SwImportMessage } from "$lib/client/sw/types";

export const createImportChannel = () =>
	new SafeBroadcastChannel<SwImportMessage, SwImportError>("sw-import");

export { parseImportInput } from "./utils";
