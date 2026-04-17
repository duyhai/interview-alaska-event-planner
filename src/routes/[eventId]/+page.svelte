<script lang="ts">
	import type { PageData } from "./$types";

    let {data}: {data: PageData} = $props();
</script>


<div>
{#await data.event}
    <p>Loading event...</p>
{:then event}
    {#if event}
        <h2 class="text-lg font-bold">{event.id}: {event.title}</h2>
        <p>{event.description}</p>
        <p>{event.date}</p>
        <a class="btn" href="/" role="button">Home</a>
    {/if}
{:catch error}
    <p>Error loading event: {error.message}</p>
{/await}
</div>