import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchallcategoryproducts from '../helpers/FetchAllcategory'
import displayINR from '../helpers/Displaycurrency'
import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/AddtoCart'
import Context from '../context'
import scrolltop from '../helpers/Scrolltop'

    const Categorywisedisplayproducts = ({category , heading}) => {
    const [datas,setdatas]= useState([])
    const[loading,setloading]=useState(true)
    const loadingList =new Array(13).fill(null)
    const {fetchaddtocart}= useContext(Context)

    const handleaddtocart=async(e,id)=>{
       await addToCart(e,id)
       await fetchaddtocart()
    }
   
   
    const fetchdatas=async()=>{
        setloading(true)
        const categoryproduct= await fetchallcategoryproducts(category)

        setloading(false)
        setdatas(categoryproduct?.data)
    }
    useEffect(()=>{
        fetchdatas()
       

    },[])

  return (
    <div className='container mx-auto px-4 my-6 relative'>
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
       <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollb-none transition-all'>

       {
        loading ? (
            loadingList.map((product,index)=>{
                return(
                    <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow '>
                      <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flext justify-center items-center animate-pulse'>
                       
        
                       </div>
                       <div className='p-4 grid gap-3'>
                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                        <p className='capitalize text-slate-500 p-1 py-2 animate-pulse rounded-full bg-slate-200'></p>
                        <div className='flex gap-3'>
                            <p className='text-red-600 font-medium p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full'></p>
                            <p className='text-slate-500 line-through p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full'></p>
                        </div>
                        <button className='  text-white px-3  p-1 py-2 animate-pulse rounded-full bg-slate-200 w-full '> </button>
                       </div>
        
                </div>
                )
            })

        ):(
            datas.map((product,index)=>{
                return(
                    <Link to={"/product/"+product._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow ' onClick={scrolltop}>
                      <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                        <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-125 transition-all cursor-pointer mix-blend-multiply'/>
        
                       </div>
                       <div className='p-4 grid gap-3'>
                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                        <p className='capitalize text-slate-500'>{product?.category}</p>
                        <div className='flex gap-3'>
                            <p className='text-red-600 font-medium'>{displayINR(product?.selling) }</p>
                            <p className='text-slate-500 line-through'>{displayINR(product?.price)}</p>
                        </div>
                        <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full'onClick={(e)=>handleaddtocart(e,product?._id)}> Add to cart</button>
                       </div>
        
                </Link>
                )
            })

        )
           
        }
       </div>
    </div>
  )
}

export default Categorywisedisplayproducts