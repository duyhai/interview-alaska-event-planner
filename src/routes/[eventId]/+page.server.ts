import { fetchEventById, deleteEventById } from "$lib/server/remote-events";
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
    delete: async ({request}) => {
        const formdata = await request.formData();
        const id = Number(formdata.get('id'));
        
        if (isNaN(id)) {
            error(400, 'Id is invalid');
        }
        const deleted = await deleteEventById(id);
        if (!deleted) {
            error(404, 'Event not found');
        }
        redirect(303, `/`);
    }
}