<script lang="ts">
	import { resolve } from "$app/paths";

	interface Crumb {
		label: string;
		href?: string;
	}

	interface Props {
		items: Crumb[];
	}

	let { items }: Props = $props();
</script>

<nav aria-label="Breadcrumb" class="mb-3 ml-3">
	<ol class="flex items-center gap-1 text-sm">
		{#each items as item, i (item.label)}
			{#if i > 0}
				<li aria-hidden="true" class="text-muted-foreground">/</li>
			{/if}
			{#if item.href && i < items.length - 1}
				<li>
					<a
						href={resolve(item.href)}
						class="text-muted-foreground transition-colors hover:text-foreground"
					>
						{item.label}
					</a>
				</li>
			{:else}
				<li class="text-foreground">{item.label}</li>
			{/if}
		{/each}
	</ol>
</nav>
