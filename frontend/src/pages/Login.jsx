import React, { useContext, useState } from 'react'
import loginicon from "../assest/signin.gif"
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';

import summaryapi from '../Allapis';
import { toast } from 'react-toastify';
import Context from '../context';


const Login = () => {
    const [showicon,setshowicon]=useState(false)
    const [data,setdata]=useState({
        email:"",
        password:""
    })
    const navigate=useNavigate()
    const { fetchuserdetails ,fetchaddtocart}= useContext(Context)
    const handleronchange=(e)=>{
        const{name,value}=e.target
        setdata((prev)=>{
            return{
                ...prev,
                [name]:value
            }
        })
    }

    const handlersubmit=async(e)=>{
        e.preventDefault()
        const dataresponse = await fetch(summaryapi.signin.url,{
            method: summaryapi.signin.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body: JSON.stringify(data)
        })
        const dataapi= await dataresponse.json()
        if(dataapi.success){
            toast.success(dataapi.message)
            navigate('/')
            fetchuserdetails()
            fetchaddtocart()
          
        }
         
         if(dataapi.error){
            toast.error(dataapi.message)
         }

    }




    console.log(data)
  return (
    <section>
        <div className='mx-auto container p-4'>
            <div className='bg-white p-5 py-5 w-full max-w-md mx-auto'>
                <div className='w-20 h-20 mx-auto'>
                    
                    <img src={loginicon} alt='login icon'/>
    
                </div>
                <form className='pt-6 flex flex-col gap-2' action="" onSubmit={handlersubmit}>
                    <div className='grid'>
                        <label htmlFor="">Email:</label>
                        <div className='bg-slate-100 p-2'> 
                        <input type="email" 
                        placeholder='enter email'
                        name='email' 
                        value={data.email}
                        onChange={handleronchange}
                        className='w-full h-full outline-none bg-transparent'/>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="">password:</label>
                        <div className='bg-slate-100 p-2 flex'>
                         <input type={showicon?"text":"password"} 
                         placeholder='enter password'
                         name='password' 
                         value={data.password}
                         onChange={handleronchange} 
                         className='w-full h-full outline-none bg-transparent'/>
                        <div className='cursor-pointer text-xl ' onClick={()=>setshowicon((prev)=>!prev)}>
                            <span>
                                {
                                    showicon?( <FiEye />):(<FiEyeOff />)
                                }
                                
                                </span>
                            </div>
                        </div>
                        <Link to={'/forgot-password'} className="block w-fit ml-auto hover:underline hover:text-red-600">forgot password</Link>
                    </div>
                    <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Login</button>
                </form>
                <p className='my-4'>Don't have an account ?<Link to={'/sign-up'} className='text-red-600 hover:text-red-700 hover:underline'>Signup</Link></p>
            </div>

        </div>
    </section>
  )
}

export default Login