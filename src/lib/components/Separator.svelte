<script lang="ts">
	import { Separator, type SeparatorRootProps, type WithoutChildren } from "bits-ui";

	type Props = WithoutChildren<SeparatorRootProps>;
	const { class: klass, ...rest }: Props = $props();
</script>

<Separator.Root
	{...rest}
	class={[
		"bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
		klass
	]}
/>
