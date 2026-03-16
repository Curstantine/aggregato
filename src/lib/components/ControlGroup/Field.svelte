<script lang="ts">
	import { Label } from "bits-ui";
	import type { Snippet } from "svelte";

	import type { SerArkError } from "$lib/server/validator/utils";

	interface Props {
		id: string;
		label: string;
		description?: string;
		error?: string | SerArkError;
		children?: Snippet;
	}

	let { id, label, description, error, children }: Props = $props();
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
	{#if error}
		<span id={id + "-error"} class="text-xs text-red-400">
			{typeof error === "string" ? error : error.message}
		</span>
	{/if}
</fieldset>
