import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import {useNavigate, Link} from 'react-router-dom'
import { useEffect, useState } from "react"
import { IoPersonAdd, IoEyeSharp, IoEyeOffSharp } from 'react-icons/io5'
import ReCaptcha from 'react-google-recaptcha'


function LoginPage() {
  const {register, handleSubmit, formState:{errors}} = useForm();
  const {signin, isAuthenticated, errors:signInErrors } = useAuth();
  const [ passwordShown, setPasswordShown] = useState(false);
  const [ captchaValue, setCaptchaValue] = useState(null);
  
  
  
  const togglePasswordVisibility = ()=>{
    setPasswordShown(passwordShown? false: true);
  }

  const navigate = useNavigate();
  

  useEffect(  ()=>{
    if(isAuthenticated)
        navigate('/products')
    else
        console.log("No esta autenticado.");
}, [isAuthenticated]);

  const onSubmit = handleSubmit((data) =>{
    console.log(data);
    signin(data);
  })
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        
        
        {
                    signInErrors.map((error, i) => (
                        <div className="bg-red-500 p-2 my-2 text-white" key={i}>
                            {error}
                        </div>
                    ))
                }
      
      <form onSubmit={ onSubmit}>
        <h1 className="text-3xl font-bold my-3">Login</h1>
        <label htmlFor="email">Email</label>
        <input type="email"
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Email"
                        
                        {
                            ...register("email", {required: true})
                        }
                    />
                    {
                        errors.email && (
                            <div className="text-red-500">Email es requerido.</div>
                        )
                    }
                    <label htmlFor="password">Password</label>
                    <div className="flex justify-end items-center relative">
                    <input type={passwordShown? "text": "password"}
                        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                        placeholder="Password"
                        {
                            ...register("password", {required: true })
                        }
                    />
                    {
                      passwordShown? <IoEyeSharp size={30} className='absolute mr-2 w-10'
                                                 onClick={togglePasswordVisibility}/>
                                   :
                                      <IoEyeOffSharp size={30} className="absolute mr-2 w-10"
                                                          onClick={togglePasswordVisibility}/>
                    
                    
                    
                                                }


                    {
                        errors.password?.type === "required" && (
                            <div className="text-red-500">Password requerido</div>
                        )
                    }
                    {
                      errors.password?.type ==="minLength" && (
                        <div className="text-red-500">La longitud minima es de 6 caracteres </div>

                      )
                    }
                    </div>

                    <button className="bg-zinc-700 px-3 py-3 my-3 rounded-md"
                        type="submit" disabled ={!captchaValue}
                        >Iniciar Sesión
                        
                        </button>

                        <ReCaptcha 
                        sitekey="6Lfe05QoAAAAAHJbyKu0Pkaxpi0Tj69iEUir6b6q"
                        onChange={ (value) => setCaptchaValue(value)}
                        />
        </form>
        <div className="flex gap-x-2 justify-between pt-5 mt-5">
          ¿No tienes una cuenta?
           <Link to='/register' className="text-sky-500">
            <div className="flex mx-2 px-2 items-start">
              !Crea una cuenta <IoPersonAdd size={30} className="mx-1"/>
            </div>
            
            
            </Link>
        </div>


      </div>
         
    </div>
  )
}

export default LoginPage