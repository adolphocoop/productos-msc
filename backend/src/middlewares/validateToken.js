import { TOKEN_SECRET } from "../config.js";
import jwt from 'jsonwebtoken'


export const authRequired = (req, res , next) =>{
    //console.log("Validando token");
    //const cookies = req.cookies
    //console.log(req.headers);
    const {token} = req.cookies;
    if(!token)
    return res.status(401).json({message: "No token, autorizacion denegada"})
     
    jwt.verify(token, TOKEN_SECRET, (err, user) =>{
        if(err)
        return res.status(403).json({message: "Token invalido"})
    //Si no hay error, imprimimos el usuario que inicio sesion
    //console.log(user);
    req.user = user;
    
    next();
})
    
}