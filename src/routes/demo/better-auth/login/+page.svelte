<script lang="ts">
	import { enhance } from "$app/forms";

	import type { ActionData } from "./$types";

	let { form }: { form: ActionData } = $props();
</script>

<h1>Login</h1>
<form method="post" action="?/signInEmail" use:enhance>
	<label>
		Email
		<input
			type="email"
			name="email"
			class="bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 mt-1 rounded-md border px-3 py-2 shadow-sm focus:ring-2 focus:outline-none"
		/>
	</label>
	<label>
		Password
		<input
			type="password"
			name="password"
			class="bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 mt-1 rounded-md border px-3 py-2 shadow-sm focus:ring-2 focus:outline-none"
		/>
	</label>
	<label>
		Name (for registration)
		<input
			name="name"
			class="bg-white border-gray-300 focus:ring-blue-500 focus:border-blue-500 mt-1 rounded-md border px-3 py-2 shadow-sm focus:ring-2 focus:outline-none"
		/>
	</label>
	<button class="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2 transition"
		>Login</button
	>
	<button
		formaction="?/signUpEmail"
		class="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2 transition"
		>Register</button
	>
</form>
<p class="text-red-500">{form?.message ?? ""}</p>

<hr class="my-4" />
<form method="post" action="?/signInSocial" use:enhance>
	<input type="hidden" name="provider" value="github" />
	<input type="hidden" name="callbackURL" value="/demo/better-auth" />
	<button class="bg-blue-600 text-white hover:bg-blue-700 rounded-md px-4 py-2 transition"
		>Sign in with GitHub</button
	>
</form>
