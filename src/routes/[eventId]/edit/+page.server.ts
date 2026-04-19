import { fetchEventById, updateEventById } from "$lib/server/remote-events";
import type { PageServerLoad, Actions } from "./$types";
import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({params}) => {
    const eventId = parseInt(params.eventId);
    const event = fetchEventById(eventId);
    return {
        event
    }
}

export const actions: Actions = {
    editEvent: async ({request, params}) => {
        const eventId = parseInt(params.eventId);
        if (isNaN(eventId)) {
            error(400, "Invalid event ID");
        }
        const formdata = await request.formData();
        const title = formdata.get('title')?.toString();
        const description = formdata.get('description')?.toString();
        const date = formdata.get('date')?.toString();
        if (!title || !date) {
            error(400, 'Title and Date are required');
        }
        await updateEventById(eventId, {title, description, date});
        redirect(303, `/${eventId}`);
    }
}