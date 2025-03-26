import { validateJWT } from "../helpers/jwt.js";

export const validateToken = (req, res, next) => {

    const token = req.header('token');

    if (!token) {

        return res.status(401).json({
            message: 'No token'
        })

    }

    try {

        const verificación = validateJWT(token)
        if (!verificación) {
            res.status(401).json({

                result: false,
                message: 'Invalid Token'

            })
            return
        }

    } catch (error) {
        res.status(401).json({

            result: false,
            message: 'Invalid Token'

        })
        return
    }

    next();

}