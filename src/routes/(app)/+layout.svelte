<script lang="ts">
	import NavBar from "$lib/components/NavBar.svelte";

	import type { LayoutProps } from "./$types";

	let { children }: LayoutProps = $props();
</script>

<NavBar />
{@render children()}
