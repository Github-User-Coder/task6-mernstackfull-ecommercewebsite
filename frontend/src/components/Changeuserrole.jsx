import React, { useState } from 'react'
import Role from '../Allapis/Role'
import { RiCloseLine } from "react-icons/ri";
import summaryapi from '../Allapis';
import { toast } from 'react-toastify';

const Changeuserrole = ({
  name,
  email,
  role,
  userId,
  onClose,
  callfunc
}) => {
  const [userRole,setuserRole]= useState(role)
  const handlechange=(e)=>{
    setuserRole(e.target.value)
  }

  const updateUserRole=async()=>{
    const fetchupdateUser= await fetch(summaryapi.UpdateUser.url,{
      method:summaryapi.UpdateUser.method,
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        userId:userId,
        role:userRole
      })
    })
     const dataResponse= await fetchupdateUser.json()
     if(dataResponse.success){
      toast.success(dataResponse.message)
      onClose()
      callfunc()
     }
  }
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50'>
        <div className=' mx-auto bg-white shadow-md p-4 w-full max-w-sm'>
          <button className='block ml-auto' onClick={onClose}>
          <RiCloseLine />
          </button>
        <h1 className='pb-4 text-lg font-medium'> Change User Role</h1>
        <p>Name: {name}</p>
        <p>Email:{email}</p>
        <div className='flex items-center justify-between my-4'>
        <p>Role:</p>
        <select className='border px-4 py-1' value={userRole} onChange={handlechange}>
            {
               Object.values(Role).map(ele=>{
                return(
                    <option value={ele} key={ele}>{ele}</option>
                )
               })
            }
            
        </select>
        </div>
        <button className='w-fit mx-auto block py-2 px-3 rounded-full bg-red-600 text-white hover:bg-red-700'onClick={updateUserRole}>Change Role</button>
        </div>
        </div>
  )
}

export default Changeuserrole