<script lang="ts">
	import {
		ControlGroup,
		ControlGroupDivider,
		ControlGroupField,
		ControlGroupHeader
	} from "$lib/components/ControlGroup";
	import { Button, Input } from "$lib/components/form";
	import SettingsHeader from "$lib/components/SettingsHeader.svelte";

	import type { PageProps } from "./$types";

	let { data, form }: PageProps = $props();
</script>

<SettingsHeader>Account</SettingsHeader>

<section id="account" class="space-y-4">
	<div class="flex items-center gap-4 rounded border border-border bg-background-2 px-2 py-2">
		<div class="size-14 overflow-hidden rounded-full border border-border bg-background">
			{#if data.image}
				<img
					src={data.image}
					alt={`${data?.displayUsername ?? data?.username ?? "User"} profile picture`}
					class="size-full object-cover"
				/>
			{:else}
				<div class="grid size-full place-items-center">
					<span
						class="iconify size-7 text-muted-foreground material-symbols--person-outline-rounded"
					></span>
				</div>
			{/if}
		</div>

		<div class="flex flex-col">
			<p class="text-lg leading-tight font-semibold">
				{data?.displayUsername ?? data?.username ?? "Unknown user"}
			</p>
			<p class="text-sm text-muted-foreground">
				@{data?.username ?? "unknown"}
			</p>
		</div>
	</div>

	<ControlGroupHeader>Profile</ControlGroupHeader>
	<ControlGroup method="POST">
		<ControlGroupField
			id="displayUsername"
			label="Display name"
			description="The name used only for display purposes."
		>
			<Input
				id="displayUsername"
				name="displayUsername"
				placeholder="Enter a display name (optional)"
				defaultValue={data?.displayUsername ?? ""}
			/>
		</ControlGroupField>

		<ControlGroupDivider />

		<Button class="ml-auto" intent="boring" type="submit">Save</Button>
	</ControlGroup>
</section>
