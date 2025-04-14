<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLInputAttributes, "class"> {}
	const props: Props = $props();
</script>

<input
	{...props}
	class="h-9 rounded border border-neutral-800 bg-neutral-900 px-2 text-neutral-100 transition-colors placeholder:text-neutral-500 focus-visible:border-rosemi-600 focus-visible:outline-none sm:h-8"
/>
