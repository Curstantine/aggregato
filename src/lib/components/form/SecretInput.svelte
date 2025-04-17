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
		class="h-9 rounded border border-border bg-background-2 px-2 text-foreground transition-colors placeholder:text-muted-foreground focus-visible:border-rosemi-500 focus-visible:outline-none sm:h-8"
	/>

	<label
		aria-label={`${showValue ? "Hide" : "Show"} ${props.name} value`}
		class="absolute top-1 right-1 grid size-7 place-items-center rounded bg-background-2 text-foreground shadow transition-colors hover:bg-background sm:size-6"
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
