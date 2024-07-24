import React, { useState } from 'react'
import loginicon from "../assest/signin.gif"
import { FiEye } from "react-icons/fi";
import { FiEyeOff } from "react-icons/fi";
import { Link, useNavigate } from 'react-router-dom';
import imagetobase64 from '../helpers/imagetobase64';
import summaryapi from '../Allapis';
import { toast } from 'react-toastify';

const Signup = () => {
  const [showicon,setshowicon]=useState(false)
  const [showconfpass,setshowconfpass]=useState(false)
  const [data,setdata]=useState({
      email:"",
      password:"",
      name:"",
      confirmpassword:"",
      profilepic:""
  })
  const navigate=useNavigate()
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
      if(data.password==data.confirmpassword){
        const dataresponse= await fetch(summaryapi.signup.url,{
            method: summaryapi.signup.method,
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
          })
          const dataapi= await dataresponse.json()
          if(dataapi.success){
            toast.success(dataapi.message)
            navigate("/login")

          }
          if(dataapi.error){
            toast.error(dataapi.message)

          }

          

      }else{
        toast.error("check your password and confirm password")
        
      }

      
  }
  const handleruploadpic=async(e)=>{
       const file=e.target.files[0]
       const imagep=await imagetobase64(file)
       setdata((preve)=>{
        return{
          ...preve,
          profilepic:imagep
        }
       })
  }




  
  return (
    <section id="signup">
    <div className='mx-auto container p-4'>
        <div className='bg-white p-5 py-5 w-full max-w-md mx-auto'>
            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
                    <img src={data.profilepic||loginicon} alt='login icon'/>

                    </div>
                    <form >
                      <label >
                        <div className='text-xs bg-opacity-90 bg-slate-200 pb-5 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                          Upload photo
                        </div>
                        <input type="file" className='hidden' onChange={handleruploadpic}/>
                      </label>
                    
                    </form>
            </div>
            <form className='pt-6 flex flex-col gap-2' action="" onSubmit={handlersubmit}>
            <div className='grid'>
                    <label htmlFor="">Name:</label>
                    <div className='bg-slate-100 p-2'> 
                    <input type="text" 
                    placeholder='enter your name'
                    name='name' 
                    value={data.name}
                    required
                    onChange={handleronchange}
                    className='w-full h-full outline-none bg-transparent'/>
                    </div>
                </div>
                <div className='grid'>
                    <label htmlFor="">Email:</label>
                    <div className='bg-slate-100 p-2'> 
                    <input type="email" 
                    placeholder='enter email'
                    name='email' 
                    value={data.email}
                    required

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
                    required

                     className='w-full h-full outline-none bg-transparent'/>
                    <div className='cursor-pointer text-xl ' onClick={()=>setshowicon((prev)=>!prev)}>
                        <span>
                            {
                                showicon?( <FiEye />):(<FiEyeOff />)
                            }
                            
                            </span>
                        </div>
                    </div>
                   
                </div>

                <div>
                    <label htmlFor=""> Confirm-password:</label>
                    <div className='bg-slate-100 p-2 flex'>
                     <input type={showicon?"text":"password"} 
                     placeholder='enter confirm-password'
                     name='confirmpassword' 
                    required
                    value={data.confirmpassword}

                     onChange={handleronchange} 
                     className='w-full h-full outline-none bg-transparent'/>
                    <div className='cursor-pointer text-xl ' onClick={()=>setshowconfpass((prev)=>!prev)}>
                        <span>
                            {
                                showconfpass?( <FiEye />):(<FiEyeOff />)
                            }
                            
                            </span>
                        </div>
                    </div>
                    
                </div>

                <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'>Signup</button>
            </form>
            <p className='my-4'>already have an account ?<Link to={'/login'} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
        </div>

    </div>
</section>
  )
}

export default Signup