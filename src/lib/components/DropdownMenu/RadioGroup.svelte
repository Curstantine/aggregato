<script lang="ts">
	import { DropdownMenu, type DropdownMenuRadioGroupProps } from "bits-ui";

	interface Props extends Omit<DropdownMenuRadioGroupProps, "child" | "class"> {}

	let { children, ...rest }: Props = $props();
</script>

<DropdownMenu.RadioGroup
	{...rest}
	class={[
		"[&>*:first-child]:rounded-t [&>*:last-child]:rounded-b",
		"[&>*]:border-b [&>*]:border-b-border [&>*:last-child]:border-b-0"
	]}
>
	{@render children?.()}
</DropdownMenu.RadioGroup>
