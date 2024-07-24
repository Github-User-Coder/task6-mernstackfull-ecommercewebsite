import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchallcategoryproducts from '../helpers/FetchAllcategory'
import displayINR from '../helpers/Displaycurrency'
import { VscTriangleLeft, VscTriangleRight } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/AddtoCart'
import Context from '../context'

const Horizontalwiseproduct = ({category , heading}) => {
    const [datas,setdatas]= useState([])
    const[loading,setloading]=useState(true)
    const loadingList =new Array(13).fill(null)
    const [scroll, setscroll]=useState(0)
    const scrollElement= useRef()
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
    const scrollRight=()=>{
        scrollElement.current.scrollLeft +=300
    }
    const scrollLeft=()=>{
        scrollElement.current.scrollLeft -=300

    } 
  return (
    <div className='container mx-auto px-4 my-6 relative'>
        <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
       <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollb-none transition-all' ref={scrollElement}>
       <button onClick={scrollLeft} className='bg-white shadow-md rounded-full p-1 absolute left-0 text-lg hidden md:block'><VscTriangleLeft /></button> 
       <button onClick={scrollRight} className='bg-white shadow-md rounded-full p-1 absolute right-0 text-lg hidden md:block'><VscTriangleRight /></button>
       { loading ? (
              loadingList.map((product,index)=>{
                return(
                    <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                      <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>
                       
        
                       </div>
                       <div className='p-4 grid w-full gap-2'>
                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                        <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                        <div className='flex gap-3 w-full'>
                            <p className=' font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                            <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                        </div>
                        <button className='text-sm hover:bg-red-700 text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse '> </button>
                       </div>
        
                </div>
                )})
       ):(
        datas.map((product,index)=>{
            return(
                <Link to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                  <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] '>
                    <img src={product?.productImage[0]} className='object-scale-down h-full hover:scale-125 transition-all cursor-pointer mix-blend-multiply'/>
    
                   </div>
                   <div className='p-4 grid'>
                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.productName}</h2>
                    <p className='capitalize text-slate-500'>{product?.category}</p>
                    <div className='flex gap-3'>
                        <p className='text-red-600 font-medium'>{displayINR(product?.selling) }</p>
                        <p className='text-slate-500 line-through'>{displayINR(product?.price)}</p>
                    </div>
                    <button className='text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleaddtocart(e,product?._id)}> Add to cart</button>
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

export default Horizontalwiseproduct