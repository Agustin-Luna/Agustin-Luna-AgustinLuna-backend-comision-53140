import jwt from "jsonwebtoken";


export const generateToken = (user) => {
    try {
        return jwt.sign({user},'clavejwt', {expiresIn: '8h'})
    } catch (error) {
        console.log(error)
        throw error
    }
}