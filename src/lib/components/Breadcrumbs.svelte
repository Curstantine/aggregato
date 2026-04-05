<script lang="ts">
	import { breadcrumbs } from "$lib/client/state/breadcrumbs.svelte";
</script>

<nav
	aria-label="Breadcrumb"
	class="flex h-9 items-center border-b border-b-border pl-4 [grid-area:breadcrumbs] md:mb-4"
>
	<ol class="flex items-center gap-1 text-sm">
		{#each breadcrumbs.crumbs as item, i (item.label)}
			{#if i > 0}
				<li aria-hidden="true" class="text-muted-foreground">/</li>
			{/if}
			{#if item.href && i < breadcrumbs.crumbs.length - 1}
				{@const { href, label } = item}
				<li>
					<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
					<a {href} class="text-muted-foreground transition-colors hover:text-foreground">
						{label}
					</a>
				</li>
			{:else}
				<li class="text-foreground">{item.label}</li>
			{/if}
		{/each}
	</ol>
</nav>
