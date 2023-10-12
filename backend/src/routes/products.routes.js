import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
    getProducts,
    creatProduct,
    getProduct,
    deleteProduct,
    editProduct
} from '../controllers/products.controller.js';
//Importamos el validatorSchema
import {ValidateSchema} from "../middlewares/validator.middleware.js";
//importamos los esquemas de validacion
import { productSchema} from '../schemas/products.schemas.js';

const router = Router();
router.get ('/productos', authRequired, getProducts);
//Agregar producto
router.post('/productos', authRequired, ValidateSchema(productSchema), creatProduct);
//Obtener un producto por id
router.get('/productos/:id', authRequired, getProduct);
//Eliminar producto
router.delete('/productos/:id', authRequired, deleteProduct)
//Actualizar producto
router.put('/productos/:id', authRequired, editProduct)
export default router;