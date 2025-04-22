<script lang="ts">
	import type { ComponentProps } from "svelte";

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

	import { ImportMode } from "$lib/types/form";

	import type { PageProps } from "./$types";

	const lastfmModes = [
		{ value: ImportMode.Top10, label: "Top 10 Scrobbles" },
		{ value: ImportMode.Top50, label: "Top 50 Scrobbles" },
		{ value: ImportMode.All, label: "All" }
	];

	const listenbrainzModes = [
		{ value: ImportMode.Top10, label: "Top 10 Listens" },
		{ value: ImportMode.Top50, label: "Top 50 Listens" },
		{ value: ImportMode.All, label: "All" }
	];

	const importAction: ComponentProps<typeof ControlGroup>["enhanceCallback"] = ({
		formData,
		cancel,
		action
	}) => {
		const type = action.search.substring(2);
		const username = formData.get("username");
		const mode = formData.get("mode");

		navigator.serviceWorker.controller?.postMessage({
			type: `import-${type}`,
			username,
			mode
		});

		cancel();
	};

	let { data }: PageProps = $props();
</script>

<SettingsHeader>Import</SettingsHeader>

<section id="lastfm">
	<ControlGroupHeader>Last.fm</ControlGroupHeader>
	<ControlGroup method="POST" action="?/lastfm" enhanceCallback={importAction}>
		<ControlGroupField id="lastfm-username" label="Your Last.fm username">
			<Input id="lastfm-username" name="username" placeholder="Last.fm username" required />
		</ControlGroupField>

		<ControlGroupDivider />

		<ControlGroupField
			id="lastfm-import-mode"
			label="Import mode"
			description="The strategy to import the data. The higher the import mode, more time it will take to import the data"
		>
			<Select
				type="single"
				name="mode"
				items={lastfmModes}
				placeholder="Select an import mode"
				contentProps={{ sideOffset: 16 }}
				required
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
	<ControlGroup method="POST" action="?/listenbrainz" enhanceCallback={importAction}>
		<ControlGroupField id="listenbrainz-username" label="Your ListenBrainz username">
			<Input
				id="listenbrainz-username"
				name="username"
				placeholder="ListenBrainz username"
				required
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
				name="mode"
				items={listenbrainzModes}
				placeholder="Select an import mode"
				contentProps={{ sideOffset: 16 }}
				required
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
