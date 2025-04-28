<script lang="ts" generics="Success extends {}, Failure extends {}">
	import type { SubmitFunction } from "@sveltejs/kit";
	import type { Snippet } from "svelte";
	import type { HTMLFormAttributes } from "svelte/elements";

	import { enhance } from "$app/forms";

	interface Props extends Omit<HTMLFormAttributes, "children"> {
		children: Snippet;
		submit?: SubmitFunction<Success, Failure>;
	}

	let { children, submit, ...rest }: Props = $props();
</script>

<form {...rest} use:enhance={submit} class="space-y-3 rounded border border-border p-3">
	{@render children()}
</form>
