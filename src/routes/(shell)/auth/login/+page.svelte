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
	<h1 class="text-xl font-semibold">Login</h1>
	<span class="text-sm text-neutral-400">
		Sign-in to continue, or create an account to get started
	</span>

	<form method="post" action="/auth?/login" use:enhance class="mt-6 space-y-3">
		<Label label="Username">
			<Input name="username" placeholder="Enter a username" />
		</Label>

		<Label label="Password">
			<SecretInput type="password" name="password" placeholder="Enter a password" />
		</Label>

		<div class="flex justify-between">
			{@render link("Don't have an account?", "/auth/register")}
			{@render link("I forgot my password", "/auth/forgot")}
		</div>

		<Button type="submit" class="mt-2 w-full">Continue</Button>
	</form>
</section>

{#snippet link(label: string, href: string)}
	<a {href} class="text-xs text-neutral-400 transition-colors hover:text-neutral-300">{label}</a>
{/snippet}
