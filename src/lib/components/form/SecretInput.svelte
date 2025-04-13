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
		class="h-8 rounded border border-neutral-800 bg-neutral-900 px-2 text-neutral-100 transition-colors placeholder:text-neutral-500 focus-visible:border-rosemi-600 focus-visible:outline-none"
	/>

	<label
		aria-label={`${showValue ? "Hide" : "Show"} ${props.name} value`}
		class="absolute top-1 right-1 grid size-6 place-items-center rounded bg-neutral-950 text-neutral-50 shadow"
	>
		<span
			class="iconify size-4"
			class:material-symbols--visibility-outline-rounded={showValue}
			class:material-symbols--visibility-off-outline-rounded={!showValue}
		></span>

		<input type="checkbox" class="sr-only" bind:checked={showValue} />
	</label>
</div>
