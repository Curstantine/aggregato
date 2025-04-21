<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLFormAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLFormAttributes, "children"> {
		children: Snippet;
	}

	let { children }: Props = $props();
</script>

<form class="space-y-3 rounded border border-border p-3">
	{@render children()}
</form>
