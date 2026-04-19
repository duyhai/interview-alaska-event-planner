<script lang="ts">
	import type { PageData } from "./$types";
	import EventForm from '$lib/components/EventForm.svelte';

	let {data}: {data: PageData} = $props();
</script>

<div class="max-w-xl mx-auto border rounded-md p-6 bg-gray-50 mt-8">
{#await data.event}
	<p class="text-gray-500">Loading event...</p>
{:then event}
	{#if event}
		<h1 class="text-2xl font-bold mb-4 pb-2">Edit Event</h1>
		<EventForm action="?/editEvent" buttonLabel="Update Event" {event} />
	{:else}
		<p class="text-orange-500">Event not found.</p>
	{/if}
{:catch error}
	<p class="text-red-500">Error loading event: {error.message}</p>
{/await}
</div>
