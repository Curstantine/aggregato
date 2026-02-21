<script lang="ts">
	import { enhance } from "$app/forms";

	import type { FormSerArkErrors } from "$lib/server/validator/utils";

	import { Button, Input, Label } from "$lib/components/form";

	import type { ActionData, PageProps } from "./$types";

	let { form }: PageProps = $props();
</script>

<svelte:head>
	<title>Forgot Password - Aggregato</title>
</svelte:head>

<section class="mx-auto flex min-h-svh max-w-md flex-col justify-center p-4">
	<h1 class="text-xl font-semibold">Forgot Password</h1>
	<span class="text-sm text-muted-foreground">
		Enter your email address and we'll send you a link to reset your password.
	</span>

	{#if form?.success}
		<div class="bg-success/10 text-success mt-6 rounded-md p-4 text-sm">
			{form.message}
		</div>
		<div class="mt-4 flex justify-center">
			<a
				href="/auth/login"
				class="text-sm text-muted-foreground transition-colors hover:text-foreground-2"
			>
				Back to Login
			</a>
		</div>
	{:else}
		<form method="post" use:enhance class="mt-6 space-y-3">
			<Label id="email" label="Email Address" error={form?.invalid?.email}>
				<Input
					id="email"
					name="email"
					type="email"
					placeholder="Enter your email"
					required
				/>
			</Label>

			{#if form?.message}
				<p class="text-destructive text-sm">{form.message}</p>
			{/if}

			<Button type="submit" class="mt-2 w-full">Send Reset Link</Button>

			<div class="flex justify-center">
				<a
					href="/auth/login"
					class="text-xs text-muted-foreground transition-colors hover:text-foreground-2"
				>
					Back to Login
				</a>
			</div>
		</form>
	{/if}
</section>
