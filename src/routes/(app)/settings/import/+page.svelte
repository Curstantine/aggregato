<script lang="ts">
	import { applyAction } from "$app/forms";

	import { upsertNotification } from "$lib/client/state/notification.svelte";
	import SafeBroadcastChannel from "$lib/client/sw/broadcast";
	import type { SwImportMessage } from "$lib/client/sw/types";

	import {
		ControlGroup,
		ControlGroupDivider,
		ControlGroupField,
		ControlGroupHeader
	} from "$lib/components/ControlGroup";
	import { Button, Input } from "$lib/components/form";
	import { Select, SelectItem } from "$lib/components/Select";
	import SettingsHeader from "$lib/components/SettingsHeader.svelte";

	import { ImportMode } from "$lib/types/form";

	import type { PageProps, SubmitFunction } from "./$types";

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

	const importAction: SubmitFunction = ({ formData, cancel }) => {
		formData.set("js-allowed", "true");

		return async ({ result }) => {
			if (result.type === "success" && result.data?.runImportLocally) {
				navigator.serviceWorker.controller?.postMessage({
					type: result.data.type,
					...result.data.params
				});

				const importChannel = new SafeBroadcastChannel<SwImportMessage>("sw-import");
				let idx: string | null = null;

				const listener = (ev: MessageEvent<SwImportMessage>) => {
					if (ev.data.status === "active") {
						idx = upsertNotification(idx, {
							label: `Importing last.fm artists (${ev.data.current}/${ev.data.total})`,
							description: ev.data.message,
							progress: [ev.data.current ?? 0, ev.data.total ?? 0]
						});
						return;
					}

					if (ev.data.status === "completed") {
						upsertNotification(idx, {
							label: "Import was completed successfully",
							description: ev.data.message,
							progress: undefined
						});
					}

					// TODO: Show errors in the notifications
					// if (ev.data.status === "failed") {}

					importChannel.removeEventListener("message", listener);
				};

				importChannel.addEventListener("message", listener);
			}

			await applyAction(result);
		};
	};

	let { data, form }: PageProps = $props();
</script>

<SettingsHeader>Import</SettingsHeader>

<section id="lastfm">
	<ControlGroupHeader>Last.fm</ControlGroupHeader>
	<ControlGroup method="POST" action="?/lastfm" submit={importAction}>
		<ControlGroupField id="lastfm-username" label="Your Last.fm username">
			<Input
				id="lastfm-username"
				name="username"
				placeholder="Last.fm username"
				defaultValue={data?.lastfmUsername ?? undefined}
				required
			/>
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
	<ControlGroup method="POST" action="?/listenbrainz" submit={importAction}>
		<ControlGroupField id="listenbrainz-username" label="Your ListenBrainz username">
			<Input
				id="listenbrainz-username"
				name="username"
				placeholder="ListenBrainz username"
				defaultValue={data.listenBrainzUsername ?? undefined}
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
