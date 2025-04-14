<script lang="ts">
	import Button from "$lib/components/form/Button.svelte";
	import Input from "$lib/components/form/Input.svelte";
</script>

<nav class="sticky top-0 border-b border-b-neutral-800 shadow-neutral-950/75 backdrop-blur-2xl">
	<div class="container flex h-12 items-center">
		<a href="/">Aggregato</a>

		<div class="flex-1"></div>
		<div role="presentation" class="space-x-2">
			{@render link("/faq", "FAQ")}
			{@render link("/pricing", "Pricing")}
		</div>

		<form action="/search" class="relative mr-2 ml-4">
			<Input type="text" name="q" placeholder="Search" class="peer w-64" />
			<span
				class="absolute top-1.5 right-1.5 iconify size-5 text-neutral-500 transition-colors material-symbols--search-rounded peer-focus:text-neutral-100"
			></span>
		</form>

		<div class="flex gap-1">
			<Button
				intent="ghost"
				size="square"
				aria-label="Open notifications"
				class="grid grid-cols-1 place-items-center"
			>
				<span class="iconify size-5 material-symbols--notifications-outline-rounded"></span>
			</Button>

			<Button
				intent="border"
				size="square"
				aria-label="Open profile menu"
				fullyRounded
				class="grid grid-cols-1 place-items-center"
			>
				<span class="iconify size-5 material-symbols--person-outline-rounded"></span>
			</Button>
		</div>
	</div>
</nav>

{#snippet link(href: string, label: string)}
	<a {href} class="text-sm text-neutral-300">{label}</a>
{/snippet}
