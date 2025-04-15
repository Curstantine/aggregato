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
	class="group flex h-9 items-center justify-between gap-2 px-3 text-sm transition-colors select-none hover:bg-neutral-900 data-[state='checked']:bg-neutral-900"
>
	{label}
	{#if icon}
		<span class={["iconify size-5 group-data-[state='checked']:text-rosemi-500", icon]}></span>
	{/if}
</DropdownMenu.RadioItem>
