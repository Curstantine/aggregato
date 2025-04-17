<script lang="ts">
	import {
		DropdownMenu as DropdownMenuPrimitive,
		Popover as PopoverPrimitive,
		useId
	} from "bits-ui";

	import { notificationState } from "$lib/client/notification.svelte";
	import { setThemeMode, themeState, type ThemeMode } from "$lib/client/theme.svelte";

	import {
		DropdownMenu,
		DropdownMenuItemLink,
		DropdownMenuRadioGroup,
		DropdownMenuRadioItem,
		DropdownMenuSub
	} from "$lib/components/DropdownMenu";
	import { Popover } from "$lib/components/Popover";
	import Button from "$lib/components/form/Button.svelte";
	import Input from "$lib/components/form/Input.svelte";
	import ProgressBar from "$lib/components/ProgressBar.svelte";
</script>

<nav class="border-b-border shadow-background/75 sticky top-0 border-b backdrop-blur-2xl">
	<div class="container flex h-14 items-center sm:h-12">
		<a href="/">Aggregato</a>

		<div class="flex-1"></div>
		<div role="presentation" class="hidden space-x-2 md:block">
			{@render link("/faq", "FAQ")}
			{@render link("/pricing", "Pricing")}
		</div>

		{@render search("mr-2 ml-4 hidden md:block")}

		<div class="flex gap-1">
			{@render notifications()}
			{@render profile()}
		</div>
	</div>
</nav>

{#snippet link(href: string, label: string)}
	<a {href} class="text-foreground-2 text-sm">{label}</a>
{/snippet}

{#snippet search(klass: string)}
	<form action="/search" class={["relative", klass]}>
		<Input type="text" name="q" placeholder="Search" class="bg-background/50 peer w-64" />
		<span
			class="iconify material-symbols--search-rounded peer-focus:text-foreground text-muted-foreground absolute right-1.5 top-1.5 size-5 transition-colors"
		></span>
	</form>
{/snippet}

{#snippet notifications()}
	<Popover
		contentProps={{
			sideOffset: 16,
			align: "end",
			class: "in-h-24 botched-scroll relative max-h-90 min-w-80 overflow-y-auto rounded border border-border "
		}}
	>
		{#snippet button(props)}
			<Button
				{...props}
				intent="ghost"
				size="square"
				aria-label="Open notifications"
				class="aria-expanded:text-rosemi-500 group grid grid-cols-1 place-items-center"
			>
				<span
					class="iconify material-symbols--notifications-outline-rounded group-[[aria-expanded='true']]:rotate-4 size-5 transition-transform"
				></span>
			</Button>
		{/snippet}

		<div
			class="border-b-border bg-background sticky top-0 z-10 flex h-8 items-center justify-between border-b pl-2 pr-1"
		>
			<span class="text-xs font-medium">Notifications</span>
			<PopoverPrimitive.Close aria-label="Close notification popover">
				{#snippet child({ props })}
					<Button {...props} size="squareSmall" intent="ghost">
						<span class="iconify material-symbols--close-small-outline-rounded size-5"
						></span>
					</Button>
				{/snippet}
			</PopoverPrimitive.Close>
			<div class="from-background absolute inset-x-0 top-8 z-10 h-4 bg-gradient-to-b"></div>
		</div>

		<div class="flex flex-col">
			{#each notificationState.active as notification}
				{@const id = useId()}
				<div class="border-border flex flex-col border-b p-2 last:border-b-0">
					<span {id} class="text-sm">{notification.label}</span>
					<span class="text-muted-foreground mb-1 text-xs">
						{notification.progress} of {notification.endStep}
					</span>
					<ProgressBar
						aria-labelledby={id}
						value={notification.progress}
						max={notification.endStep}
					/>
				</div>
			{/each}
		</div>
	</Popover>
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
			>
				<span class="iconify material-symbols--person-outline-rounded size-5"></span>
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
