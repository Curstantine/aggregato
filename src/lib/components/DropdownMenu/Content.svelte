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
				"max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)]",
				"before:absolute before:inset-0 before:left-0 before:-z-10 before:content-normal before:rounded before:bg-background/80 before:backdrop-blur-xl dark:before:bg-background/30",
				"data-[state=closed]:before:fade-out-standard-accelerate data-[state=open]:before:fade-in-standard-decelerate",
				"[&>*:first-child>*:first-child]:rounded-t [&>*:last-child>*:last-child]:rounded-b",
				"border border-border [&>div[role='group']:last-of-type>*[role='menuitem']]:border-b-0 [&>div[role='group']>[role='menuitem']]:border-b [&>div[role='group']>[role='menuitem']]:border-b-border",
				contentProps?.class
			]}
		>
			{@render children?.()}
		</DropdownMenu.Content>
	</DropdownMenu.Portal>
</DropdownMenu.Root>
