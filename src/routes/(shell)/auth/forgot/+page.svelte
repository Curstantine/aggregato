<script lang="ts">
	import { enhance } from "$app/forms";
	import { resolve } from "$app/paths";

	import { Button, Input, Label } from "$lib/components/form";

	import type { PageProps, SubmitFunction } from "./$types";

	let submitting = $state(false);

	const submit: SubmitFunction = () => {
		submitting = true;

		return async ({ update }) => {
			await update();
			submitting = false;
		};
	};

	let { form }: PageProps = $props();
</script>

<svelte:head>
	<title>Forgot Password | Aggregato</title>
</svelte:head>

<section class="mx-auto flex min-h-svh max-w-md flex-col justify-center p-4">
	<h1 class="text-xl font-semibold">Forgot Password</h1>
	<span class="text-sm text-muted-foreground">
		Enter your email and we'll send you a link to reset your password.
	</span>

	<form method="post" use:enhance={submit} class="mt-6 space-y-3">
		<Label id="email" label="Email" error={form?.invalid?.email}>
			<Input id="email" name="email" type="email" placeholder="Enter your email" required />
		</Label>

		<Button type="submit" class="w-full" disabled={submitting}>Continue</Button>

		<a
			href={resolve("/auth/login")}
			class="flex w-full justify-center text-center text-xs text-muted-foreground transition-colors hover:text-foreground-2"
		>
			Back to Login
		</a>
	</form>
</section>
