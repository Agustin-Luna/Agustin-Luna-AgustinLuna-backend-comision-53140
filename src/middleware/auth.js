import { response, request } from "express"
import {validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'

export const auth = (req, res, next) =>{
    if(req.session?.user)
        return next()
    return res.redirect('/login')
}


export const admin = (req, res, next) =>{
    if(req.session?.rol === 'admin')
        return next()
    return res.redirect('/login')
}

export const validarCampos = (req = request, res = response, next) =>{
    const errores = validationResult(req)

    if(!errores.isEmpty()){
        return res.status(400).json(errores)
    }

    next()
}

// export const validarJWT = (req = request, res = response, next) => {
//     const token = req.header('authorization')?.replace('Bearer', '')

//     if(!token){
//         return res.status(401).json({ok:false, msg: 'no hay token en la peticion '})
//     }
//     try {
//         const {_id, email} = jwt.verify(token,'clavejwt')
//         req._id = _id
//         req.email = email
//     } catch (error) {
//         console.log(error)
//         return res.status(401).json({ok:false, msg: 'token no valido'})
//     }
//     next()
// }