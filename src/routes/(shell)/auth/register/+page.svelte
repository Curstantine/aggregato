<script lang="ts">
	import Button from "$lib/components/form/Button.svelte";
	import Input from "$lib/components/form/Input.svelte";
	import Label from "$lib/components/form/Label.svelte";
	import SecretInput from "$lib/components/form/SecretInput.svelte";

	import { enhance } from "$app/forms";

	import type { ActionData } from "../$types";

	let { form }: { form: ActionData } = $props();
</script>

<svelte:head>
	<title>Login - Aggregato</title>
</svelte:head>

<section class="mx-auto flex min-h-screen max-w-md flex-col justify-center p-4">
	<h1 class="text-xl font-semibold">Register</h1>
	<span class="text-muted-foreground text-sm">
		Sign-up to get started, or login using your existing account
	</span>

	<form method="post" action="/auth?/register" use:enhance class="mt-6 space-y-3">
		<Label label="Email">
			<Input name="email" placeholder="rosemi@randomaccessiblemail.moe" />
		</Label>

		<Label label="Username">
			<Input name="username" placeholder="Enter a username" />
		</Label>

		<Label label="Password">
			<SecretInput type="password" name="password" placeholder="Enter a password" />
		</Label>

		<Label label="Confirm Password">
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

		<div class="border-border mt-6 flex flex-col rounded border p-2">
			<h2 class="text-sm font-medium">Readme</h2>
			<span class="text-muted-foreground text-xs leading-normal">
				The email address you provide will only be used for release notifications, and
				account recovery. You are free to use whatever email you want, but make sure you
				have the means to recover it in case you forget your password.
			</span>
		</div>
	</form>
</section>

{#snippet link(label: string, href: string)}
	<a {href} class="text-muted-foreground hover:text-foreground-2 text-xs transition-colors"
		>{label}</a
	>
{/snippet}
