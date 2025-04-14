<script lang="ts">
	import { Button, type ButtonRootProps } from "bits-ui";
	import type { Snippet } from "svelte";

	type Props = ButtonRootProps & {
		children: Snippet;
	};

	const { children, class: klass, ...rest }: Props = $props();
</script>

<Button.Root
	{...rest}
	class={[
		"mt-2 h-9 w-full rounded border-1 border-rosemi-600 px-4 text-sm transition-shadow sm:h-8",
		"bg-rosemi-700 shadow-glow shadow-rosemi-700/20 hover:shadow-rosemi-700/30",
		klass
	]}
>
	{@render children()}
</Button.Root>
