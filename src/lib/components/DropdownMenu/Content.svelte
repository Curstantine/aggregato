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
				"rounded text-sm shadow-lg",
				"before:bg-background/20 before:absolute before:inset-0 before:left-0 before:-z-10 before:content-normal before:rounded before:backdrop-blur-lg",
				"[&>*:first-child>*:first-child]:rounded-t [&>*:last-child>*:last-child]:rounded-b",
				"border-border [&>div[role='group']>[role='menuitem']]:border-b-border border [&>div[role='group']:last-of-type>*[role='menuitem']]:border-b-0 [&>div[role='group']>[role='menuitem']]:border-b",
				contentProps?.class
			]}
		>
			{@render children?.()}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
