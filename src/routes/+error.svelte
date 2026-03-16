<script lang="ts">
	import { resolve } from "$app/paths";
	import { page } from "$app/state";

	import { Button } from "$lib/components/form";

	const title = $derived(page.status === 404 ? "Page not found" : "Something went wrong");
	const description = $derived(
		page.status === 404
			? "The page you are looking for does not exist or may have been moved."
			: "An unexpected error occurred while loading this page. Please try again."
	);

	const details = $derived(
		typeof page.error === "object" && page.error && "message" in page.error
			? String(page.error.message)
			: null
	);
</script>

<svelte:head>
	<title>{page.status} | Aggregato</title>
</svelte:head>

<section class="container flex min-h-[calc(100svh-4rem)] flex-col items-start justify-center py-8">
	<p class="text-sm font-medium text-rosemi-500">Error {page.status}</p>
	<h1 class="text-3xl leading-tight font-semibold sm:text-4xl">{title}</h1>
	<p class="mt-1 mb-4 max-w-xl text-sm text-muted-foreground sm:text-base">{description}</p>

	<Button href={resolve("/")}>Back to home</Button>
</section>
