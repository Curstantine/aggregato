<script lang="ts">
	import { Label } from "bits-ui";
	import type { Snippet } from "svelte";

	interface Props {
		id: string;
		label: string;
		description?: string;
		children?: Snippet;
	}

	let { id, label, description, children }: Props = $props();
</script>

<fieldset
	class="grid gap-3 md:grid-cols-[minmax(--spacing(24),auto)_minmax(--spacing(32),--spacing(72))]"
>
	<Label.Root for={id} class="flex flex-col justify-center md:min-h-8">
		<span class="text-sm">{label}</span>
		{#if description}
			<span class="text-sm text-muted-foreground">{description}</span>
		{/if}
	</Label.Root>
	{@render children?.()}
</fieldset>
