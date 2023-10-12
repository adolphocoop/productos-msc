import mongoose from 'mongoose';

export const connectDB = async () =>{
    try {
        const url = 'mongodb+srv://adolphovt12:MaestriaProductos.2023@cluster0.w5bkkcg.mongodb.net/?retryWrites=true&w=majority'
        await mongoose.connect(url);
        //await mongoose.connect('mongodb://127.0.0.1/sistema');
        console.log('Base de datos conectada')
        
    } catch (error) {
        console.log(error)
        
    }
}