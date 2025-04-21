<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<h2 class="mb-2 pl-3 font-medium">{@render children()}</h2>
