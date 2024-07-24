import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import summaryapi from '../Allapis'
import { FaStar } from "react-icons/fa";
import { FaRegStarHalfStroke } from "react-icons/fa6";
import displayINR from '../helpers/Displaycurrency';
import VerticleProducts from '../components/VerticleProducts';
import Categorywisedisplayproducts from '../components/Categorywisedisplayproducts';
import addToCart from '../helpers/AddtoCart';
import Context from '../context';

const ProductDetails = () => {
    const [data,setdata]=useState({
        productName:"",
        brandName:"",
        category:"",
        productImage:[],
        discription:"",
        price:"",
        selling:""
    })
    const params=useParams()
    const[loading,setloading]=useState(true)
    const productImagelist= new Array(4)?.fill(null)
    const [active,setactive]=useState("")
    const [zoomimg,setzoomimg]=useState({
        x:0,
        y:0
    })
    const navigate = useNavigate()
    const {fetchaddtocart}= useContext(Context)
    const [zoom,setzoom]=useState(false)
    const fetchData=async()=>{
        setloading(true)
        const response= await fetch(summaryapi.productdetails.url,{
            method:summaryapi.productdetails.method,
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                productid : params?.id
        })
        })
        setloading(false)
     const dataresponse= await response.json()
     setdata(dataresponse?.data)
     setactive(dataresponse?.data?.productImage[0])
    }
   
    useEffect(()=>{
        fetchData()
    },[params])
    const handleImage=(img)=>{
        setactive(img)

    }
    const handleZoom=useCallback((e)=>{
        setzoom(true)
        const {left ,top ,width ,height}= e.target.getBoundingClientRect()
        console.log(left,top,width,height)
        const x= (e.clientX-left)/width
        const y= (e.clienty-top)/height
        setzoomimg({
            x,y
        })
        
    },[zoomimg])
    const handleZoomOut=()=>{
        setzoom(false)
    }

    const handleAddTocart =async(e,id)=>{
            await addToCart(e,id)
            fetchaddtocart()
    }
    const handleBuyCart=async(e,id)=>{
        await addToCart(e,id)
        fetchaddtocart()
        navigate("/cart")

    }
  return (
    <div className='container mx-auto p-4'>
        <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
            <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>
                <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
                   <img src={active} className='h-full w-full object-scale-down mix-blend-multiply ' onMouseMove={handleZoom} onMouseLeave={handleZoomOut}/>
                   {/* image zoom */}
                   {
                    zoom && (
                        <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200 p-1 -right-[510px] top-0'>
                    <div className='w-full h-full min-w-[500px] min-h-[400px] mix-blend-multiply scale-150'
                    style={{
                        backgroundImage :`url(${active})`,
                        backgroundRepeat :'no-repeat',
                        backgroundPosition:`${zoomimg.x *100}% ${zoomimg.y *100}%`

                    }}>
                        
                    </div>


                   </div>

                    )
                   }
                   
                </div>
                <div className='h-full'>
                    {
                   loading ? (
                    <div className='flex gap-2 lg:flex-col overflow-scroll scrollb-none h-full'>
                        {
                            productImagelist.map((el,index) =>{
                                return(
                                 <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loading"+index}>
        
                                 </div>
        
                            )})
                        }
                    </div>
                
                    
                   ):(
                    <div className='flex gap-2 lg:flex-col overflow-scroll scrollb-none h-full'>
                    {
                        data?.productImage?.map((img,ind) =>{
                            return(
                             <div className='h-20 w-20 bg-slate-200 rounded p-1' key={img}>
                                <img src={img} className='w-full h-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=>handleImage(img)} onClick={()=>handleImage(img)}/>
    
                             </div>
    
                        )})
                    }
                </div>
                   )}
                </div>

            </div>
            {
               loading ? (
                <div className='grid gap-2 w-full'>
                <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full inline-block px-5 '></p>
                <h2 className='text-2xl lg:text-4xl font-medium bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full '></h2>
                <p className=' capitalize text-slate-400 bg-slate-200 animate-pulse min-w-[100px] h-6 lg:h-8 w-full rounded-full'></p>
                <div className='text-red-600 flex items-center gap-1 bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full'> 


                    </div>
                    <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                       <p className='text-red-600 bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full'></p> 
                       <p className='text-slate-400 line-through bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full'></p> 
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <button className='border-2 rounded px-3 py-1 min-w-[100px] text-red-600 font-medium hover:bg-red-600 hover:text-white bg-slate-200 animate-pulse h-6 lg:h-8 w-full'></button>
                        <button className='border-2 rounded px-3 py-1 min-w-[100px]  font-medium text-white  hover:text-red-600 hover:bg-white animate-pulse h-6 lg:h-8 w-full'></button>
                    </div>
                    <div>
                        <p className='text-slate-600 font-medium my-2 bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full'></p>
                        <p className='bg-slate-200 animate-pulse h-6 lg:h-8 w-full rounded-full'></p>
                    </div>
               </div>

               ):(
                <div className='flex flex-col gap-2'>
                <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
                <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
                <p className=' capitalize text-slate-400'>{data?.category}</p>
                <div className='text-red-600 flex items-center gap-1'> 
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaRegStarHalfStroke />

                    </div>
                    <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
                       <p className='text-red-600'>{displayINR(data.selling)}</p> 
                       <p className='text-slate-400 line-through'>{displayINR(data.price)}</p> 
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[100px] text-red-600 font-medium hover:bg-red-600 hover:text-white' onClick={(e)=>handleBuyCart(e,data?._id)} >Buy</button>
                        <button className='border-2 border-red-600 rounded px-3 py-1 min-w-[100px]  font-medium text-white bg-red-600 hover:text-red-600 hover:bg-white'onClick={(e)=>handleAddTocart(e,data?._id)}>Add to cart</button>
                    </div>
                    <div>
                        <p className='text-slate-600 font-medium my-2'>Description:</p>
                        <p>{data?.discription}</p>
                    </div>
               </div>
               )
            }
        </div>
        {
            data.category && (
                <Categorywisedisplayproducts category={data?.category} heading={"Recommended Product's"}/>

            )
        }
        
    </div>
  )
}

export default ProductDetails