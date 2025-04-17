import type { ClientInit } from "@sveltejs/kit";

import { init as themeInit } from "$lib/client/theme.svelte";

export const init: ClientInit = () => {
	themeInit();
};
