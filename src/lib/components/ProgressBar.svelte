<script lang="ts">
	import { Progress, type ProgressRootProps } from "bits-ui";

	type Props = Required<Pick<ProgressRootProps, "aria-labelledby" | "value" | "max">>;
	let props: Props = $props();

	let a = $derived(Math.min(((props.value ?? 0) / props.max) * 100, 100));
</script>

<Progress.Root {...props} class="bg-background-2 relative h-1 w-full overflow-hidden rounded-full">
	<div
		class="bg-rosemi-500 h-full w-full flex-1 rounded-full transition-all duration-1000 ease-in-out"
		style={`transform: translateX(-${100 - a}%)`}
	></div>
</Progress.Root>
