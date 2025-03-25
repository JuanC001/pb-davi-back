import { prisma } from '../db/database.js'

export default class EventOrganizerService {
    async findEventOrganizerByOwnerId(id) {
        const eventOrganizer = await prisma.eventOrganizer.findUnique({
            where: {
                ownerId: id
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        surname: true,
                        email: true
                    }
                }
            }
        })
        return eventOrganizer
    }

    async findEventOrganizerById(id) {
        const eventOrganizer = await prisma.eventOrganizer.findUnique({
            where: {
                id: id
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        surname: true,
                        email: true
                    }
                }
            }
        })
        return eventOrganizer
    }

    async findEventOrganizers() {
        const eventOrganizers = await prisma.eventOrganizer.findMany({
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        surname: true,
                        email: true
                    }
                }
            }
        })
        return eventOrganizers
    }

    async createEventOrganizer(eventOrganizer) {
        const newEventOrganizer = await prisma.eventOrganizer.create({
            data: {
                companyName: eventOrganizer.companyName,
                companyDescription: eventOrganizer.companyDescription,
                ownerId: eventOrganizer.ownerId
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        surname: true,
                        email: true
                    }
                }
            }
        })
        return newEventOrganizer
    }

    async updateEventOrganizer(id, eventOrganizer) {
        const updatedEventOrganizer = await prisma.eventOrganizer.update({
            where: {
                id: id
            },
            data: {
                companyName: eventOrganizer.companyName,
                companyDescription: eventOrganizer.companyDescription,
                ownerId: eventOrganizer.ownerId
            },
            include: {
                owner: {
                    select: {
                        id: true,
                        name: true,
                        surname: true,
                        email: true
                    }
                }
            }
        })
        return updatedEventOrganizer
    }

    async deleteEventOrganizer(id) {
        const deletedEventOrganizer = await prisma.eventOrganizer.delete({
            where: {
                id: id
            }
        })
        return deletedEventOrganizer
    }

}