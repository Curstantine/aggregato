<script lang="ts">
	import Input from "$lib/components/form/Input.svelte";
	import Label from "$lib/components/form/Label.svelte";
	import SecretInput from "$lib/components/form/SecretInput.svelte";

	import { enhance } from "$app/forms";

	import type { ActionData } from "../$types";

	let { form }: { form: ActionData } = $props();
</script>

<section class="mx-auto flex min-h-screen max-w-md flex-col justify-center">
	<h1 class="text-xl font-semibold">Register</h1>
	<span class="text-sm text-neutral-400">
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

		<button
			type="submit"
			class="mt-2 h-8 w-full rounded bg-rosemi-700 px-4 text-sm transition-colors hover:bg-rosemi-600"
		>
			Continue
		</button>
	</form>
</section>

{#snippet link(label: string, href: string)}
	<a {href} class="text-xs text-neutral-400 transition-colors hover:text-neutral-300">{label}</a>
{/snippet}
