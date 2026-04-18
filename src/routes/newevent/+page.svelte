<script lang="ts">
	import { enhance } from '$app/forms';
    let loading = false;
</script>

<form method="POST" use:enhance={
    async () => {
        loading = true;
        return async ({ update }) => {
            await update();
            loading = false;
        };
    }
}>
    <!-- form for creating new event -->
    <label for="title">Title</label>
    <input type="text" id="title" name="title" required>
    <textarea id="description" name="description" rows="4" cols="50" placeholder="Description"></textarea>
    <label for="date">Date</label>
    <input type="datetime-local" id="date" name="date" required>
    <button type="submit" disabled={loading}>
    {#if loading}
        Loading...
    {:else}
        Create Event
    {/if}
    </button>
<a class="btn" href="/" role="button">Home</a>
</form>