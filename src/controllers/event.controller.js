import EventService from "../services/event.service.js"
const eventController = {}

eventController.getEvents = async (req, res) => {
    try {
        const eventService = new EventService();
        const events = await eventService.getEvents();
        return res.status(200).json(events);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
eventController.getEvent = async (req, res) => {
    try {

        const { id } = req.params;
        const eventService = new EventService();
        const event = await eventService.getEvent(Number(id));

        if (!event) {
            return res.status(404).json({ message: 'Event not found' });
        }

        return res.status(200).json(event);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
eventController.createEvent = async (req, res) => {
    try {

        const { name, description, price, location,
            startDate, endDate, startTime, endTime,
            status, image, eventOrganizerId, capacity, remainingTickets } = req.body;

        if (!name || !price || !location || !startDate || !endDate || !startTime || !endTime) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!eventOrganizerId) {
            return res.status(400).json({ message: 'Event Organizer Id is required' });
        }

        const eventService = new EventService();
        const event = await eventService.createEvent({
            name, description, price, location,
            startDate, endDate, startTime, endTime,
            status, image, eventOrganizerId, capacity, remainingTickets
        });

        return res.status(201).json(event);


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
eventController.updateEvent = async (req, res) => {
    try {

        const { id } = req.params;
        const { name, description, price, location,
            startDate, endDate, startTime, endTime,
            status, image, eventOrganizerId, capacity, remainingTickets } = req.body;

        if (!name || !price || !location || !startDate || !endDate || !startTime || !endTime) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!eventOrganizerId) {
            return res.status(400).json({ message: 'Event Organizer Id is required' });
        }

        const eventService = new EventService();
        const event = await eventService.updateEvent(Number(id), {
            name, description, price, location,
            startDate, endDate, startTime, endTime,
            status, image, eventOrganizerId, capacity, remainingTickets
        });

        return res.status(200).json(event);

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}
eventController.deleteEvent = async (req, res) => {

    try {

        const { id } = req.params;
        const eventService = new EventService();
        const deletedEvent = await eventService.deleteEvent(Number(id));

        return res.status(200).json({ message: 'Event deleted', deletedEvent });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

export default eventController;