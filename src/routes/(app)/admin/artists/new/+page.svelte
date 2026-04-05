<script lang="ts">
	import { toast } from "svelte-sonner";
	import type { Attachment } from "svelte/attachments";

	import { applyAction, enhance } from "$app/forms";

	import { clearCrumbs, setCrumbs } from "$lib/client/state/breadcrumbs.svelte";

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

	let { form }: PageProps = $props();
	let submitting = $state(false);

	const submit: SubmitFunction = () => {
		submitting = true;

		return async ({ result }) => {
			submitting = false;

			if (result.type === "failure" && result.data) {
				toast.error("Failed to create artist", {
					description: (result.data as { message: string }).message
				});
			}

			await applyAction(result);
		};
	};

	const statusItems = [
		{ value: "Approved", label: "Approved" },
		{ value: "Pending", label: "Pending" },
		{ value: "Deleted", label: "Deleted" }
	];

	const headerAttach: Attachment = () => {
		setCrumbs([
			{ label: "Admin", href: "/admin" },
			{ label: "Artists", href: "/admin/artists" },
			{ label: "New" }
		]);

		return () => clearCrumbs();
	};
</script>

<SettingsHeader {@attach headerAttach}>New Artist</SettingsHeader>

<form method="POST" use:enhance={submit} class="space-y-4">
	<section>
		<ControlGroupHeader>Details</ControlGroupHeader>
		<ControlGroupContent>
			<ControlGroupField id="name" label="Name" description="The primary name of the artist.">
				<Input name="name" placeholder="Enter artist name" required />
			</ControlGroupField>

			<ControlGroupDivider />

			<ControlGroupField
				id="status"
				label="Status"
				description="The approval status of this artist."
			>
				<Select type="single" name="status" items={statusItems} placeholder="Select status">
					{#each statusItems as status (status.value)}
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
				/>
			</ControlGroupField>
		</ControlGroupContent>
	</section>

	<div class="flex justify-end">
		<Button intent="rosemi" type="submit" padding="leading" disabled={submitting}>
			{#if submitting}
				<span class="iconify size-4 line-md--loading-loop"></span>
			{/if}
			Create Artist
		</Button>
	</div>
</form>
