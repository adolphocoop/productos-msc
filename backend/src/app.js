import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';

//importamos las rutas para los usuarios
import authRoutes from './routes/auth.routes.js'
//Importamos las rutas para productos
import productRoutes from './routes/products.routes.js';



const app = express();
app.use(cors({
   origin: 'http://localhost:5173',
   credentials: true
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//Se indica al servidor que utilice el objeto authRoutes
app.use('/api/', authRoutes);
app.use('/api/', productRoutes)

export default app;
