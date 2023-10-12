import { z } from 'zod';

export const registerSchema = z.object({
    username: z.string({
        required_error: 'Nombre del usuario requerido'
    }),
    email: z.string({
        required_error: 'Email es requerido'

    })
    .email({
        required_error: 'Email invalido'

    }),
    password: z.string({
        required_error: 'Password requerido'
    })
    .min(6, {
        message: 'El password debe tener al menos 6 caracteres'
    })

}); //Fin de registrarSchema

export const loginSchema = z.object({
    email: z.string({
        required_error: 'Email es requerido'
    })
    .email({
        message: 'Email no es valido'
    }),
    password: z.string({
        required_error: 'Password requerido'
    })
    .min(6, {
        message: 'El password debe tener al menos 6 caracteres'
    })
})// Fin de loginSchema