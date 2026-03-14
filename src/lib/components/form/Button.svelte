<script lang="ts">
	import { Button, type ButtonRootProps } from "bits-ui";
	import type { Snippet } from "svelte";

	type Intent = "ghost" | "rosemi" | "border" | "boring";
	type Size = "default" | "square" | "squareSmall";

	type Props = ButtonRootProps & {
		children: Snippet;
		intent?: Intent;
		size?: Size;
		fullyRounded?: boolean;
	};

	const intentStyles: Record<Intent, string> = {
		boring: "rounded border border-border bg-background-2 shadow disabled:opacity-50 disabled:cursor-not-allowed",
		rosemi: "dark:border-1 border-rosemi-500 bg-rosemi-700 text-rosemi-50 shadow-glow shadow-rosemi-700/20 hover:shadow-rosemi-700/30 disabled:bg-rosemi-900 disabled:shadow-rosemi-900/20 disabled:border-rosemi-700 disabled:text-rosemi-300",
		ghost: "hover:bg-background-2",
		border: "border border-border bg-background-2 hover:bg-background-2/50"
	};

	const sizeStyles: Record<Size, string> = {
		default: "h-9 flex items-center text-center justify-center sm:h-8 px-4",
		square: "grid place-items-center grid-cols-1 size-9 sm:size-8",
		squareSmall: "grid place-items-center grid-cols-1 size-7 sm:size-6"
	};

	const {
		children,
		intent = "rosemi",
		size = "default",
		fullyRounded = false,
		class: klass,
		...rest
	}: Props = $props();
</script>

<Button.Root
	{...rest}
	class={[
		"text-sm transition-all",
		fullyRounded ? "rounded-full" : "rounded",
		intentStyles[intent],
		sizeStyles[size],
		klass
	]}
>
	{@render children()}
</Button.Root>
