<script lang="ts">
	import type { PageData } from "./$types";
	import EventForm from '$lib/components/EventForm.svelte';

	let {data}: {data: PageData} = $props();
</script>

<div>
{#await data.event}
	<p>Loading event...</p>
{:then event}
	{#if event}
		<h2 class="text-lg font-bold">Edit Event:</h2>
		<EventForm action="?/editEvent" buttonLabel="Update Event" {event} />
	{:else}
		<p>Event not found.</p>
	{/if}
{:catch error}
	<p>Error loading event: {error.message}</p>
{/await}
</div>
