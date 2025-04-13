<script lang="ts">
	import { enhance } from "$app/forms";

	import type { ActionData } from "../$types";

	let { form }: { form: ActionData } = $props();
</script>

<h1>Login/Register</h1>
<form method="post" action="/auth?/login" use:enhance>
	<label>
		Username
		<input name="username" />
	</label>
	<label>
		Password
		<input type="password" name="password" />
	</label>
	<button>Login</button>
	<button formaction="/auth?/register">Register</button>
</form>
<p style="color: red">{form?.message ?? ""}</p>
