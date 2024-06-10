import { userModel } from "./models/usuarios.js"


export const getUserById = async (id) => await userModel.findById(id)

export const getUserByEmail = async (email) => await userModel.findOne({email})

export const userRegistro = async (user) => await userModel.create({...user})


