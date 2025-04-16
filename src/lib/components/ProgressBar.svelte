<script lang="ts">
	import { Progress, type ProgressRootProps } from "bits-ui";

	type Props = Required<Pick<ProgressRootProps, "aria-labelledby" | "value" | "max">>;
	let props: Props = $props();

	let a = $derived(Math.min(((props.value ?? 0) / props.max) * 100, 100));
</script>

<Progress.Root {...props} class="relative h-1 w-full overflow-hidden rounded-full bg-neutral-900">
	<div
		class="h-full w-full flex-1 rounded-full bg-rosemi-500 transition-all duration-1000 ease-in-out"
		style={`transform: translateX(-${100 - a}%)`}
	></div>
</Progress.Root>
