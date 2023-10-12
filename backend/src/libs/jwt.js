import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

//Funcion para generar un tokrn dde incio de sesion 
export function createAccessToken(payload){
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
            {
                expiresIn: "1d"
            },
            (err, token)=>{
                if (err){
                    reject(err);
                    console.log(err);
                }
                resolve(token)
            }
        )
    })
}