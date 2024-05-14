import { userModel } from "../models/usuarios.js";


export const getUserEmail = async (email) =>{
    try {
        return await userModel.findOne({email})
    } catch (error) {
        console.log('getUserEmail ->', error)
        throw error
    }
}

export const userRegistro = async (user) =>{
    try {
        return await userModel.create({...user})
    } catch (error) {
        console.log('userEmail ->', error)
        throw error
    }
}