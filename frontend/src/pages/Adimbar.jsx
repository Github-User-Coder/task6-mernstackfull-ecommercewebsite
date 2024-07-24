import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUser } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Role from '../Allapis/Role';

const Adimbar = () => {
    const user = useSelector(state=>state?.user?.user)
    const navigate=useNavigate()
    useEffect(()=>{
        if(user?.role!=Role.ADMIN){
            navigate('/')

        }
    },[user])
  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
        <aside className='bg-white min-h-full w-full max-w-60 customShadow'>
            <div  className='h-32  flex justify-center items-center flex-col'>
        <div className='text-5xl cursor-pointer relative flex justify-center'>
                {
                    user?.profilepic ?(
                        <img src={user?.profilepic}className='w-20 h-20 rounded-full' alt={user?.name}/>
                    ):(<FaRegUser />)
                }
            
            </div>
            <p className='capitalize text-lg font-semibold'>{user?.name}</p>
            <p className='text-sm'>{user?.role}</p>
            </div>
            <div className='grid pr-4'>
                <Link to={'all-user'} className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
                <Link to={'product'} className='px-2 py-1 hover:bg-slate-100'>Product</Link>
            </div>
        </aside>
        <main className='w-full h-full p-2'>
         <Outlet/>
        </main>

    </div>
  )
}

export default Adimbar