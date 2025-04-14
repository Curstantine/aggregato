<script lang="ts">
	import "@fontsource-variable/inter";
	import "../app.css";

	let { children } = $props();
</script>

<svelte:head>
	<title>Aggregato</title>
	<meta name="description" content="Music aggregation, and update retrieval platform." />
</svelte:head>

{@render children()}
