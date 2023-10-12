import axios from "./axios";
//const URL = 'http://localhost:4000/api';

export const registerRequest = user => axios.post('/register', user);

export const loginRequest = user => axios.post('/login', user);

export const verifyTokenRequest = () => axios.get('/verify');

//Ruta para llamara a la ruta del back de logout
export const logoutRequest = ()=> axios.post('/logout')