<script lang="ts">
	import { version } from "$app/environment";
	import { page } from "$app/state";
</script>

<nav
	class="sticky top-(--nav-top) hidden h-(--rm-screen) w-full flex-col border-r border-border py-4 pr-2 md:flex"
>
	<span class="mb-2 ml-3 text-lg font-medium">Settings</span>

	{@render link("/settings/appearance", "Appearance", "material-symbols--palette-outline")}
	{@render link("/settings/import", "Import", "material-symbols--cloud-download-outline-rounded")}

	<div class="flex-1"></div>
	<ul>
		<li class="text-xs text-muted-foreground">
			Version: {version}
		</li>
	</ul>
</nav>

{#snippet link(href: string, label: string, icon: string)}
	<a
		{href}
		aria-current={page.url.pathname === href}
		class="grid h-8 grid-cols-[--spacing(5)_1fr] items-center gap-2 rounded px-3 text-sm transition-colors aria-current:bg-background-2"
	>
		<span class={["iconify size-5 text-rosemi-500", icon]}></span>
		{label}
	</a>
{/snippet}
