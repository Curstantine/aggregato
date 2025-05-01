<script lang="ts">
	import { Dialog } from "bits-ui";

	import { version } from "$app/environment";
	import { page } from "$app/state";

	import { Button } from "$lib/components/form";

	let open = $state(false);
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button
				{...props}
				size="square"
				intent="border"
				class="absolute top-19 right-7 md:hidden"
			>
				<span class="iconify size-5 material-symbols--menu-rounded"></span>
			</Button>
		{/snippet}
	</Dialog.Trigger>

	<Dialog.Portal>
		<Dialog.Overlay
			class="fixed inset-0 z-50 bg-background/80 backdrop-blur-xl data-[state=closed]:fade-out-emphasized-accelerate data-[state=open]:fade-in-emphasized-decelerate"
		/>
		<Dialog.Content
			class="fixed inset-y-0 z-60 flex w-72 flex-col border-r border-r-border bg-background p-3 data-[state=closed]:slide-out-ltr-emphasized-accelerate data-[state=open]:slide-in-ltr-emphasized-decelerate"
		>
			<Dialog.Title class="mb-2 ml-3 flex items-center justify-between">
				<span class="text-lg font-medium">Settings</span>
				<Dialog.Close>
					{#snippet child({ props })}
						<Button {...props} intent="ghost" size="square">
							<span class="iconify size-5 material-symbols--close-rounded"></span>
						</Button>
					{/snippet}
				</Dialog.Close>
			</Dialog.Title>

			{@render link(
				"/settings/appearance",
				"Appearance",
				"material-symbols--palette-outline"
			)}
			{@render link(
				"/settings/import",
				"Import",
				"material-symbols--cloud-download-outline-rounded"
			)}

			<div class="flex-1"></div>
			<ul>
				<li class="text-xs text-muted-foreground">
					Version: {version}
				</li>
			</ul>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>

{#snippet link(href: string, label: string, icon: string)}
	<a
		{href}
		aria-current={page.url.pathname === href}
		class="grid h-9 grid-cols-[--spacing(5)_1fr] items-center gap-3 rounded px-3 text-sm transition-colors aria-current:bg-background-2"
		onclick={() => (open = false)}
	>
		<span class={["iconify size-5 text-rosemi-500", icon]}></span>
		{label}
	</a>
{/snippet}
