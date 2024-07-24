import React, { useEffect, useState } from 'react'
import summaryapi from '../Allapis'
import { Link } from 'react-router-dom'



const Categoryproduct = () => {
    const [productcategory,setproductcategory]= useState([])
    const [loading,setloading]=useState(false)
    const categoryLoading= new Array(13).fill(null)
    const fetchcategory=async()=>{
        setloading(true)
    const response= await fetch(summaryapi.getcaterogy.url)
    
const dataResponse = await response.json()
    
setloading(false)
setproductcategory(dataResponse.data)
    }
    useEffect(()=>{
        fetchcategory()

    },[])
  return (
    <div className='container mx-auto p-4'>
          <div className='flex items-center gap-4 justify-between scroll-none'>
          {
            loading ? (
                
                categoryLoading.map((elm,index)=>{
                    return(
                        <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>

                        </div>
                    )
                }) 
            
                
            ):(
                productcategory.map((product,index)=>{
                    return(
                        <Link to={"/product-category?category="+product?.category} className='cursor-pointer' key={product?.category}>
                            <div className='w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden p-4 bg-slate-300 flex items-center justify-center'>
                                <img src={product?.productImage[0] } alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 transition-all'/>
                            </div>
                            <div>
                               <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p> 
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

export default Categoryproduct