<script lang="ts">
	import { enhance } from "$app/forms";

	import { Button, Input, Label, LabeledSeparator, SecretInput } from "$lib/components/form";

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
	<title>Login | Aggregato</title>
</svelte:head>

<section class="mx-auto flex min-h-svh max-w-md flex-col justify-center p-4">
	<h1 class="text-xl font-semibold">Login</h1>
	<span class="text-sm text-muted-foreground">
		Sign-in to continue, or create an account to get started
	</span>

	<form method="post" action="?/email" use:enhance={submit} class="mt-6 space-y-3">
		<Label id="username" label="Email/Username" error={form?.invalid?.username}>
			<Input
				id="username"
				name="username"
				placeholder="Enter either your email or username"
			/>
		</Label>

		<Label id="password" label="Password" error={form?.invalid?.password}>
			<SecretInput
				type="password"
				id="password"
				name="password"
				placeholder="Enter a password"
			/>
		</Label>

		<div class="flex justify-between">
			{@render link("Don't have an account?", "/auth/register")}
			{@render link("I forgot my password", "/auth/forgot")}
		</div>

		<Button type="submit" class="mt-2 w-full" disabled={submitting}>Continue</Button>
	</form>

	<LabeledSeparator class="my-4">Or Continue With</LabeledSeparator>

	<form method="post" action="?/social" use:enhance class="space-y-3">
		<input type="hidden" name="provider" value="github" />

		<Button type="submit" intent="border" class="w-full">
			<span class="mr-1 iconify size-6 bxl--github sm:size-5"></span>
			Github
		</Button>
	</form>
</section>

{#snippet link(label: string, href: string)}
	<a {href} class="text-xs text-muted-foreground transition-colors hover:text-foreground-2">
		{label}
	</a>
{/snippet}
