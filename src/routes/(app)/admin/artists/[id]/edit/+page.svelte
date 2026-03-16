<script lang="ts">
	import { toast } from "svelte-sonner";

	import { enhance } from "$app/forms";

	import { ContentStatus } from "$lib/types/schema";

	import Breadcrumbs from "$lib/components/Breadcrumbs.svelte";
	import {
		ControlGroupContent,
		ControlGroupDivider,
		ControlGroupField,
		ControlGroupHeader
	} from "$lib/components/ControlGroup";
	import { Button, Input, Label } from "$lib/components/form";
	import { Select, SelectItem } from "$lib/components/Select";
	import SettingsHeader from "$lib/components/SettingsHeader.svelte";

	import type { PageProps, SubmitFunction } from "./$types";

	let { data, form }: PageProps = $props();
	let submitting = $state(false);
	let deleting = $state(false);

	const submitUpdate: SubmitFunction = () => {
		submitting = true;

		return async ({ result, update }) => {
			submitting = false;

			if (result.type === "failure" && result.data) {
				toast.error("Failed to update artist", {
					description: (result.data as { message: string }).message
				});
			} else if (result.type === "success") {
				toast.success("Artist updated");
			}

			await update();
		};
	};

	const submitDelete: SubmitFunction = () => {
		deleting = true;

		return async ({ result, update }) => {
			deleting = false;

			if (result.type === "failure" && result.data) {
				toast.error("Failed to delete artist", {
					description: (result.data as { message: string }).message
				});
			}

			await update();
		};
	};

	const statusItems = [
		{ value: ContentStatus.Approved, label: "Approved" },
		{ value: ContentStatus.Pending, label: "Pending" },
		{ value: ContentStatus.Deleted, label: "Deleted" }
	];
</script>

<Breadcrumbs
	items={[
		{ label: "Admin", href: "/admin" },
		{ label: "Artists", href: "/admin/artists" },
		{ label: data.artist.name }
	]}
/>
<SettingsHeader>Edit Artist</SettingsHeader>

<form method="POST" action="?/update" use:enhance={submitUpdate} class="space-y-4">
	<section>
		<ControlGroupHeader>Details</ControlGroupHeader>
		<ControlGroupContent>
			<ControlGroupField id="name" label="Name" description="The primary name of the artist.">
				<Input
					name="name"
					placeholder="Enter artist name"
					value={data.artist.name}
					required
				/>
			</ControlGroupField>

			<ControlGroupDivider />

			<ControlGroupField
				id="status"
				label="Status"
				description="The approval status of this artist."
			>
				<Select
					type="single"
					name="status"
					value={data.artist.status}
					items={statusItems}
					placeholder="Select status"
				>
					{#each statusItems as status}
						<SelectItem value={status.value} label={status.label}>
							{status.label}
						</SelectItem>
					{/each}
				</Select>
			</ControlGroupField>
		</ControlGroupContent>
	</section>

	<section>
		<ControlGroupHeader>External Links</ControlGroupHeader>
		<ControlGroupContent>
			<ControlGroupField
				id="externalLastfmLink"
				label="Last.fm URL"
				description="Full URL to the artist's Last.fm page."
				error={form?.invalid?.externalLastfmLink}
			>
				<Input
					id="externalLastfmLink"
					name="externalLastfmLink"
					placeholder="https://www.last.fm/music/..."
					aria-describedby="externalLastfmLink-error"
					value={data.artist.externalLastfmLink ?? ""}
				/>
			</ControlGroupField>

			<ControlGroupDivider />

			<ControlGroupField
				id="externalMusicBrainzId"
				label="MusicBrainz ID"
				description="The MusicBrainz artist UUID."
				error={form?.invalid?.externalMusicBrainzId}
			>
				<Input
					id="externalMusicBrainzId"
					name="externalMusicBrainzId"
					placeholder="e.g. 5b11f4ce-a62d-471e-81fc-a69a8278c7da"
					aria-describedby="externalMusicBrainzId-error"
					value={data.artist.externalMusicBrainzId ?? ""}
				/>
			</ControlGroupField>

			<ControlGroupDivider />

			<ControlGroupField
				id="externalAppleMusicId"
				label="Apple Music ID"
				description="The Apple Music artist numeric ID."
				error={form?.invalid?.externalAppleMusicId}
			>
				<Input
					id="externalAppleMusicId"
					name="externalAppleMusicId"
					placeholder="e.g. 123456789"
					aria-describedby="externalAppleMusicId-error"
					value={data.artist.externalAppleMusicId ?? ""}
				/>
			</ControlGroupField>

			<ControlGroupDivider />

			<ControlGroupField
				id="externalYouTubeMusicId"
				label="YouTube Music ID"
				description="The YouTube channel ID for this artist."
				error={form?.invalid?.externalYouTubeMusicId}
			>
				<Input
					id="externalYouTubeMusicId"
					name="externalYouTubeMusicId"
					placeholder="e.g. UCxxxxxxxxxxxxxxx"
					aria-describedby="externalYouTubeMusicId-error"
					value={data.artist.externalYouTubeMusicId ?? ""}
				/>
			</ControlGroupField>

			<ControlGroupDivider />

			<ControlGroupField
				id="externalSpotifyId"
				label="Spotify ID"
				description="The Spotify artist ID."
				error={form?.invalid?.externalSpotifyId}
			>
				<Input
					id="externalSpotifyId"
					name="externalSpotifyId"
					placeholder="e.g. 4Z8W4fKeB5YxbusRsdQVPb"
					aria-describedby="externalSpotifyId-error"
					value={data.artist.externalSpotifyId ?? ""}
				/>
			</ControlGroupField>

			<ControlGroupDivider />

			<ControlGroupField
				id="externalDeezerId"
				label="Deezer ID"
				description="The Deezer artist numeric ID."
				error={form?.invalid?.externalDeezerId}
			>
				<Input
					id="externalDeezerId"
					name="externalDeezerId"
					placeholder="e.g. 123456"
					aria-describedby="externalDeezerId-error"
					value={data.artist.externalDeezerId ?? ""}
				/>
			</ControlGroupField>
		</ControlGroupContent>
	</section>

	<div class="flex justify-end">
		<Button intent="rosemi" type="submit" disabled={submitting}>Save Changes</Button>
	</div>
</form>

<section class="mt-6">
	<ControlGroupHeader>Danger Zone</ControlGroupHeader>
	<ControlGroupContent>
		<div class="flex items-center justify-between">
			<div class="flex flex-col">
				<span class="text-sm font-medium">Delete Artist</span>
				<span class="text-sm text-muted-foreground">
					Permanently remove this artist and all associated data. This action cannot be
					undone.
				</span>
			</div>
			<form method="POST" action="?/delete" use:enhance={submitDelete}>
				<Button
					intent="boring"
					type="submit"
					disabled={deleting}
					class="border-red-500/30! text-red-400!"
				>
					Delete
				</Button>
			</form>
		</div>
	</ControlGroupContent>
</section>
