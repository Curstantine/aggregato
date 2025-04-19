<script lang="ts">
	type Catalog = { title: string; description: string };
	const catalogs: Catalog[] = [
		{
			title: "Last.fm",
			description: "Connect your last.fm account and import your scrobbled artists."
		},
		{
			title: "Spotify",
			description: "Import your favorite artists from your Spotify account."
		},
		{
			title: "Apple Music",
			description: "Connect to Apple Music and import artists from your library."
		},
		{
			title: "Bandcamp",
			description: "Import artists you follow and have purchased music from on Bandcamp."
		},
		{
			title: "ListenBrainz",
			description: "Import your listening data and favorite artists from ListenBrainz."
		}
	];
</script>

<section
	class="container grid grid-cols-1 gap-2 pt-4 sm:grid-cols-2 md:grid-cols-[repeat(auto-fill,--spacing(64))]"
>
	<div class="col-span-full mb-1 flex flex-col">
		<h1 class="text-lg leading-tight font-medium">
			Importing artists
			<span class="-ml-1 text-red-500 dark:text-red-400">*</span>
		</h1>
		<span class="text-sm text-muted-foreground">
			Get started by importing your favorite artists from the integration catalog or by
			searching and following them directly.
		</span>
	</div>

	{#each catalogs as catalog}
		<button
			class="group flex flex-col rounded border border-border px-2 py-3 text-start transition-colors hover:border-rosemi-500 hover:bg-background/30 sm:py-2"
		>
			<span class="text-sm font-medium select-none">{catalog.title}</span>
			<p class="text-xs text-muted-foreground select-none">{catalog.description}</p>
			<div
				class="iconify size-4 self-end text-foreground transition-all material-symbols--keyboard-arrow-right group-hover:translate-x-0.5 group-hover:text-rosemi-500"
			></div>
		</button>
	{/each}
</section>

<div class="fixed inset-x-0 top-0 -z-10 container">
	<div
		class="absolute top-24 right-24 -z-10 size-72 animate-fade-in rounded-full bg-rosemi-500/10 blur-3xl"
	></div>
	<div
		class="absolute -top-24 right-0 -z-10 size-72 animate-fade-in rounded-full bg-sky-500/5 blur-3xl"
	></div>
</div>
