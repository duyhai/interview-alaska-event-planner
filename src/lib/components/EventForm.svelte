<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Event } from '$lib/server/remote-events';

	export let action: string | undefined = undefined;
	export let buttonLabel: string = 'Submit';
	export let event: Partial<Event> | undefined = undefined;

	let loading = false;
</script>

<form method="POST" {action} use:enhance={
	async () => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}
}>
	<label for="title">Title</label>
	<input type="text" id="title" name="title" value={event?.title ?? ''} required>

	<label for="description">Description</label>
	<textarea id="description" name="description" rows="4" cols="50" placeholder="Description" value={event?.description ?? ''}></textarea>

	<label for="date">Date</label>
	<input type="datetime-local" id="date" name="date" value={event?.date ?? ''} required>

	<button type="submit" disabled={loading}>
	{#if loading}
		Loading...
	{:else}
		{buttonLabel}
	{/if}
	</button>
	<a class="btn" href="/" role="button">Home</a>
</form>
