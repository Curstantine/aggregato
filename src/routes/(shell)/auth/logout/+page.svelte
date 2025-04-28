<script lang="ts">
	import { enhance } from "$app/forms";

	import { Button } from "$lib/components/form";

	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<section class="mx-auto flex min-h-svh max-w-md flex-col justify-center p-4">
	<h1 class="text-xl font-semibold">Logout</h1>
	<span class="text-sm text-muted-foreground"> Are you sure you want to logout? </span>

	<div class="mt-4 flex flex-col rounded border border-border p-2">
		<h2 class="mb-1 text-sm font-medium">When you logout:</h2>

		<div class="text-xs leading-normal text-muted-foreground">
			<ul class="ml-4 list-outside list-disc marker:text-rosemi-500 [&>li]:pl-[-0.25rem]">
				<li>All background synchronizations will be stopped</li>
				<li>in-app notifications (if enabled) will be stopped</li>
				<li>
					...and might lose access to your account if you don't have access to recovery
					means
				</li>
			</ul>
		</div>
	</div>

	<form method="post" use:enhance class="mt-6 space-y-2">
		<Button intent="rosemi" class="w-full">Yes, I really want to logout</Button>
		<Button href="/" intent="ghost" class="w-full text-center">No, take me back</Button>
	</form>
</section>
