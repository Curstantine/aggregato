<script lang="ts">
	import {
		DropdownMenu,
		type DropdownMenuContentProps,
		type DropdownMenuRootProps,
		type WithoutChild
	} from "bits-ui";
	import type { Snippet } from "svelte";

	type Props = DropdownMenuRootProps & {
		button: Snippet<[Record<string, unknown>]>;
		contentProps?: WithoutChild<DropdownMenuContentProps>;
	};

	let { open = $bindable(false), button, children, contentProps, ...restProps }: Props = $props();
</script>

<DropdownMenu.Root bind:open {...restProps}>
	<DropdownMenu.Trigger>
		{#snippet child({ props })}
			{@render button(props)}
		{/snippet}
	</DropdownMenu.Trigger>
	<DropdownMenu.Portal>
		<DropdownMenu.Content
			{...contentProps}
			class="min-w-48 rounded border border-neutral-800 bg-neutral-950/50 text-sm shadow-lg backdrop-blur-lg first:rounded-t last:rounded-b"
		>
			{@render children?.()}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
