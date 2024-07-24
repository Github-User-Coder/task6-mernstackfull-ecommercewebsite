import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Productcategory from '../helpers/Productcategory'
import VerticleProductcart from '../components/VerticleProductcart'
import summaryapi from '../Allapis'

const CategorySeparate = () => {
    const [data,setdata]=useState([])
    const navigate= useNavigate()

    const [loading,setloading]=useState(false)

    const location=useLocation()
     const urlsearch= new URLSearchParams(location.search)
     const urlcategoryListinarray =urlsearch.getAll("category")
    
     const urlcategoryobject={}
     urlcategoryListinarray.forEach(ele=>{
      urlcategoryobject[ele] = true
     })

    const [select,setselect]=useState(urlcategoryobject)
    const [filtercategory,setfiltercategory]=useState([])
    const [sortby,setsortby]=useState("")

    const fetchData= async()=>{
        const response= await fetch(summaryapi.filterproduct.url,{
          method:summaryapi.filterproduct.method,
          headers:{
            "content-type":"application/json"
          },
          body:JSON.stringify({
            category:filtercategory
          })
        })
        const dataResponse = await response.json()
        setdata(dataResponse?.data || [])
    }
    const handleselectcategory= (e)=>{
         const { name ,value ,checked}=e.target
         setselect((prev)=>{
          return{
            ...prev,
            [value]:checked
          }
         })
    }
    useEffect(()=>{
      fetchData()
    },[filtercategory])
    useEffect(()=>{
      
      const arrayOfcategory = Object.keys(select).map(categorykeyName=>{
        if(select[categorykeyName]){
          return categorykeyName
        }
        return null
      }).filter(ele => ele)
      setfiltercategory(arrayOfcategory)

      const urlformate=arrayOfcategory.map((ele,ind)=>{
           if((arrayOfcategory.length-1)===ind){
                 return `category=${ele}`
           }
           return `category=${ele}&&`
      })
      
      navigate("/product-category?"+urlformate.join(""))
    },[select])
    const handleOnchangesort=(e)=>{
      const {value}=e.target
      setsortby(value)
      if(value==='asc'){
        setdata(prev => prev.sort((a,b)=>a.selling -b.selling))
      }
      if(value==='dec'){
        setdata(prev => prev.sort((a,b)=>b.selling -a.selling))
      }
    }
    useEffect(()=>{

    },[sortby])
  return (

    <div className='container mx-auto p-4'>
     
        {/* desktop version */}
        
        <div className='hidden lg:grid grid-cols-[200px,1fr]'>
          {/* left side */}
         
          <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
            {/* sort by*/}
           <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-200'>sortby</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
              <div className='flex items-center gap-3'>
                <input type="radio" name='sortby'checked={sortby === 'asc'} value={"asc"} onChange={handleOnchangesort}/>
                <label>Price - low to high</label>
              </div>
              <div className='flex items-center gap-3'>
                <input type="radio" name='sortby' checked={sortby === 'dec'} value={"dec"} onChange={handleOnchangesort}/>
                <label>Price - high to low</label>
              </div>
            </form>
           </div>
          {/* filterby */}
           <div className=''>
            <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-200'>category</h3>
            <form className='text-sm flex flex-col gap-2 py-2'>
             {
              Productcategory?.map((categoryName,index)=>{
                return(
                  <div className='flex items-center gsp-3'>
                    <input type="checkbox" name={'category'} checked={select[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleselectcategory}/>
                    <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                  </div>
                )
              })
             }
            </form>
           </div>
          </div>
           {/* right side VerticleProductcart */}
           <div className='px-4'>
            <p className='font-medium text-slate-800 text-lg my-2'>Search Results: {data.length}</p>
               <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
               {
              data.length !==0 &&  (
                <VerticleProductcart data={data} loading={loading}   />
              )
            }
               </div>
           </div>
        </div>
    </div>
  )
}

export default CategorySeparate