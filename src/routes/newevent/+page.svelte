<script lang="ts">
	import EventForm from '$lib/components/EventForm.svelte';
</script>

<div class="max-w-xl mx-auto border rounded-md p-6 bg-gray-50 mt-8">
	<h1 class="text-2xl font-bold mb-4 pb-2">Create New Event</h1>
	<EventForm action="?/createEvent" buttonLabel="Create Event" />
</div>