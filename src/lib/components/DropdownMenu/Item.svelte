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
	class="flex h-9 items-center justify-between gap-2 px-3 transition-colors select-none hover:bg-background-2"
>
	{label}
	{#if icon}
		<span class={["iconify size-5", icon]}></span>
	{/if}
</DropdownMenu.Item>
