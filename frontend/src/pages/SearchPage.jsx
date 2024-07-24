import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import summaryapi from '../Allapis'
import VerticleProductcart from '../components/VerticleProductcart'


const SearchPage = () => {
    const query = useLocation()
    const [data ,setdata]=useState([])
    const [loading,setloading]=useState(false)
    const fetchproduct=async()=>{
        setloading(true)
        const response= await fetch(summaryapi.searchProduct.url+query.search)
        const datares= await response.json()
        setloading(false)
        setdata(datares?.data)
        
    }
    
    useEffect(()=>{
        fetchproduct()
    },[query])
  return (
    <div className='container mx-auto p-4'>
        {
            loading &&(
                <p className='text-lg text-center'>Loading...</p>
            )
        }
        <p className='text-lg font-semibold my-3'>Search Result:{data.length}</p>
        {
            data.length ===0 && !loading &&(
                <p className='bg-white text-lg text-center p-4'>NO Data Found....</p>
            )
        }
        {
            data.length !==0 && !loading && (

                <VerticleProductcart loading={loading} data={data}/>
        
            )
        }
    </div>
  )
}

export default SearchPage