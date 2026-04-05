<script lang="ts">
	import { Select, type SelectItemProps } from "bits-ui";

	type Props = Omit<SelectItemProps, "child" | "class">;

	let props: Props = $props();
</script>

<Select.Item
	{...props}
	class="flex h-9 items-center gap-2 pr-3 pl-2 text-sm transition-colors select-none data-highlighted:bg-background-2 data-selected:bg-background-2 data-selected:text-rosemi-500 sm:h-8"
>
	{#snippet children(innards)}
		<span
			class={[
				"iconify size-5  transition-opacity material-symbols--check-rounded",
				innards.selected ? "opacity-100" : "opacity-0"
			]}
		></span>
		{@render props.children?.(innards)}
	{/snippet}
</Select.Item>
