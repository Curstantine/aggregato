<script lang="ts">
	import Button from "$lib/components/form/Button.svelte";
	import Input from "$lib/components/form/Input.svelte";
	import Label from "$lib/components/form/Label.svelte";
	import { Select, SelectItem } from "$lib/components/Select";

	import type { PageProps } from "./$types";

	const lastfmModes = [
		{ value: "top-10", label: "Top 10 Scrobbles" },
		{ value: "top-50", label: "Top 50 Scrobbles" },
		{ value: "all", label: "All" }
	];

	const listenbrainzModes = [
		{ value: "top-10", label: "Top 10 Listens" },
		{ value: "top-50", label: "Top 50 Listens" },
		{ value: "all", label: "All" }
	];

	let lastfmMode = $state("");
	let listenbrainzMode = $state("");

	let { data }: PageProps = $props();
</script>

<h1 class="text-lg leading-tight font-medium">Import</h1>
<span class="mb-4 text-sm text-muted-foreground">
	Import your followed artists and other data from the integration catalog
</span>

<section
	id="lastfm"
	class="grid gap-3 md:grid-cols-[minmax(--spacing(24),auto)_minmax(--spacing(32),--spacing(72))]"
>
	<div class="flex flex-col">
		<h2>Last.fm</h2>
		<p class="text-sm text-muted-foreground">
			Connect your Last.fm account to import scrobbled artists<br />
			Note: The higher the import mode, more time it will take to import the data
		</p>
	</div>
	<form class="space-y-2">
		<Label id="lastfm-username" label="Your Last.fm username">
			<Input id="lastfm-username" name="lastfm.username" placeholder="Last.fm username" />
		</Label>

		<Label id="lastfm-import-mode" label="Import mode">
			<Select
				type="single"
				bind:value={lastfmMode}
				items={lastfmModes}
				placeholder="Select an import mode"
				contentProps={{ sideOffset: 16 }}
			>
				{#each lastfmModes as mode}
					<SelectItem value={mode.value} label={mode.label}>{mode.label}</SelectItem>
				{/each}
			</Select>
		</Label>

		<Button class="!mt-4 ml-auto w-38" intent="rosemi">Import scrobbles</Button>
	</form>
</section>

<section
	id="listenbrainz"
	class="mt-12 grid gap-3 md:grid-cols-[minmax(--spacing(24),auto)_minmax(--spacing(32),--spacing(72))]"
>
	<div class="flex flex-col">
		<h2>ListenBrainz</h2>
		<p class="text-sm text-muted-foreground">
			Connect your ListenBrainz account to import listened artists<br />
			Note: The higher the import mode, more time it will take to import the listens
		</p>
	</div>
	<form class="space-y-2">
		<Label id="listenbrainz-username" label="Your ListenBrainz username">
			<Input
				id="listenbrainz-username"
				name="listenbrainz.username"
				placeholder="ListenBrainz username"
			/>
		</Label>

		<Label id="listenbrainz-import-mode" label="Import mode">
			<Select
				type="single"
				bind:value={listenbrainzMode}
				items={listenbrainzModes}
				placeholder="Select an import mode"
				contentProps={{ sideOffset: 16 }}
			>
				{#each listenbrainzModes as mode}
					<SelectItem value={mode.value} label={mode.label}>{mode.label}</SelectItem>
				{/each}
			</Select>
		</Label>

		<Button class="!mt-4 ml-auto w-32" intent="rosemi">Import listens</Button>
	</form>
</section>
