<script lang="ts">
	import { enhance } from "$app/forms";

	import { Button, Input, Label, SecretInput } from "$lib/components/form";
	import type { FormSerArkErrors } from "$lib/server/validator/utils";

	import type { ActionData, PageData } from "./$types";

	type FormActionData =
		| { message?: string; invalid?: FormSerArkErrors }
		| undefined; // When the form hasn't been submitted yet

	let { data, form }: { data: PageData; form: FormActionData } = $props();
</script>

<svelte:head>
	<title>Reset Password - Aggregato</title>
</svelte:head>

<section class="mx-auto flex min-h-svh max-w-md flex-col justify-center p-4">
	<h1 class="text-xl font-semibold">Reset Password</h1>
	<span class="text-sm text-muted-foreground">
		Enter your reset token and your new password below.
	</span>

	<form method="post" use:enhance class="mt-6 space-y-3">
		<Label id="token" label="Reset Token" error={form?.invalid?.token}>
			<Input
				id="token"
				name="token"
				value={data.token ?? ""}
				placeholder="Paste your reset token here"
				required
			/>
		</Label>

		<Label id="password" label="New Password" error={form?.invalid?.password}>
			<SecretInput
				type="password"
				id="password"
				name="password"
				placeholder="Enter a new password"
				required
			/>
		</Label>

		<Label id="confirmPassword" label="Confirm Password" error={form?.invalid?.confirmPassword}>
			<SecretInput
				type="password"
				id="confirmPassword"
				name="confirmPassword"
				placeholder="Confirm your new password"
				required
			/>
		</Label>

		{#if form?.message}
			<p class="text-sm text-destructive">{form.message}</p>
		{/if}

		<Button type="submit" class="mt-2 w-full">Reset Password</Button>
	</form>
</section>
