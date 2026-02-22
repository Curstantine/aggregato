<script lang="ts">
	import type { ComponentProps, Snippet } from "svelte";

	import Separator from "$lib/components/Separator.svelte";

	interface Props extends ComponentProps<typeof Separator> {
		class?: string;
		children?: Snippet;
	}

	const { class: klass, children, ...rest }: Props = $props();
</script>

<div
	data-slot="field-separator"
	class={["text-sm", children ? "flex items-center" : "relative", klass]}
>
	<Separator {...rest} class={children ? "" : "absolute inset-0 top-1/2 shrink-0"} />

	{#if children}
		<span class="block max-w-max px-2 text-nowrap text-muted-foreground">
			{@render children?.()}
		</span>

		<Separator {...rest} class="" />
	{/if}
</div>
