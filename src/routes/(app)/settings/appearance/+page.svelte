<script lang="ts">
	import SettingsHeader from "$lib/components/SettingsHeader.svelte";

	import type { PageProps } from "./$types";

	let { data }: PageProps = $props();
</script>

<SettingsHeader>Appearance</SettingsHeader>
