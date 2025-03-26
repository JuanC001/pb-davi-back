import { prisma } from '../db/database.js'

export default class UserEventService {

    async getRegisteredEventsByUser(userId) {

        return await prisma.userEvent.findMany({
            where: {
                userId
            },
            include: {
                event: true,
                user: {
                    select: {
                        name: true,
                        surname: true,
                        email: true
                    }
                }
            }
        })

    }

    async getRegisteredUsersByEvent(eventId) {

        return await prisma.userEvent.findMany({
            where: {
                eventId
            },
            include: {
                event: {
                    select: {
                        name: true,
                        description: true,
                        price: true,
                        location: true,
                        startDate: true,
                        endDate: true,
                        image: true,
                        status: true,
                    }
                }
            }
        })

    }

    async registerUserToEvent(userId, eventId) {

        return await prisma.userEvent.create({
            data: {
                userId,
                eventId
            },
        })

    }

    async unregisterUserFromEvent(userId, eventId) {

        return await prisma.userEvent.delete({
            where: {
                userId_eventId: {
                    userId,
                    eventId
                }
            },

            include: {
                event: {
                    select: {
                        name: true,
                        description: true,
                        price: true,
                        location: true,
                        startDate: true,
                        endDate: true,
                        image: true,
                        status: true,
                    }
                }
            }

        })

    }

}