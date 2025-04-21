<script lang="ts">
	import {
		SettingsSideMenuDesktop,
		SettingsSideMenuMobile
	} from "$lib/components/SettingsSideMenu";

	import type { LayoutProps } from "./$types";

	let { children }: LayoutProps = $props();
</script>

<main class="container md:grid md:grid-cols-[--spacing(56)_1fr] md:pl-5 2xl:pl-0">
	<SettingsSideMenuDesktop />
	<div class="flex flex-col py-4 md:pr-0 md:pl-4">
		<SettingsSideMenuMobile />
		{@render children()}
	</div>
</main>
