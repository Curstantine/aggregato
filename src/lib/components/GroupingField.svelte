<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		id: string;
		label: string;
		description: string;
		children: Snippet;
	}

	let { id, label, description, children } = $props();
</script>

<fieldset
	class="grid gap-3 md:grid-cols-[minmax(--spacing(24),auto)_minmax(--spacing(32),--spacing(72))]"
>
	<label for={id} class="flex flex-col">
		<span class="text-sm">{label}</span>
		<span class="text-sm text-muted-foreground">{description}</span>
	</label>
	{@render children?.()}
</fieldset>
