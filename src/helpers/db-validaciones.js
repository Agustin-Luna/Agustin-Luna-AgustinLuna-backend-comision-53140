import { UserRepo } from "../repositories/index.js"



export const existeEmail = async(email) => {
    const emailExiste = await UserRepo.getUserByEmail(email)
    if(emailExiste){
        throw new Error(`el email ${email} ya existe`)
    }
}