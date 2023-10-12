import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest, verifyTokenRequest, logoutRequest } from "../api/auth";
import Cookies from 'js-cookie'

export const AuthContext = createContext();
export const useAuth =()=>{
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth debe estar definido en un contexto')
    }
    return context
}

export const AuthProvider = ({ children }) =>{
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] =useState(false)
    const [errors, setErrors] = useState([]);
    const [loading, setLoading ] = useState(true)

    
    
    const signup = async (user)=>{
        try{
            const res = await registerRequest(user);
            //console.log(res.data);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch(error){
            // console.log(error);
            // Si existe algún error al registrar al usuario, guardamos el error en la variable.
            console.log(error.response);
            setErrors(error.response.data);
        }
    }//Fin de Signup
    const signin = async (user) =>{
        try {
            const res = await loginRequest(user);
            console.log(res)
           setIsAuthenticated(true)
            setUser(res.data)
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
            //console.log(error.response)
            //setErrors(error.response.data)
        }
    }//Fin de signin
    //Funcion para cerrar sesión
    const logout = ()=>{
        logoutRequest();
        Cookies.remove('token');
        setIsAuthenticated(false);
        setUser(null)
    }//Fin de logout










    useEffect( () =>{
        if(errors.length > 0){
            const timer = setTimeout( ()=>{
                setErrors([]);
            }, 5000);
            return ()=> clearTimeout(timer);
        }
    }, [errors])

    useEffect ( ()=>{
        async function checkLogin(){
            const cookies = Cookies.get()
              //console.log(cookies.token)
            if(!cookies.token){
            //si no hay un cookie que contenga el token
            setIsAuthenticated(false);//El usuario no esta autenticado
            setLoading(false);//No hay cookie y ya no se cargan los datos
            //Establecemos los datos del usuario en null
            return setUser(null);
            }
            try{ //En caso de que si exista un token lo verificamos
                const res = await verifyTokenRequest(cookies.token);
                console.log(res);
                if (!res.data){ //Si el servidor no responde con un token
                    setIsAuthenticated(false); //El usuario no esta autenticado
                    setLoading(false);
                    return;

                }
                //en caso de que exista un token y se obtenga datos de respuesta
                setIsAuthenticated(true); //El usuario ya esta autenticado
                setUser(res.data);//Establecemos los datos del usuario
                setLoading(false); //Termino de cargar los datos del usuario
            } catch (error){
                console.log(error);
                setIsAuthenticated(false)
                setLoading(false)
                setUser(null)
            }//Fin del catch
            

        }//Fin de checklogin
        checkLogin();
       
    }, [])



    return(
        <AuthContext.Provider value={ {
            signup,
            signin,
            user,
            isAuthenticated,
            errors,
            loading, 
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}