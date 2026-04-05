<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";

	interface Props extends HTMLAttributes<HTMLHeadingElement> {
		children: Snippet;
	}

	let { children, ...props }: Props = $props();
</script>

<h1 class="mt-2 mb-4 ml-3 text-lg font-semibold md:mt-0" {...props}>{@render children()}</h1>
