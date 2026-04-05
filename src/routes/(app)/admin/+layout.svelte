<script lang="ts">
	import { AdminSideMenuDesktop, AdminSideMenuMobile } from "$lib/components/AdminSideMenu";
	import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";

	import type { LayoutProps } from "./$types";

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>Admin | Aggregato</title>
</svelte:head>

<main
	class="container grid-rows-[--spacing(9)_1fr] px-0 md:grid md:grid-cols-[--spacing(56)_1fr]"
	style="grid-template-areas: 'sidebar breadcrumbs''sidebar content';"
>
	<AdminSideMenuDesktop />
	<Breadcrumbs />

	<div class="flex flex-col px-4 py-4 [grid-area:content] md:px-8 md:pr-0 md:pl-4 2xl:px-4">
		<AdminSideMenuMobile />
		{@render children()}
	</div>
</main>
