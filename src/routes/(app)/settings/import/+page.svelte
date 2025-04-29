<script lang="ts">
	import { applyAction } from "$app/forms";

	import {
		addNotification,
		removeNotification,
		upsertNotification
	} from "$lib/client/state/notification.svelte";
	import SafeBroadcastChannel from "$lib/client/sw/broadcast";
	import type { SwImportMessage } from "$lib/client/sw/types";

	import { ImportMode } from "$lib/types/form";

	import {
		ControlGroup,
		ControlGroupDivider,
		ControlGroupField,
		ControlGroupHeader
	} from "$lib/components/ControlGroup";
	import { Button, Input } from "$lib/components/form";
	import { Select, SelectItem } from "$lib/components/Select";
	import SettingsHeader from "$lib/components/SettingsHeader.svelte";

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

				const noticeIdx = addNotification({
					label: "Import queued in the background",
					description:
						"You can close this tab now, but make sure not to close the browser window."
				});

				const importChannel = new SafeBroadcastChannel<SwImportMessage>("sw-import");
				let idx: string | null = null;

				// Note(Curstantine):
				// NEVER do anything stateful here. This is purely for display purposes.
				// The user can, and will, navigate to another page or close the tab,
				// so make sure to let ONLY the service worker do anything useful.
				const listener = (ev: MessageEvent<SwImportMessage>) => {
					if (ev.data.status === "active") {
						idx = upsertNotification(idx, {
							label: `Importing ${ev.data.type} artists (${ev.data.current}/${ev.data.total})`,
							description: ev.data.message,
							progress: [ev.data.current ?? 0, ev.data.total ?? 0]
						});
						return;
					}

					if (ev.data.status === "completed") {
						upsertNotification(idx, {
							label: `${ev.data.type} import was completed successfully`,
							description: ev.data.message,
							progress: undefined
						});
					}

					if (ev.data.status === "failed") {
						upsertNotification(idx, {
							label: `${ev.data.type} import failed`,
							description: ev.data.message
						});
					}

					removeNotification(noticeIdx);
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
