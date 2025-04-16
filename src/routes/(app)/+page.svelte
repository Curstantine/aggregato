<script lang="ts">
	const catalogs: { title: string; description: string }[] = [
		{
			title: "last.fm",
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
	class="container grid grid-cols-2 gap-3 pt-4 md:grid-cols-[repeat(auto-fill,--spacing(64))]"
>
	<div class="col-span-full flex flex-col">
		<h1 class="text-lg leading-tight font-medium">Importing artists</h1>
		<span class="text-sm text-neutral-400">
			Get started by importing your favorite artists from the integration catalog or by
			searching and following them directly.
		</span>
	</div>

	{#each catalogs as catalog}
		<div class="flex flex-col rounded border border-neutral-800 p-2">
			<span class="text-sm font-medium">{catalog.title}</span>
			<p class="text-xs text-neutral-400">{catalog.description}</p>
		</div>
	{/each}
</section>

<div class="absolute -top-24 -left-24 -z-10 size-72 rounded-full bg-rosemi-500/10 blur-3xl"></div>
<div class="absolute top-24 left-24 -z-20 size-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
