<script lang="ts">
	import type { PageData } from "./$types";
	import { enhance } from '$app/forms';

    let loading = $state(false);
    let {data}: {data: PageData} = $props();
    $inspect(data);
</script>


<div>
{#await data.event}
    <p>Loading event...</p>
{:then event}
    {#if event}
        <h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
        <p>{event.description}</p>
        <p>{event.date}</p>
        <form method="POST" action="?/delete" use:enhance={
            () => {
                loading = true;
                return async ({ update }) => {
                    await update();
                    loading = false;
                };
            }
        }>
            <input type="hidden" name="id" value={event.id} />
            <button type="submit" disabled={loading}>
            {#if loading}
                Loading...
            {:else}
                Delete Event
            {/if}
            </button>
            <a class="btn" href="/{event.id}/edit" role="button">Edit Event</a>
            <a class="btn" href="/" role="button">Home</a>
        </form>
    {/if}
{:catch error}
    <p>Error loading event: {error.message}</p>
{/await}
</div>