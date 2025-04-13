<script lang="ts">
	import { Button } from "bits-ui";
	import type { Snippet } from "svelte";

	interface Props {
		href: string;
		disabled?: boolean;
		children: Snippet;
	}

	const { children, ...rest }: Props = $props();
</script>

<Button.Root {...rest}>
	{@render children()}
</Button.Root>
