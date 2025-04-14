<script lang="ts">
	import { DropdownMenu } from "bits-ui";

	interface Props {
		label: string;
		icon?: string;
	}

	let { label, icon }: Props = $props();
</script>

<DropdownMenu.Item
	textValue={label}
	class="flex h-9 items-center justify-between gap-2 border-b border-neutral-800 px-3 transition-colors last:border-b-0 hover:bg-neutral-900"
>
	{label}
	{#if icon}
		<span class={["iconify size-5", icon]}></span>
	{/if}
</DropdownMenu.Item>
