import { Router } from "express";
//Importamos las funciones del siguiente archivo y ruta
import { login, register, logout, profile, verifyToken } from '../controllers/auth.controller.js'
import { authRequired } from "../middlewares/validateToken.js";
//Importamos el validatorSchema
import { ValidateSchema } from "../middlewares/validator.middleware.js";
//Importamos los esquemas de validacion
import {registerSchema, loginSchema} from '../schemas/auth.schemas.js'

const router = Router();

router.get('/verify', verifyToken)
router.post('/register', ValidateSchema (registerSchema), register),
router.post('/login', ValidateSchema (loginSchema), login );
router.post('/logout', logout);
router.get('/profile', authRequired, profile);


export default router;