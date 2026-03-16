<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes, HTMLBaseAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
		children: Snippet;
	}

	let { children, ...rest }: Props = $props();
</script>

<div {...rest} class="space-y-3 rounded border border-border p-3">
	{@render children()}
</div>
