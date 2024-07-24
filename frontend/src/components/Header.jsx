import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { FaSearch } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import summaryapi from '../Allapis';
import {toast} from 'react-toastify';
import { setuserdetails} from '../store/Userslice'
import Role from '../Allapis/Role';
import Context from '../context';

const Header = () => {
    const user = useSelector(state=>state?.user?.user)
    const dispatch= useDispatch()
    const [menuprofile,setmenuprofile]=useState(false)
    const context = useContext(Context)
    const navigate=useNavigate()
    const searchINput= useLocation()
    const searchurl =new URLSearchParams(searchINput?.search)
    const searchquery = searchurl.getAll("q")
    const[search,setsearch]=useState(searchquery)

    const handleLogout= async()=>{
        const fectchdata= await fetch(summaryapi.logout.url,{
            method:summaryapi.logout.method,
            credentials:'include'
        })
        const data =await fectchdata.json()
        if(data.success){
           toast.success(data.message)
           dispatch(setuserdetails(null))
           navigate('/')
        }
        if(data.error){
            toast.error(data.message)
         }

    }
    const handlesearch=(e)=>{
        
        const {value}=e.target
        setsearch(value)
        if(value){
            navigate(`/search?q=${value}`)
        }else{
            navigate("/search")
        }

    }
  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
    <div className='h-full container mx-auto flex items-center px-4 justify-between bg-white'>
        <div>
            <Link to={"/"}>
            <p>BuyCart</p>
            </Link>
        </div>
        <div className='hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2'>
            <input type='text' placeholder='search product here....'className='w-full outline-none pl-2'onChange={handlesearch} value={search}/>
            <div className='text-lg min-w-[50px] h-8 bg-red-600 flex items-center justify-center rounded-r-full text-white'>
            <FaSearch />
            </div>
        </div>
        <div className='flex items-center gap-7 '>
        
            <div className='relative flex justify-center'>
                {
                    user?._id &&(
                        <div className='text-3xl cursor-pointer'onClick={()=>setmenuprofile(prev=>!prev)}>
                {
                    user?.profilepic ?(
                        <img src={user?.profilepic}className='w-10 h-10 rounded-full' alt={user?.name}/>
                    ):(<FaRegUser />)
                }
            
            </div>

                    )
                }
            
            {
                menuprofile &&(
                    <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded '>
                    <nav>{
                        user?.role==Role.ADMIN &&(
                            <Link to={'/admin-panel/product'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2'onClick={()=>setmenuprofile(prev=>!prev)}>Admin panel</Link> 
                        )
                        }
                     
                    </nav>
                  </div>
                )
            }
           
            </div>
            {
                user?._id && (

                    <Link to={"cart"} className='text-2xl relative'>
                    <span><FaShoppingCart /></span>
                    <div className='bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                        <p className='text-sm'>{context?.cartproductcount}</p>
                    </div>
                    </Link>
                )
            }

            <div>
                {
                   user?._id ?(
                    <button onClick={handleLogout} className='px-3 py-1 text-white rounded-full bg-red-600 hover:bg-red-700'>Logout</button>
                   ) :
                   ( <Link to={'login'}>
                    <button className='px-3 py-1 text-white rounded-full bg-red-600 hover:bg-red-700'>Login</button>
                    </Link>)
                }
               
        </div>
        </div>
        
    </div>
    </header>
  )
}

export default Header