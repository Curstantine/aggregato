<script lang="ts">
	import SettingsSideMenu from "$lib/components/SettingsSideMenu.svelte";

	import type { LayoutProps } from "./$types";

	let { children }: LayoutProps = $props();
</script>

<main class="container grid grid-cols-[--spacing(56)_1fr] pl-1 sm:pl-5 2xl:pl-0">
	<SettingsSideMenu />
	<div class="flex flex-col p-4 pr-0">
		{@render children()}
	</div>
</main>
