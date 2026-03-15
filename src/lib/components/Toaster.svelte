<script lang="ts">
	import { Toaster } from "svelte-sonner";

	import type { Theme } from "$lib/client/state/theme.svelte";

	let theme = $state<Theme>("light");

	$effect(() => {
		theme = (document.documentElement.getAttribute("data-theme") as Theme) ?? "light";

		const observer = new MutationObserver(() => {
			theme = (document.documentElement.getAttribute("data-theme") as Theme) ?? "light";
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"]
		});

		return () => observer.disconnect();
	});
</script>

<Toaster
	{theme}
	position="bottom-right"
	closeButton
	toastOptions={{
		unstyled: true,
		classes: {
			toast: "flex gap-3 rounded border border-border bg-background/80 px-3 py-2.5 shadow-lg backdrop-blur-xl dark:bg-background/30 min-w-sm",
			content: "flex flex-col gap-0.5",
			title: "text-sm font-medium text-foreground",
			description: "text-xs text-muted-foreground",
			icon: "mt-0.5",
			closeButton:
				"absolute top-2 bg-transparent right-2 rounded text-muted-foreground transition-colors hover:text-foreground",
			error: "border-l-2 border-l-red-500",
			success: "border-l-2 border-l-rosemi-500",
			info: "border-l-2 border-l-foreground",
			warning: "border-l-2 border-l-amber-500"
		}
	}}
>
	{#snippet closeIcon()}
		<span class="iconify size-3 text-foreground material-symbols--close-rounded"></span>
	{/snippet}
</Toaster>
