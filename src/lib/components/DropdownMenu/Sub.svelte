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
		class="hover:bg-background-2 flex h-9 select-none items-center justify-between gap-2 px-3 transition-colors"
	>
		{label}
		{#if icon}
			<span class={["iconify size-5", icon]}></span>
		{/if}
	</DropdownMenu.SubTrigger>

	<DropdownMenu.SubContent
		{...contentProps}
		class={[
			"rounded text-sm shadow-lg",
			"before:bg-background/20 before:absolute before:inset-0 before:left-0 before:-z-10 before:content-normal before:rounded before:backdrop-blur-lg",
			"[&>*:first-child]:rounded-t [&>*:last-child]:rounded-b",
			"border-border [&>*]:border-b-border border [&>*:last-child]:border-b-0 [&>*]:border-b",
			contentProps?.class
		]}
	>
		{@render children?.()}
	</DropdownMenu.SubContent>
</DropdownMenu.Sub>
