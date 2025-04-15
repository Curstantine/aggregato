<script lang="ts">
	import { DropdownMenu, type DropdownMenuItemProps } from "bits-ui";

	interface Props extends Omit<DropdownMenuItemProps, "children" | "child" | "class"> {
		href: string;
		label: string;
		target?: "_blank";
		icon?: string;
	}

	let { href, label, target, icon, ...rest }: Props = $props();
</script>

<DropdownMenu.Item
	{...rest}
	class="flex h-9 items-center justify-between gap-2 px-3 transition-colors select-none hover:bg-neutral-900"
>
	{#snippet child({ props })}
		<a {...props} {href} {target}>
			{label}
			{#if icon}
				<span class={["iconify size-5", icon]}></span>
			{/if}
		</a>
	{/snippet}
</DropdownMenu.Item>
