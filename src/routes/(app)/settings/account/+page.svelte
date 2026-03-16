<script lang="ts">
	import { toast } from "svelte-sonner";

	import { applyAction, enhance } from "$app/forms";

	import {
		ControlGroupDivider,
		ControlGroupField,
		ControlGroupForm,
		ControlGroupHeader
	} from "$lib/components/ControlGroup";
	import { Button, Input } from "$lib/components/form";
	import SettingsHeader from "$lib/components/SettingsHeader.svelte";

	import type { PageProps, SubmitFunction } from "./$types";

	const PROVIDERS = [{ id: "github", name: "GitHub", icon: "bxl--github" }] as const;

	let oAuthChanging = $state(false);
	let { data }: PageProps = $props();

	const hasCredentialAccount = $derived(
		data.accounts.findIndex((x) => x.providerId === "credential") !== -1
	);

	function isLinked(providerId: string) {
		return data.accounts.some((a) => a.providerId === providerId);
	}

	function linkedAccountId(providerId: string) {
		return data.accounts.find((a) => a.providerId === providerId)?.accountId ?? null;
	}

	function canUnlink(providerId: string) {
		if (hasCredentialAccount && providerId !== "credential") return true;
		return data.accounts.length > 1;
	}

	const linkUnlinkAction: SubmitFunction = ({ action }) => {
		const linking = action.search === "?/link";
		oAuthChanging = true;

		return async ({ result }) => {
			oAuthChanging = false;

			if (result.type === "failure" && result.data) {
				toast.error("Failed to " + (linking ? "link" : "unlink") + " account", {
					description: result.data.message
				});
			}

			await applyAction(result);
		};
	};
</script>

<section id="account">
	<SettingsHeader>Account</SettingsHeader>
	<div class="flex items-center gap-4 rounded border border-border bg-background-2 px-2 py-2">
		<div class="size-14 overflow-hidden rounded-full border border-border bg-background">
			<div class="grid size-full place-items-center">
				<span
					class="iconify size-7 text-muted-foreground material-symbols--person-outline-rounded"
				></span>
			</div>
		</div>

		<div class="flex flex-col">
			<p class="text-lg leading-tight font-semibold">
				{data.displayUsername ?? data.username}
			</p>
			<p class="text-sm text-muted-foreground">
				@{data.username}
			</p>
		</div>
	</div>
</section>

<section id="account" class="mt-4">
	<ControlGroupHeader>Profile</ControlGroupHeader>
	<ControlGroupForm method="POST" action="?/profile">
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
	</ControlGroupForm>
</section>

<section id="linked-oauth-services" class="mt-4">
	<ControlGroupHeader>Linked OAuth Services</ControlGroupHeader>
	<div class="rounded border border-border">
		{#each PROVIDERS as provider, i}
			{@const linked = isLinked(provider.id)}
			{@const accountId = linkedAccountId(provider.id)}
			{@const unlinkable = canUnlink(provider.id)}

			<div
				class={[
					"flex items-center justify-between gap-4 p-3",
					i > 0 && "border-t border-border"
				]}
			>
				<div class="flex items-center gap-3">
					<span class="iconify size-6 {provider.icon}"></span>
					<div class="flex flex-col">
						<span class="text-sm font-medium">{provider.name}</span>
						<span class="text-xs text-muted-foreground">
							{linked ? "Connected as " + accountId : "Not connected"}
						</span>
					</div>
				</div>

				{#if linked}
					<form method="POST" action="?/unlink" use:enhance={linkUnlinkAction}>
						<input type="hidden" name="providerId" value={provider.id} />
						<Button
							type="submit"
							intent="boring"
							disabled={oAuthChanging || !unlinkable}>Unlink</Button
						>
					</form>
				{:else}
					<form method="POST" action="?/link" use:enhance={linkUnlinkAction}>
						<input type="hidden" name="provider" value={provider.id} />
						<Button type="submit" intent="boring" disabled={oAuthChanging}>Link</Button>
					</form>
				{/if}
			</div>

			{#if !unlinkable && linked}
				<p class="px-3 pb-3 text-xs text-muted-foreground">
					Set a password before unlinking your only sign-in method.
				</p>
			{/if}
		{/each}
	</div>
</section>
