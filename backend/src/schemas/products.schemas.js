import { z } from 'zod';


export const productSchema = z.object({
    name: z.string({
        required_error: 'Nombre del producto requerido'
    }),
    price: z.number({
        required_error: 'Precio debe ser un numero'
    }),
    year: z.number({
        required_error: 'Anio debe ser un numero'
    }).optional()
});//Fin de productSchema 

//Fin de productSchema 

