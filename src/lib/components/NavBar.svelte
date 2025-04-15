<script lang="ts">
	import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

	import { setThemeMode, themeState, type ThemeMode } from "$lib/client/theme.svelte";

	import {
		DropdownMenu,
		DropdownMenuItemLink,
		DropdownMenuRadioGroup,
		DropdownMenuRadioItem,
		DropdownMenuSub
	} from "$lib/components/DropdownMenu";
	import Button from "$lib/components/form/Button.svelte";
	import Input from "$lib/components/form/Input.svelte";
</script>

<nav class="sticky top-0 border-b border-b-neutral-800 shadow-neutral-950/75 backdrop-blur-2xl">
	<div class="container flex h-14 items-center sm:h-12">
		<a href="/">Aggregato</a>

		<div class="flex-1"></div>
		<div role="presentation" class="hidden space-x-2 md:block">
			{@render link("/faq", "FAQ")}
			{@render link("/pricing", "Pricing")}
		</div>

		{@render search("mr-2 ml-4 hidden md:block")}

		<div class="flex gap-1">
			<Button
				intent="ghost"
				size="square"
				aria-label="Open notifications"
				class="grid grid-cols-1 place-items-center"
			>
				<span class="iconify size-5 material-symbols--notifications-outline-rounded"></span>
			</Button>

			{@render profile()}
		</div>
	</div>
</nav>

{#snippet link(href: string, label: string)}
	<a {href} class="text-sm text-neutral-300">{label}</a>
{/snippet}

{#snippet search(klass: string)}
	<form action="/search" class={["relative", klass]}>
		<Input type="text" name="q" placeholder="Search" class="peer w-64" />
		<span
			class="absolute top-1.5 right-1.5 iconify size-5 text-neutral-500 transition-colors material-symbols--search-rounded peer-focus:text-neutral-100"
		></span>
	</form>
{/snippet}

{#snippet profile()}
	<DropdownMenu contentProps={{ sideOffset: 16, align: "end", class: "min-w-52" }}>
		{#snippet button(props)}
			<Button
				{...props}
				intent="border"
				size="square"
				aria-label="Open profile menu"
				fullyRounded
				class="grid grid-cols-1 place-items-center"
			>
				<span class="iconify size-5 material-symbols--person-outline-rounded"></span>
			</Button>
		{/snippet}

		<DropdownMenuPrimitive.Group>
			<DropdownMenuItemLink
				href="/settings"
				label="Settings"
				icon="material-symbols--settings-outline-rounded"
			/>
			<DropdownMenuSub
				label="Theme"
				icon="material-symbols--keyboard-arrow-down -rotate-90"
				contentProps={{ class: "min-w-42", sideOffset: 4 }}
			>
				<DropdownMenuRadioGroup
					value={themeState.value}
					onValueChange={(e) => setThemeMode(e as ThemeMode)}
				>
					<DropdownMenuRadioItem
						value="system"
						label="System"
						icon="material-symbols--sync-desktop-rounded"
					/>
					<DropdownMenuRadioItem
						value="light"
						label="Light"
						icon="material-symbols--light-mode-rounded"
					/>
					<DropdownMenuRadioItem
						value="dark"
						label="Dark"
						icon="material-symbols--dark-mode-rounded"
					/>
				</DropdownMenuRadioGroup>
			</DropdownMenuSub>
		</DropdownMenuPrimitive.Group>

		<DropdownMenuPrimitive.Group>
			<DropdownMenuItemLink
				href="/auth/logout"
				label="Logout"
				icon="material-symbols--logout-rounded"
			/>
		</DropdownMenuPrimitive.Group>
	</DropdownMenu>
{/snippet}
