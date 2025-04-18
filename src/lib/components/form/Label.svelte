<script lang="ts">
	import type { Snippet } from "svelte";

	import type { SerArkError } from "$lib/server/validator/utils";

	interface Props {
		id: string;
		label: string;
		error?: string | SerArkError;
		children: Snippet;
	}

	const { id, label, error, children }: Props = $props();
</script>

<div class="flex flex-col gap-1 text-sm">
	<label for={id}>{label}</label>
	{@render children()}
	{#if error}
		<span class="text-xs text-red-400">
			{typeof error === "string" ? error : error.message}
		</span>
	{/if}
</div>
