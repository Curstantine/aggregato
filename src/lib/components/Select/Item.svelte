<script lang="ts">
	import { Select, type SelectItemProps } from "bits-ui";

	interface Props extends Omit<SelectItemProps, "child" | "class"> {
		label: string;
	}

	let { label, children, ...rest }: Props = $props();
</script>

<Select.Item
	{...rest}
	class="flex h-9 items-center gap-2 pr-3 pl-2 text-sm transition-colors select-none data-highlighted:bg-background-2 data-selected:bg-background-2 data-selected:text-rosemi-500 sm:h-8"
>
	{#snippet children(props)}
		<span
			class={[
				"iconify size-5  transition-opacity material-symbols--check-rounded",
				props.selected ? "opacity-100" : "opacity-0"
			]}
		></span>
		{@render children?.(props)}
	{/snippet}
</Select.Item>
