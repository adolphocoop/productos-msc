import axios from './axios';


//Llamada al api para obtener todos los productos
export const getProductsRequest = () => axios.get('/productos')

//Llamada al api para obtener un producto por id
export const getProductRequest = (id) => axios.get('/productos/' + id);

//Llamada al api para agregar un producto
export const createProductRequest =(product) => axios.post('/productos', product);

//Llamada al api para eliminar un producto
export const deleteProductRequest =(id) =>axios.delete('/productos/' + id);

//Llamada al api para editar un producto
export const updateProductRequest  = (id, product) =>axios.put('/productos/' + id, product)