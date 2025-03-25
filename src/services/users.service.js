import { prisma } from '../db/database.js'

export default class UserService {

    async findUserByEmail(email) {

        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })
        return user

    }

    async createUser(user) {

        const newUser = await prisma.user.create({
            data: {
                name: user.name,
                surname: user.surname,
                document: user.document,
                email: user.email,
                password: user.password,
                role: user.role
            }
        })
        delete newUser.password
        return newUser

    }

    async updateUser(id, user) {

        const updatedUser = await prisma.user.update({
            where: {
                id: id
            },
            data: user
        })
        delete updatedUser.password
        return updatedUser

    }

    async deleteUser(id) {
        const deletedUser = await prisma.user.delete({
            where: {
                id: id
            }
        })
        delete deletedUser.password
        return deletedUser
    }

}