<script lang="ts">
	import {
		DropdownMenu,
		type DropdownMenuSubContentProps,
		type DropdownMenuSubProps,
		type DropdownMenuSubTriggerProps,
		type WithoutChild
	} from "bits-ui";

	type Props = DropdownMenuSubProps & {
		label: string;
		icon?: string;
		triggerProps?: WithoutChild<DropdownMenuSubTriggerProps>;
		contentProps?: WithoutChild<DropdownMenuSubContentProps>;
	};

	let { label, icon, children, triggerProps, contentProps, ...restProps }: Props = $props();
</script>

<DropdownMenu.Sub {...restProps}>
	<DropdownMenu.SubTrigger
		{...triggerProps}
		class="flex h-9 items-center justify-between gap-2 px-3 transition-colors select-none hover:bg-neutral-900"
	>
		{label}
		{#if icon}
			<span class={["iconify size-5", icon]}></span>
		{/if}
	</DropdownMenu.SubTrigger>

	<DropdownMenu.SubContent
		{...contentProps}
		class={[
			"rounded bg-neutral-950/50 text-sm shadow-lg backdrop-blur-lg",
			"[&>*:first-child]:rounded-t [&>*:last-child]:rounded-b",
			"border border-neutral-800 [&>*]:border-b [&>*]:border-b-neutral-800 [&>*:last-child]:border-b-0",
			contentProps?.class
		]}
	>
		{@render children?.()}
	</DropdownMenu.SubContent>
</DropdownMenu.Sub>
