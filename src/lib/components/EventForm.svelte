<script lang="ts">
	import { enhance } from '$app/forms';
	import type { Event } from '$lib/server/remote-events';

	export let action: string | undefined = undefined;
	export let buttonLabel: string = 'Submit';
	export let event: Partial<Event> | undefined = undefined;

	let loading = false;
	let errorMessage = '';
</script>

<form method="POST" {action} use:enhance={
	async ({ cancel, formData }) => {
		errorMessage = '';
		const dateStr = formData.get('date')?.toString();
		
		if (dateStr) {
			const selectedDate = new Date(dateStr);
			const now = new Date();
			if (selectedDate.getTime() < now.getTime()) {
				errorMessage = 'Event date cannot be in the past.';
				cancel();
				return;
			}
		}

		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}
}>
	{#if errorMessage}
		<p class="error" style="color: red;">{errorMessage}</p>
	{/if}

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
