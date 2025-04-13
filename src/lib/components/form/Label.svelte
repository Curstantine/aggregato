<script lang="ts">
	import type { Snippet } from "svelte";

	interface Props {
		label: string;
		children: Snippet;
	}

	const { label, children }: Props = $props();
</script>

<label class="flex flex-col gap-1 text-sm">
	{label}
	{@render children()}
</label>
