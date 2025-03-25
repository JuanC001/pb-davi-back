import UserService from "../services/users.service.js"
import bcrypt from 'bcryptjs'
import { generateJWT } from '../helpers/jwt.js'
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library"

const authController = {}

authController.login = async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' })
        }

        const userService = new UserService()
        const user = await userService.findUserByEmail(email)
        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword || !user) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        delete user.password
        const token = await generateJWT(user.id, user.email, user.role)

        res.status(200).json({ user, token })
        return

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Internal Server Error' })
        return
    }

}
authController.register = async (req, res) => {

    try {

        const { email, password, name, surname, document, role } = req.body

        if (!email || !password || !name || !document) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(password, salt)
        const userService = new UserService()
        const user = await userService.createUser({
            name,
            surname,
            document,
            email,
            password: hash,
            role: role || 'USER'
        })

        delete user.password
        delete user.document
        res.status(201).json(user)
        return

    } catch (error) {
        console.log(error)

        if (error instanceof PrismaClientKnownRequestError) {
            if (error.code === 'P2002') {
                res.status(400).json({ message: 'Email already exists' })
                return
            }
        }
        res.status(500).json({ message: 'Internal Server Error' })
        return
    }

}
authController.renew = (req, res) => { }

export default authController