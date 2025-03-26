import UserEventService from "../services/user-event.service.js"
import EventService from "../services/event.service.js";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
const userEventController = {}

userEventController.getRegisteredUsersByEvent = async (req, res) => {
    try {

        const { eventId } = req.params;
        const userEventService = new UserEventService();
        const userEvent = await userEventService.getRegisteredUsersByEvent(Number(eventId));
        res.status(200).json(userEvent);
        return

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return
    }
}
userEventController.getRegisteredEventsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const userEventService = new UserEventService();
        const userEvent = await userEventService.getRegisteredEventsByUser(Number(userId));
        res.status(200).json(userEvent);
        return
    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return
    }
}
userEventController.registerUserToEvent = async (req, res) => {
    try {

        const { userId, eventId } = req.body;
        if (!userId || !eventId) {
            res.status(400).json({ message: 'User Id and Event Id are required' });
            return
        }
        const eventService = new EventService();
        const event = await eventService.getEvent(Number(eventId));
        if(!event){
            res.status(400).json({ message: 'Event not found' });
            return
        }
        if (event.eventOrganizer.ownerId === userId) {
            res.status(400).json({ message: 'Event Organizer cannot register to own event' });
            return
        }

        if (event.remainingTickets === 0) {
            res.status(400).json({ message: 'No tickets available' });
            return
        }
        const userEventService = new UserEventService();
        const userEvent = await userEventService.registerUserToEvent(Number(userId), Number(eventId));
        await eventService.updateEvent(eventId, { ...event, remainingTickets: event.remainingTickets - 1 });

        res.status(201).json(userEvent);
        return

    } catch (error) {

        console.error(error);
        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                res.status(400).json({ message: 'User already registered to event' });
                return
            }
        }
        res.status(500).json({ message: 'Internal Server Error' });
        return
    }
}
userEventController.unregisterUserFromEvent = async (req, res) => {
    try {

        const { userId, eventId } = req.body;
        console.log(userId, eventId)
        const userEventService = new UserEventService();
        const userEvent = await userEventService.unregisterUserFromEvent(Number(userId), Number(eventId));
        const eventService = new EventService();
        const event = await eventService.getEvent(Number(eventId));
        await eventService.updateEvent(eventId, { ...event, remainingTickets: event.remainingTickets + 1 });

        res.status(200).json(userEvent);
        return

    } catch (error) {

        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
        return
    }
}

export default userEventController;