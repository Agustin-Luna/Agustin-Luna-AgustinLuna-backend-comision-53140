import { response, request } from "express"
import { UserRepo } from "../repositories/index.js"
import { createHash, isValidPassword } from "../utils/bcryptPassword.js"
import { generateToken } from "../utils/jsonWebToken.js"


export const loginUsuario = async (req = request, res = response) => {
    try {
        const {email, password} = req.body
        const usuario = await UserRepo.getUserByEmail(email)

        if(!usuario) return res.status(400).json({ok:false, msg: 'datos invalidos'})

        const validPassword = isValidPassword(password, usuario.password)
        if(!validPassword){return res.status(400).json({ok:false, msg: 'password invalida'})}

        const {_id,name,lastName,rol} = usuario

        const token = generateToken({_id, name, lastName, email, rol})

        return res.json({ok:true,token,usuario})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false, msg:'contacte a un admin'})
    }
}

export const crearUsuario = async (req = request, res = response) => {
    try {
        req.body.password = createHash(req.body.password)

        const usuario = await UserRepo.userRegistro(req.body)

        const {_id,name,lastName,email,rol} = usuario

        const token = generateToken({_id,name,lastName,email,rol})

        return res.json({ok:true, usuario, token})

    } catch (error) {
        console.log(error)
        return res.status(500).json({ok:false, msg:'contacte a un admin'})
    }
}