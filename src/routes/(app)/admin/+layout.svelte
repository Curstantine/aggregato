<script lang="ts">
	import { AdminSideMenuDesktop, AdminSideMenuMobile } from "$lib/components/AdminSideMenu";

	import type { LayoutProps } from "./$types";

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>Admin | Aggregato</title>
</svelte:head>

<main class="container md:grid md:grid-cols-[--spacing(56)_1fr] md:pl-5 2xl:pl-0">
	<AdminSideMenuDesktop />
	<div class="flex flex-col py-4 md:pr-0 md:pl-4">
		<AdminSideMenuMobile />
		{@render children()}
	</div>
</main>
