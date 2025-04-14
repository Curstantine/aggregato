<script lang="ts">
	import { Button, type ButtonRootProps } from "bits-ui";
	import type { Snippet } from "svelte";

	type Intent = "ghost" | "rosemi" | "border";
	type Size = "default" | "square";

	type Props = ButtonRootProps & {
		children: Snippet;
		intent?: Intent;
		size?: Size;
		fullyRounded?: boolean;
	};

	const intentStyles: Record<Intent, string> = {
		rosemi: "border-1 border-rosemi-600 bg-rosemi-700 shadow-glow shadow-rosemi-700/20 hover:shadow-rosemi-700/30",
		ghost: "hover:bg-neutral-900",
		border: "border border-neutral-800 bg-neutral-900"
	};

	const sizeStyles: Record<Size, string> = {
		default: "h-9 sm:h-8",
		square: "size-9 sm:size-8"
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
		"px-4 text-sm transition-[box-shadow,color,background-color]",
		fullyRounded ? "rounded-full" : "rounded",
		intentStyles[intent],
		sizeStyles[size],
		klass
	]}
>
	{@render children()}
</Button.Root>
