<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	interface Props extends HTMLInputAttributes {}
	const props: Props = $props();
</script>

<input
	{...props}
	class={[
		"h-9 rounded border border-border bg-background-2 px-2 text-sm text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-rosemi-500 focus-visible:outline-none sm:h-8",
		props.class
	]}
/>
