<script lang="ts">
	import {
		Popover,
		type PopoverContentProps,
		type PopoverRootProps,
		type WithoutChild
	} from "bits-ui";
	import type { Snippet } from "svelte";

	type Props = PopoverRootProps & {
		button: Snippet<[Record<string, unknown>]>;
		contentProps?: WithoutChild<PopoverContentProps>;
	};

	let { open = $bindable(false), button, children, contentProps, ...restProps }: Props = $props();
</script>

<Popover.Root bind:open {...restProps}>
	<Popover.Trigger>
		{#snippet child({ props })}
			{@render button(props)}
		{/snippet}
	</Popover.Trigger>
	<Popover.Portal>
		<Popover.Content
			{...contentProps}
			class={["bg-neutral-950/50  shadow-lg backdrop-blur-lg", contentProps?.class]}
		>
			{@render children?.()}
		</Popover.Content>
	</Popover.Portal>
</Popover.Root>
