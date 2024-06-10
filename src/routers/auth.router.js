import { Router } from 'express'
import {check} from 'express-validator'
import { crearUsuario, loginUsuario } from '../controller/auth.controller.js';
import { validarCampos } from '../middleware/auth.js';
import { existeEmail } from '../helpers/db-validaciones.js';

const router = Router()

router.post('/login', [
    check('email', 'el email es obligatorio').not().isEmpty(),
    check('password','la contrasenia es obligatoria y como minimo 6 caracteres').isLength({min: 6}),
    validarCampos,


], loginUsuario)

router.post('/registro', [
    check('name', 'el nombre es obligatorio').not().isEmpty(),
    check('lastName', 'el apellido es obligatorio').not().isEmpty(),
    check('email', 'el email es obligatorio').not().isEmpty(),
    check('email').custom(existeEmail) ,
    check('password','la contrasenia es obligatoria y como minimo 6 caracteres').isLength({min: 6}),
    validarCampos,
], crearUsuario)

export {router as authRouter}