<script lang="ts">
	import { Checkbox, useId, type WithoutChildrenOrChild } from "bits-ui";

	let {
		id = useId(),
		checked = $bindable(false),
		ref = $bindable(null),
		class: klass,
		...restProps
	}: WithoutChildrenOrChild<Checkbox.RootProps> = $props();
</script>

<Checkbox.Root
	{id}
	bind:checked
	bind:ref
	class="grid size-4 place-items-center rounded border border-border bg-background-2 transition-colors checked:border-rosemi-500 checked:bg-rosemi-500 focus-visible:border-rosemi-500 focus-visible:outline-none disabled:opacity-75 {klass}"
	{...restProps}
>
	{#snippet children({ checked, indeterminate })}
		{#if checked || indeterminate}
			<span
				class={[
					"iconify size-3 text-rosemi-50",
					indeterminate && "material-symbols--check-indeterminate-small-rounded",
					checked && "material-symbols--check-rounded"
				]}
			></span>
		{/if}
	{/snippet}
</Checkbox.Root>
