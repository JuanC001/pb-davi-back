import pkg from 'jsonwebtoken';
const { sign, verify } = pkg

export const generateJWT = async (uid, email, role) => {

    try {
        const token = sign({ uid, email, role }, process.env.SECRET_KEY_JWT, {
            expiresIn: '2h'
        })

        return token;
    } catch (error) {
        console.log(error)
        return null;
    }

}

export const validateJWT = (token) => {
    try {
        const { uid, email, role } = verify(token, process.env.SECRET_KEY_JWT);
        return true
    } catch (error) {
        console.log(error)
        return false;
    }
}
