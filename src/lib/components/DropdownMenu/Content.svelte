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
			class={[
				"rounded bg-neutral-950/50 text-sm shadow-lg backdrop-blur-lg",
				"[&>*:first-child>*:first-child]:rounded-t [&>*:last-child>*:last-child]:rounded-b",
				"border border-neutral-800 [&>div[role='group']:last-of-type>*[role='menuitem']]:border-b-0 [&>div[role='group']>[role='menuitem']]:border-b [&>div[role='group']>[role='menuitem']]:border-b-neutral-800",
				contentProps?.class
			]}
		>
			{@render children?.()}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
