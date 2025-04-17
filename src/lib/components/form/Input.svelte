<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	interface Props extends HTMLInputAttributes {}
	const props: Props = $props();
</script>

<input
	{...props}
	class={[
		"text-foreground focus-visible:border-rosemi-500 placeholder:text-muted-foreground border-border h-9 rounded border px-2 text-sm transition-colors focus-visible:outline-none sm:h-8",
		props.class
	]}
/>
