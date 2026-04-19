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
} class="flex flex-col gap-4">
	{#if errorMessage}
		<p class="p-3 bg-red-100 text-red-700 rounded-md border border-red-200">{errorMessage}</p>
	{/if}

	<div class="flex flex-col">
		<label class="font-semibold mb-1 text-gray-700" for="title">Title</label>
		<input class="p-2 border rounded-md" type="text" id="title" name="title" value={event?.title ?? ''} required>
	</div>

	<div class="flex flex-col">
		<label class="font-semibold mb-1 text-gray-700" for="description">Description</label>
		<textarea class="p-2 border rounded-md min-h-[100px]" id="description" name="description" rows="4" placeholder="Description" value={event?.description ?? ''}></textarea>
	</div>

	<div class="flex flex-col mb-4">
		<label class="font-semibold mb-1 text-gray-700" for="date">Date</label>
		<input class="p-2 border rounded-md" type="datetime-local" id="date" name="date" value={event?.date ?? ''} required>
	</div>

	<div class="flex items-center gap-3">
		<a class="btn btn-sm btn-outline bg-gray-300 text-black" href="/" role="button">Back</a>
		<button class="btn btn-sm btn-primary bg-blue-300" type="submit" disabled={loading}>
		{#if loading}
			Loading...
		{:else}
			{buttonLabel}
		{/if}
		</button>
	</div>
</form>
