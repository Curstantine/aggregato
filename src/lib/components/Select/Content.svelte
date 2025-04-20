<script lang="ts">
	import {
		Select,
		type SelectContentProps,
		type SelectRootProps,
		type SelectTriggerProps,
		type WithoutChild
	} from "bits-ui";

	type Props = SelectRootProps & {
		placeholder?: string;
		items: { value: string; label: string; disabled?: boolean }[];
		triggerProps?: WithoutChild<SelectTriggerProps>;
		contentProps?: WithoutChild<SelectContentProps>;
	};

	let {
		open = $bindable(false),
		value = $bindable(),
		placeholder,
		items,

		children,
		triggerProps,
		contentProps,
		...restProps
	}: Props = $props();

	const selectedLabel = $derived(items.find((item) => item.value === value)?.label);
</script>

<Select.Root bind:open bind:value={value as never} {...restProps}>
	<Select.Trigger
		{...triggerProps}
		class={[
			"group inline-flex h-9 items-center justify-between rounded border border-border bg-background-2 px-2 text-left text-sm text-foreground transition-colors placeholder:text-muted-foreground data-placeholder:text-muted-foreground data-[state=open]:border-rosemi-500 data-[state=open]:outline-none sm:h-8",
			triggerProps?.class
		]}
	>
		{selectedLabel ?? placeholder}
		<span
			class="iconify size-5 transition-transform duration-emphasized-decelerate ease-emphasized-decelerate material-symbols--keyboard-arrow-down group-aria-expanded:rotate-180"
		></span>
	</Select.Trigger>
	<Select.Portal>
		<Select.Content
			sideOffset={10}
			class={[
				"rounded text-sm shadow-lg",
				"max-h-[var(--bits-select-content-available-height)] w-[var(--bits-select-anchor-width)] min-w-[var(--bits-select-anchor-width)]",
				"before:absolute before:inset-0 before:left-0 before:-z-10 before:content-normal before:rounded before:bg-background/80 before:backdrop-blur-xl dark:before:bg-background/30",
				"data-[state=closed]:before:fade-out-standard-accelerate data-[state=open]:before:fade-in-standard-decelerate",
				"[&>*:first-child>*:first-child]:rounded-t [&>*:last-child>*:last-child]:rounded-b",
				"border border-border [&_[role='option']]:border-b [&_[role='option']]:border-b-border [&_[role='option']:last-of-type]:border-b-0",
				contentProps?.class
			]}
		>
			<Select.Viewport>
				{@render children?.()}
			</Select.Viewport>
		</Select.Content>
	</Select.Portal>
</Select.Root>
