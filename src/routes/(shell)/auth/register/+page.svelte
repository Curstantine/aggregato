<script lang="ts">
	import { enhance } from "$app/forms";

	import { Button, Input, Label, LabeledSeparator, SecretInput } from "$lib/components/form";

	import type { PageProps } from "./$types";

	let { form }: PageProps = $props();
</script>

<svelte:head>
	<title>Login - Aggregato</title>
</svelte:head>

<main class="mx-auto flex min-h-svh max-w-md flex-col justify-center p-4">
	<h1 class="text-xl font-semibold">Register</h1>
	<span class="text-sm text-muted-foreground">
		Sign-up to get started, or login using your existing account
	</span>

	<form method="post" use:enhance class="mt-6 space-y-3">
		<Label id="email" label="Email" error={form?.invalid?.email}>
			<Input name="email" placeholder="rosemi@randomaccessiblemail.moe" />
		</Label>

		<Label id="username" label="Username" error={form?.invalid?.username}>
			<Input name="username" placeholder="Enter a username" />
		</Label>

		<Label id="password" label="Password" error={form?.invalid?.password}>
			<SecretInput type="password" name="password" placeholder="Enter a password" />
		</Label>

		<Label
			id="confirm_password"
			label="Confirm Password"
			error={form?.invalid?.confirmPassword}
		>
			<SecretInput
				type="password"
				name="confirmPassword"
				placeholder="Reenter your password"
			/>
		</Label>

		<div class="flex justify-between">
			{@render link("Already have an account?", "/auth/login")}
		</div>

		<Button type="submit" class="mt-2 w-full">Continue</Button>
	</form>

	<div class="mt-6 flex flex-col rounded border border-border p-2">
		<h2 class="text-sm font-medium">About Your Data</h2>
		<span class="text-xs leading-normal text-muted-foreground">
			The email address you provide will only be used for release notifications, and account
			recovery. You are free to use whatever email you want, but make sure you have the means
			to recover it in case you forget your password.
		</span>
	</div>

	<LabeledSeparator class="my-4">Or Register With</LabeledSeparator>

	<form method="post" action="/auth/login?/social" use:enhance class="space-y-3">
		<input type="hidden" name="provider" value="github" />

		<Button type="submit" intent="border" class="w-full">
			<span class="mr-1 iconify size-6 bxl--github sm:size-5"></span>
			Github
		</Button>
	</form>
</main>

{#snippet link(label: string, href: string)}
	<a {href} class="text-xs text-muted-foreground transition-colors hover:text-foreground-2"
		>{label}</a
	>
{/snippet}
