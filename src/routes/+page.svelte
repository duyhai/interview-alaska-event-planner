<script lang="ts">
	import type { PageData } from "./$types";

    let {data}: {data: PageData} = $props();
</script>

<div class="mb-6 pb-4">
	<h1 class="text-3xl font-bold mb-2 text-gray-700">Event Planner</h1>
	<p class="text-gray-600">A simple SvelteKit application for your events</p>
</div>

<div class="flex justify-between items-center mb-4">
	<h2 class="text-2xl font-semibold text-gray-700">Events</h2>
	<a class="btn btn-sm btn-primary bg-blue-300" href="/newevent" role="button">Add Event</a>
</div>

{#await data.events}
    <p class="text-gray-500">Loading events...</p>
{:then events}
	<div class="grid gap-4">
		{#each events as event}
			<div class="p-4 border rounded-md bg-gray-50 shadow-sm">
				<div class="flex justify-between items-start mb-2">
					<h3 class="text-xl font-bold text-gray-700">{event.title}</h3>
					<span class="text-sm text-gray-500">{new Date(event.date).toLocaleString()}</span>
				</div>
				<p class="text-gray-700 mb-4">{event.description}</p>
				<a class="btn btn-sm btn-outline bg-gray-300 text-black" href="/{event.id}" role="button">Manage</a>
			</div>
		{/each}
	</div>
{:catch error}
    <p class="text-red-500">Error loading events: {error.message}</p>
{/await}