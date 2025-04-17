<script lang="ts">
	import { DropdownMenu, type DropdownMenuItemProps } from "bits-ui";

	interface Props extends Omit<DropdownMenuItemProps, "children" | "class"> {
		label: string;
		icon?: string;
	}

	let { label, icon, ...rest }: Props = $props();
</script>

<DropdownMenu.Item
	{...rest}
	class="hover:bg-background-2 flex h-9 select-none items-center justify-between gap-2 px-3 transition-colors"
>
	{label}
	{#if icon}
		<span class={["iconify size-5", icon]}></span>
	{/if}
</DropdownMenu.Item>
