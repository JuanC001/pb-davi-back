import EventOrganizerService from "../services/event-organizer.service.js"
const eventOrganizerController = {}

eventOrganizerController.getEventOrganizer = async (req, res) => {
    try {

        const { id } = req.params

        const eventOrganizerService = new EventOrganizerService()
        const eventOrganizer = await eventOrganizerService.findEventOrganizerById(Number(id))

        if (!eventOrganizer) {
            return res.status(404).json({ message: 'Event Organizer not found' })
        }

        res.status(200).json(eventOrganizer)

    } catch (error) {

        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
        return

    }
}
eventOrganizerController.getEventOrganizers = async (req, res) => {
    try {

        const eventOrganizerService = new EventOrganizerService()
        const eventOrganizers = await eventOrganizerService.findEventOrganizers()

        res.status(200).json(eventOrganizers)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
        return
    }
}

eventOrganizerController.getEventOrganizerByOwnerId = async (req, res) => {
    try {

        const { ownerId } = req.params
        console.log(ownerId)

        const eventOrganizerService = new EventOrganizerService()
        const eventOrganizer = await eventOrganizerService.findEventOrganizerByOwnerId(Number(ownerId))

        if (!eventOrganizer) {
            return res.status(404).json({ message: 'Event Organizer not found' })
        }

        res.status(200).json(eventOrganizer)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
        return
    }
}

eventOrganizerController.createEventOrganizer = async (req, res) => {
    try {

        const { companyName, companyDescription, ownerId } = req.body

        if (!companyName || !ownerId) {
            return res.status(400).json({ message: 'All fields are required' })
        }


        const eventOrganizerService = new EventOrganizerService()

        const eventOrganizerByOwner = await eventOrganizerService.findEventOrganizerByOwnerId(ownerId)

        if (eventOrganizerByOwner) {
            return res.status(400).json({ message: 'Event Organizer already exists' })
        }

        const eventOrganizer = await eventOrganizerService.createEventOrganizer({
            companyName,
            companyDescription,
            ownerId
        })

        res.status(201).json(eventOrganizer)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
        return
    }
}
eventOrganizerController.updateEventOrganizer = async (req, res) => {
    try {

        const { id } = req.params
        const { companyName, companyDescription, ownerId } = req.body

        if (!companyName || !ownerId) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const eventOrganizerService = new EventOrganizerService()
        const eventOrganizer = await eventOrganizerService.findEventOrganizerById(Number(id))

        if (!eventOrganizer) {
            return res.status(404).json({ message: 'Event Organizer not found' })
        }

        const updatedEventOrganizer = await eventOrganizerService.updateEventOrganizer(Number(id), {
            companyName,
            companyDescription,
            ownerId
        })

        res.status(200).json(updatedEventOrganizer)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
        return
    }
}
eventOrganizerController.deleteEventOrganizer = async (req, res) => {
    try {

        const { id } = req.params

        const eventOrganizerService = new EventOrganizerService()
        const eventOrganizer = await eventOrganizerService.findEventOrganizerById(Number(id))

        if (!eventOrganizer) {
            return res.status(404).json({ message: 'Event Organizer not found' })
        }

        const deletedOrganizer = await eventOrganizerService.deleteEventOrganizer(Number(id))
        res.status(200).json({
            message: 'Event Organizer deleted successfully',
            deletedOrganizer
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
        return
    }
}

export default eventOrganizerController;