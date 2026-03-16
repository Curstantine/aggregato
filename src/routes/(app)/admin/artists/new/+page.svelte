<script lang="ts">
	import { toast } from "svelte-sonner";

	import { enhance } from "$app/forms";

	import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
	import {
		ControlGroupDivider,
		ControlGroupField,
		ControlGroupHeader
	} from "$lib/components/ControlGroup";
	import { Button, Input, Label } from "$lib/components/form";
	import { Select } from "$lib/components/Select";
	import SettingsHeader from "$lib/components/SettingsHeader.svelte";

	import type { PageProps, SubmitFunction } from "./$types";

	let { form }: PageProps = $props();
	let submitting = $state(false);
	let status = $state("Approved");

	const submit: SubmitFunction = () => {
		submitting = true;

		return async ({ result, update }) => {
			submitting = false;

			if (result.type === "failure" && result.data) {
				toast.error("Failed to create artist", {
					description: (result.data as { message: string }).message
				});
			}

			await update();
		};
	};

	const statusItems = [
		{ value: "Approved", label: "Approved" },
		{ value: "Pending", label: "Pending" },
		{ value: "Deleted", label: "Deleted" }
	];
</script>

<Breadcrumbs
	items={[
		{ label: "Admin", href: "/admin" },
		{ label: "Artists", href: "/admin/artists" },
		{ label: "New" }
	]}
/>
<SettingsHeader>New Artist</SettingsHeader>

<form method="POST" use:enhance={submit} class="space-y-4">
	<section>
		<ControlGroupHeader>Details</ControlGroupHeader>
		<div class="space-y-3 rounded border border-border p-3">
			<ControlGroupField id="name" label="Name" description="The primary name of the artist.">
				<Label id="name" label="Name" error={form?.invalid?.name}>
					<Input id="name" name="name" placeholder="Enter artist name" required />
				</Label>
			</ControlGroupField>

			<ControlGroupDivider />

			<ControlGroupField
				id="status"
				label="Status"
				description="The approval status of this artist."
			>
				<input type="hidden" name="status" value={status} />
				<Select
					type="single"
					bind:value={status}
					items={statusItems}
					placeholder="Select status"
				/>
			</ControlGroupField>
		</div>
	</section>

	<section>
		<ControlGroupHeader>External Links</ControlGroupHeader>
		<div class="space-y-3 rounded border border-border p-3">
			<p class="text-sm text-muted-foreground">
				At least one external link or identifier is required.
			</p>

			<ControlGroupField
				id="externalLastfmLink"
				label="Last.fm URL"
				description="Full URL to the artist's Last.fm page."
			>
				<Label
					id="externalLastfmLink"
					label="Last.fm URL"
					error={form?.invalid?.externalLastfmLink}
				>
					<Input
						id="externalLastfmLink"
						name="externalLastfmLink"
						placeholder="https://www.last.fm/music/..."
					/>
				</Label>
			</ControlGroupField>

			<ControlGroupDivider />

			<ControlGroupField
				id="externalMusicBrainzId"
				label="MusicBrainz ID"
				description="The MusicBrainz artist UUID."
			>
				<Label
					id="externalMusicBrainzId"
					label="MusicBrainz ID"
					error={form?.invalid?.externalMusicBrainzId}
				>
					<Input
						id="externalMusicBrainzId"
						name="externalMusicBrainzId"
						placeholder="e.g. 5b11f4ce-a62d-471e-81fc-a69a8278c7da"
					/>
				</Label>
			</ControlGroupField>

			<ControlGroupDivider />

			<ControlGroupField
				id="externalAppleMusicId"
				label="Apple Music ID"
				description="The Apple Music artist numeric ID."
			>
				<Label
					id="externalAppleMusicId"
					label="Apple Music ID"
					error={form?.invalid?.externalAppleMusicId}
				>
					<Input
						id="externalAppleMusicId"
						name="externalAppleMusicId"
						placeholder="e.g. 123456789"
					/>
				</Label>
			</ControlGroupField>

			<ControlGroupDivider />

			<ControlGroupField
				id="externalYouTubeMusicId"
				label="YouTube Music ID"
				description="The YouTube channel ID for this artist."
			>
				<Label
					id="externalYouTubeMusicId"
					label="YouTube Music ID"
					error={form?.invalid?.externalYouTubeMusicId}
				>
					<Input
						id="externalYouTubeMusicId"
						name="externalYouTubeMusicId"
						placeholder="e.g. UCxxxxxxxxxxxxxxx"
					/>
				</Label>
			</ControlGroupField>

			<ControlGroupDivider />

			<ControlGroupField
				id="externalSpotifyId"
				label="Spotify ID"
				description="The Spotify artist ID."
			>
				<Label
					id="externalSpotifyId"
					label="Spotify ID"
					error={form?.invalid?.externalSpotifyId}
				>
					<Input
						id="externalSpotifyId"
						name="externalSpotifyId"
						placeholder="e.g. 4Z8W4fKeB5YxbusRsdQVPb"
					/>
				</Label>
			</ControlGroupField>

			<ControlGroupDivider />

			<ControlGroupField
				id="externalDeezerId"
				label="Deezer ID"
				description="The Deezer artist numeric ID."
			>
				<Label
					id="externalDeezerId"
					label="Deezer ID"
					error={form?.invalid?.externalDeezerId}
				>
					<Input
						id="externalDeezerId"
						name="externalDeezerId"
						placeholder="e.g. 123456"
					/>
				</Label>
			</ControlGroupField>
		</div>
	</section>

	<div class="flex justify-end">
		<Button intent="rosemi" type="submit" disabled={submitting}>Create Artist</Button>
	</div>
</form>
