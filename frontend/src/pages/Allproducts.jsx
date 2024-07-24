import React, { useEffect, useState } from 'react'
import Uploadproduct from '../components/Uploadproduct'
import summaryapi from '../Allapis'
import AdminProduct from '../components/AdminProduct'

const Allproducts = () => {
  const[openupload,setopenupload]=useState(false)
  const[allproduct,setallproduct]=useState([])
  const fetchallproduct=async()=>{
    const response = await fetch(summaryapi.Allproducts.uri,)
    const dataResponse= await response.json()
     console.log("product",dataResponse)
    setallproduct(dataResponse?.data || [])
  } 
  useEffect(()=>{
    fetchallproduct()
  },[])
  return (
    <div>
    <div className='bg-white py-2 px-4 flex justify-between'>
      <h2 className='font-bold text-lg'>All Products</h2>
      <button className='border-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setopenupload(true)}>Upload Product</button>
    </div>
    <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll'>
     {
      allproduct.map((product,index)=>{
        return(
          <AdminProduct data={product} key={index+"allproduct"} fetchdata={fetchallproduct}/>
          
        )
      })
     }
    </div>
    
    
    {
      openupload &&(
        <Uploadproduct onClose={()=>setopenupload(false)} fetchData={fetchallproduct}/>
      )
    }
    
    </div>
  )
}

export default Allproducts