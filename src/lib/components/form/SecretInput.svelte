<script lang="ts">
	import type { HTMLInputAttributes } from "svelte/elements";

	interface Props extends Omit<HTMLInputAttributes, "class"> {}
	const props: Props = $props();

	let showValue = $state(false);
	let inputType = $derived(showValue ? "text" : "password");
</script>

<div class="relative inline-flex flex-col">
	<input
		{...props}
		type={inputType}
		class="h-9 rounded border border-neutral-800 bg-neutral-900 px-2 text-neutral-100 transition-colors placeholder:text-neutral-500 focus-visible:border-rosemi-600 focus-visible:outline-none sm:h-8"
	/>

	<label
		aria-label={`${showValue ? "Hide" : "Show"} ${props.name} value`}
		class="absolute top-1 right-1 grid size-7 place-items-center rounded bg-neutral-900 text-neutral-50 shadow transition-colors hover:bg-neutral-950 sm:size-6"
	>
		<span
			class={[
				"iconify size-5 sm:size-4",
				showValue
					? "material-symbols--visibility-outline-rounded"
					: "material-symbols--visibility-off-outline-rounded"
			]}
		></span>

		<input type="checkbox" class="sr-only" bind:checked={showValue} />
	</label>
</div>
