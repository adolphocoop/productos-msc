//Importación del modelo User
import User from '../models/user.models.js'
//modulo para encriptar la contraseña
import bcryptjs from 'bcryptjs';
//Importamos el token
import { createAccessToken } from '../libs/jwt.js';
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../config.js';





//Funcion para registrar usuarios
export const register = async (req, res) =>{
    const { username, email, password} =req.body
    //console.log(username, email, password)
    try{

   //Validar que el email no este registrado en la base de datos
   const userFound = await User.findOne({email});
   if(userFound)
   return res.status(400)
             .json(["El email ya esta en uso"])




    //constante para la cvontraseña cifrada
    const passwordHash = await bcryptjs.hash(password, 10);
    const newUser = new User ({
        username,
        email,
        password: passwordHash
    });
    
    const userSaved = await newUser.save()
    const token =await createAccessToken({id: userSaved._id})
    res.cookie('token', token, {
        secure: true,
        httpOnly: true,
        sameSite: 'none'
    })
     //console.log(newUser)
    //res.send("Registrado");
    

    res.json({
        id: userSaved._id,
        username: userSaved.username,
        email: userSaved.email,
        password: userSaved.password,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt

    })


   
    }catch (error){
        console.log(error)
    }
}

//Funcion para iniciar sesión
export const login = async (req, res) =>{
    const {email, password} = req.body;
   
    try {
        const userFound = await User.findOne({email});
        if(!userFound){
            return res.status(400).json({message: "Usuario no encontrado"})

        }
       //Comprobamos el password que envio el usuario con el que esta en la BD
       const isMatch = await bcryptjs.compare(password, userFound.password);
       if(!isMatch){
        return res.status(400).json({message: "El password no coicide"})
       }
       const token = await createAccessToken({id: userFound._id})
       res.cookie('token', token,{
        httpOnly: true,
        sameSite: 'none',
        secure: true
       })
       res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createdAt:userFound.createdAt,
        updatedAt:userFound.updatedAt
       })

    } catch (error) {
        console.log(error)
        
    }  
    //res.send("Login")
}
//Funcion para cerra sesion
export const logout = (req, res) =>{
        res.cookie("token","",{
            expires:new Date(0),
        });
        return res.sendStatus(200);
}
//Perfil de usuarios
export const profile = async(req, res)=>{
    const userFound = await User.findById(req.user.id);

    if(!userFound)
    return res.status(400).json({message: "User not found"});

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email
    })
   /* console.log(req.user)
    res.send("profile")*/
}//Fin de perfil
export const verifyToken = async (req, res) =>{
    const {token} = req.cookies;
    if(!token)// Si hay un error al validar el token
    return res.status(401).json({message: ["No autorizado"]})

    jwt.verify(token, TOKEN_SECRET, async (err, user)=>{
        if(err)//Si hay un error al validar el token
        return res.status(401).json({message: ["No autorizado"]});
        const userFound = await User.findById(user.id);
        if(!userFound)//Si no se encuentra el usuario que viene en el token
        return res.status(401).json({message: "No autorizado" })

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        })//Fin de return res.json
    })//Fin de jwt.verify
}//Fin de verifyToken
