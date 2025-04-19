<script lang="ts">
	import SettingsSideMenu from "$lib/components/SettingsSideMenu.svelte";

	import type { LayoutProps } from "./$types";

	let { children }: LayoutProps = $props();
</script>

<main class="container grid grid-cols-[--spacing(56)_1fr] gap-2 pl-1 sm:pl-5 2xl:pl-0">
	<SettingsSideMenu />
	<div class="p-4">
		{@render children()}
	</div>
</main>
