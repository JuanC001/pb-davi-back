import { prisma } from '../db/database.js'

export default class EventService {

    async getEvents() {
        return await prisma.event.findMany({
            include: {
                eventOrganizer: true
            }
        });
    }

    async getEvent(id) {
        return await prisma.event.findUnique({
            where: {
                id
            },
            include: {
                eventOrganizer: true
            }
        });
    }

    async getEventsByOrganizerId(eventOrganizerId) {
        return await prisma.event.findMany({
            where: {
                eventOrganizerId
            }
        });
    }

    async getEventsByUserId(userId) {

    }

    async createEvent(data) {
        return await prisma.event.create({
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                location: data.location,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                startTime: data.startTime,
                endTime: data.endTime,
                image: data.image,
                status: data.status || 'PROGRAMADO',
                eventOrganizerId: data.eventOrganizerId,
                capacity: data.capacity,
                remainingTickets: data.capacity
            }
        });
    }

    async updateEvent(id, data) {
        return await prisma.event.update({
            where: {
                id
            },
            data: {
                name: data.name,
                description: data.description,
                price: data.price,
                location: data.location,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                startTime: data.startTime,
                endTime: data.endTime,
                image: data.image,
                status: data.status || 'PROGRAMADO',
                eventOrganizerId: data.eventOrganizerId,
                capacity: data.capacity,
                remainingTickets: data.remainingTickets
            }
        });
    }

    async deleteEvent(id) {
        return await prisma.event.delete({
            where: {
                id
            }
        });
    }

}