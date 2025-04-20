<script lang="ts">
	import { Select, type SelectItemProps } from "bits-ui";

	interface Props extends Omit<SelectItemProps, "child" | "class"> {
		label: string;
	}

	let { label, ...rest }: Props = $props();
</script>

<Select.Item
	{...rest}
	class="flex h-9 items-center justify-between px-3 transition-colors select-none hover:bg-background-2"
/>
