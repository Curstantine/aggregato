<script lang="ts">
	import Input from "$lib/components/form/Input.svelte";
	import Label from "$lib/components/form/Label.svelte";
	import { Select, SelectItem } from "$lib/components/Select";

	import type { PageProps } from "./$types";

	const lastfmModes = [
		{ value: "top-10-scrobbles", label: "Top 10 Scrobbles" },
		{ value: "top-50-scrobbles", label: "Top 50 Scrobbles" },
		{ value: "all", label: "All" }
	];

	let lastfmMode = $state("");

	let { data }: PageProps = $props();
</script>

<h1 class="text-lg leading-tight font-medium">Import</h1>
<span class="mb-4 text-sm text-muted-foreground">
	Import your followed artists and other data from the integration catalog
</span>

<section
	id="lastfm"
	class="grid grid-cols-[minmax(--spacing(24),auto)_minmax(--spacing(32),--spacing(72))] gap-3"
>
	<div class=" flex flex-col">
		<h2>Last.fm</h2>
		<span class="text-sm text-muted-foreground">
			Connect to your Last.FM account to import your
		</span>
	</div>
	<form class="space-y-2">
		<Label id="lastfm-username" label="Your Last.fm username">
			<Input id="lastfm-username" name="lastfm.username" placeholder="Last.fm username" />
		</Label>

		<Label id="lastfm-import-mode" label="Select import mode">
			<Select
				type="single"
				bind:value={lastfmMode}
				items={lastfmModes}
				placeholder="Select an import mode"
				triggerProps={{}}
				contentProps={{ sideOffset: 16 }}
			>
				{#each lastfmModes as mode}
					<SelectItem value={mode.value} label={mode.label}>{mode.label}</SelectItem>
				{/each}
			</Select>
		</Label>
	</form>
</section>
