<script lang="ts">
	import {
		ControlGroup,
		ControlGroupDivider,
		ControlGroupField,
		ControlGroupHeader
	} from "$lib/components/ControlGroup";
	import Button from "$lib/components/form/Button.svelte";
	import Input from "$lib/components/form/Input.svelte";
	import { Select, SelectItem } from "$lib/components/Select";
	import SettingsHeader from "$lib/components/SettingsHeader.svelte";

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

<SettingsHeader>Import</SettingsHeader>

<section id="lastfm">
	<ControlGroupHeader>Last.fm</ControlGroupHeader>
	<ControlGroup>
		<ControlGroupField id="lastfm-username" label="Your Last.fm username">
			<Input id="lastfm-username" name="lastfm.username" placeholder="Last.fm username" />
		</ControlGroupField>

		<ControlGroupDivider />

		<ControlGroupField
			id="lastfm-import-mode"
			label="Import mode"
			description="The strategy to import the data. The higher the import mode, more time it will take to import the data"
		>
			<Select
				type="single"
				name="lastfm-import-mode"
				bind:value={lastfmMode}
				items={lastfmModes}
				placeholder="Select an import mode"
				contentProps={{ sideOffset: 16 }}
			>
				{#each lastfmModes as mode}
					<SelectItem value={mode.value} label={mode.label}>{mode.label}</SelectItem>
				{/each}
			</Select>
		</ControlGroupField>

		<ControlGroupDivider />

		<Button class="ml-auto" intent="boring">Import Scrobbles</Button>
	</ControlGroup>
</section>

<section id="listenbrainz" class="mt-4">
	<ControlGroupHeader>ListenBrainz</ControlGroupHeader>
	<ControlGroup>
		<ControlGroupField id="listenbrainz-username" label="Your ListenBrainz username">
			<Input
				id="listenbrainz-username"
				name="listenbrainz.username"
				placeholder="Last.fm username"
			/>
		</ControlGroupField>

		<ControlGroupDivider />

		<ControlGroupField
			id="listenbrainz-import-mode"
			label="Import mode"
			description="The strategy to import the data. The higher the import mode, more time it will take to import the data"
		>
			<Select
				type="single"
				name="listenbrainz-import-mode"
				bind:value={listenbrainzMode}
				items={listenbrainzModes}
				placeholder="Select an import mode"
				contentProps={{ sideOffset: 16 }}
			>
				{#each listenbrainzModes as mode}
					<SelectItem value={mode.value} label={mode.label}>{mode.label}</SelectItem>
				{/each}
			</Select>
		</ControlGroupField>

		<ControlGroupDivider />

		<Button class="ml-auto" intent="boring">Import Listens</Button>
	</ControlGroup>
</section>
