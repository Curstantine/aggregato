<script lang="ts">
	import "@fontsource-variable/inter";
	import "../app.css";

	import type { LayoutProps } from "./$types";

	let { children }: LayoutProps = $props();
</script>

<svelte:head>
	<title>Aggregato</title>
	<meta name="description" content="Music aggregation, and update retrieval platform." />
</svelte:head>

{@render children()}
