<script lang="ts">
	import { createSearchParams } from "@jabascript/query";
	import { toast } from "svelte-sonner";
	import type { Attachment } from "svelte/attachments";

	import { applyAction, enhance } from "$app/forms";
	import { goto } from "$app/navigation";
	import { resolve } from "$app/paths";

	import { clearCrumbs, setCrumbs } from "$lib/client/state/breadcrumbs.svelte";

	import { Button, Input } from "$lib/components/form";
	import SettingsHeader from "$lib/components/SettingsHeader.svelte";

	import type { PageProps, SubmitFunction } from "./$types";

	let { data }: PageProps = $props();
	let searchValue = $state(data.search);
	let deleting = $state<string | null>(null);

	function handleSearch(event: SubmitEvent) {
		event.preventDefault();

		const a = createSearchParams({ search: searchValue || null });
		const qs = a.toString();

		goto(`${resolve("/admin/artists")}${qs ? `?${qs}` : ""}`);
	}

	function externalLinkCount(artist: (typeof data.artists)[0]) {
		let n = 0;
		if (artist.externalLastfmLink) n++;
		if (artist.externalMusicBrainzId) n++;
		if (artist.externalAppleMusicId) n++;
		if (artist.externalYouTubeMusicId) n++;
		if (artist.externalSpotifyId) n++;
		if (artist.externalDeezerId) n++;
		return n;
	}

	const deleteSubmit: SubmitFunction = ({ formData }) => {
		const id = formData.get("id") as string;
		deleting = id;

		return async ({ result }) => {
			deleting = null;

			if (result.type === "failure" && result.data) {
				toast.error("Failed to delete artist", {
					description: (result.data as { message: string }).message
				});
			} else if (result.type === "success") {
				toast.success("Artist deleted");
			}

			await applyAction(result);
		};
	};

	const headerAttach: Attachment = () => {
		setCrumbs([
			{ label: "Admin", href: "/admin" },
			{ label: "Artists", href: "/admin/artists" }
		]);

		return () => clearCrumbs();
	};
</script>

<SettingsHeader {@attach headerAttach}>Artists</SettingsHeader>

<div class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
	<form onsubmit={handleSearch} class="flex gap-2">
		<Input
			type="text"
			name="search"
			placeholder="Search by name..."
			value={searchValue}
			oninput={(e) => (searchValue = e.currentTarget.value)}
			class="w-64"
		/>
		<Button type="submit" intent="boring">Search</Button>
	</form>

	<Button
		href={resolve("/admin/artists/new")}
		intent="rosemi"
		padding="leading"
		class="w-full sm:w-fit"
	>
		<span class="iconify size-4 material-symbols--add-rounded"></span>
		New Artist
	</Button>
</div>

<div class="overflow-x-auto rounded border border-border">
	<table class="w-full text-sm">
		<thead>
			<tr class="border-b border-border bg-background-2 text-left">
				<th class="px-3 py-2 font-medium">Name</th>
				<th class="px-3 py-2 font-medium">Status</th>
				<th class="hidden px-3 py-2 font-medium sm:table-cell">Links</th>
				<th class="hidden px-3 py-2 font-medium md:table-cell">Created</th>
				<th class="px-3 py-2 text-right font-medium">Actions</th>
			</tr>
		</thead>
		<tbody>
			{#each data.artists as artist (artist.id)}
				{@render row(artist)}
			{:else}
				<tr>
					<td colspan="5" class="px-3 py-2 text-center">
						<p class="text-sm text-muted-foreground">
							{data.search
								? "No artists found matching your search."
								: "No artists yet."}
						</p>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

{#if data.totalPages > 1}
	{@const base = resolve("/admin/artists") + (data.search ? `?search=${data.search}` : "")}
	{@const prev = `${base}?page=${data.page - 1}`}
	{@const next = `${base}?page=${data.page + 1}`}

	<nav class="mt-4 flex items-center justify-between" aria-label="Pagination">
		<p class="text-sm text-muted-foreground">
			Showing {(data.page - 1) * 20 + 1}–{Math.min(data.page * 20, data.total)} of {data.total}
		</p>
		<div class="flex gap-1">
			{#if data.page > 1}
				<Button href={prev} size="default" intent="boring">Previous</Button>
			{/if}
			{#if data.page < data.totalPages}
				<Button href={next} size="default" intent="boring">Next</Button>
			{/if}
		</div>
	</nav>
{/if}

{#snippet row(artist: (typeof data.artists)[0])}
	<tr class="border-b border-border last:border-b-0">
		<td class="px-3 py-2">{artist.name}</td>
		<td class="px-3 py-2">
			<span
				class={[
					"inline-block rounded px-2 py-0.5 text-xs font-medium",
					artist.status === "Approved" && "bg-emerald-500/10 text-emerald-500",
					artist.status === "Pending" && "bg-amber-500/10 text-amber-500",
					artist.status === "Deleted" && "bg-red-500/10 text-red-500"
				]}
			>
				{artist.status}
			</span>
		</td>
		<td class="hidden px-3 py-2 text-muted-foreground sm:table-cell">
			{externalLinkCount(artist)}
		</td>
		<td class="hidden px-3 py-2 text-muted-foreground md:table-cell">
			{artist.createdAt.toLocaleDateString()}
		</td>
		<td class="px-3 py-2 text-right">
			<div class="flex items-center justify-end gap-1">
				<a href={resolve(`/admin/artists/${artist.id}/edit`)}>
					<Button size="squareSmall" intent="ghost">
						<span class="iconify size-4 material-symbols--edit-outline-rounded"></span>
					</Button>
				</a>
				<form method="POST" action="?/delete" use:enhance={deleteSubmit}>
					<input type="hidden" name="id" value={artist.id} />
					<Button
						type="submit"
						size="squareSmall"
						intent="ghost"
						disabled={deleting === artist.id}
					>
						<span
							class="iconify size-4 text-red-400 material-symbols--delete-outline-rounded"
						></span>
					</Button>
				</form>
			</div>
		</td>
	</tr>
{/snippet}
