<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<h1 class="mt-2 mb-6 ml-3 text-lg font-semibold md:mt-0">{@render children()}</h1>
