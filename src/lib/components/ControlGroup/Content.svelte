<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLFormAttributes } from "svelte/elements";

	import { enhance } from "$app/forms";

	interface Props extends Omit<HTMLFormAttributes, "children"> {
		children: Snippet;
		enhanceCallback?: Parameters<typeof enhance>[1];
	}

	let { children, enhanceCallback, ...rest }: Props = $props();
</script>

<form {...rest} use:enhance={enhanceCallback} class="space-y-3 rounded border border-border p-3">
	{@render children()}
</form>
