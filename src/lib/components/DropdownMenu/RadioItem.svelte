<script lang="ts">
	import { DropdownMenu, type DropdownMenuRadioItemProps } from "bits-ui";

	interface Props extends Omit<DropdownMenuRadioItemProps, "children" | "class"> {
		label: string;
		icon?: string;
	}

	let { label, icon, ...rest }: Props = $props();
</script>

<DropdownMenu.RadioItem
	{...rest}
	class="hover:bg-background-2 data-[state='checked']:bg-background-2 group flex h-9 select-none items-center justify-between gap-2 px-3 text-sm transition-colors"
>
	{label}
	{#if icon}
		<span class={["iconify group-data-[state='checked']:text-rosemi-500 size-5", icon]}></span>
	{/if}
</DropdownMenu.RadioItem>
