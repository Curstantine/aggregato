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
		class="flex h-9 items-center justify-between gap-2 px-3 transition-colors select-none hover:bg-background-2 sm:h-8"
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
			"before:absolute before:inset-0 before:left-0 before:-z-10 before:content-normal before:rounded before:bg-background/80 before:backdrop-blur-xl dark:before:bg-background/30",
			"[&>*:first-child]:rounded-t [&>*:last-child]:rounded-b",
			"border border-border [&>*]:border-b [&>*]:border-b-border [&>*:last-child]:border-b-0",
			contentProps?.class
		]}
	>
		{@render children?.()}
	</DropdownMenu.SubContent>
</DropdownMenu.Sub>
