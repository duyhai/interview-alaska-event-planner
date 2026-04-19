<script lang="ts">
	import type { PageData } from "./$types";
	import { enhance } from '$app/forms';

    let loading = $state(false);
    let {data}: {data: PageData} = $props();
    $inspect(data);
</script>


<div class="mt-4 p-6 border rounded-md shadow-sm bg-gray-50">
{#await data.event}
    <p class="text-gray-500">Loading event...</p>
{:then event}
    {#if event}
            <h2 class="text-2xl font-bold mb-2 text-gray-700">{event.title}</h2>
            <div class="text-gray-500 text-sm mb-4">Event ID: {event.id} | Date: {new Date(event.date).toLocaleString()}</div>
            <p class="mb-6 text-gray-800">{event.description}</p>
            
            <form method="POST" action="?/delete" use:enhance={
                () => {
                    loading = true;
                    return async ({ update }) => {
                        await update();
                        loading = false;
                    };
                }
            } class="flex items-center gap-2 pt-4 border-t">
                <input type="hidden" name="id" value={event.id} />
                <a class="btn btn-sm btn-outline bg-gray-300 text-black" href="/" role="button">Back</a>
                <a class="btn btn-sm btn-primary bg-blue-300" href="/{event.id}/edit" role="button">Edit Event</a>
                <button type="submit" class="btn btn-sm btn-error bg-red-300" disabled={loading}>
                {#if loading}
                    Deleting...
                {:else}
                    Delete Event
                {/if}
                </button>
            </form>
    {/if}
{:catch error}
    <p class="text-red-500">Error loading event: {error.message}</p>
{/await}
</div>