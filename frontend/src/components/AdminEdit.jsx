import React, { useState } from 'react'
import { RiCloseLine } from "react-icons/ri";
import Productcategory from '../helpers/Productcategory';
import { IoCloudUpload } from "react-icons/io5";
import UploafImage from '../helpers/UploafImage';
import Imagebig from './Imagebig';
import { TiDeleteOutline } from "react-icons/ti";
import summaryapi from '../Allapis';
import {toast} from "react-toastify"
const AdminEdit = ({
    onClose,
    productdata,
    fetchdata
}) => {
    const [data,setdata]=useState({
        ...productdata,
        productName:productdata?.productName,
        brandName:productdata.brandName,
        category:productdata?.category,
        productImage:productdata?.productImage,
        discription:productdata?.discription,
        price:productdata?.price,
        selling:productdata?.selling
    })
    const [openfullscreen,setopenfullscreen]= useState(false)
    const [fullscreenimg,setfullscreenimg] = useState("")
    
    const handleOnchange=(e)=>{
        const {name,value}=e.target
        setdata((prev)=>{
            return{
                ...prev,
                [name]:value

            }})

    }
    const handleUploadProduct=async(e)=>{
        const file= e.target.files[0]
       
        const uploadImageCloudinary= await UploafImage(file)
        setdata((prev)=>{
            return{
                ...prev,
                productImage : [...prev.productImage,uploadImageCloudinary.url]

            }
        })

       

    }
    const handleremoveImage=async(index)=>{
         const allproductImages=[...data.productImage]
         allproductImages.slice(index,1)
         setdata((prev)=>{
            return{
                ...prev,
                productImage : [...allproductImages]

            }
        })
    }
    // submit
    const handlesubmit=async(e)=>{
        e.preventDefault()

        const dataResponse = await fetch(summaryapi.updateproduct.url,{
            method:summaryapi.updateproduct.method,
            credentials:'include',
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const Response= await dataResponse.json()
        if(Response.success){
            toast.success(Response?.message)
            onClose()
            fetchdata()
        }

        if(Response.error){
            toast.error(Response?.message)
        }
    }
  return (
    <div className='fixed w-full h-full bg-slate-200 bg-opacity-45 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>

        <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
            <div className='flex justify-between items-center pb-3'>
                <h2 className='font-bold text-lg'>Edit Product</h2>
                <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer'onClick={onClose}>
                <RiCloseLine />
                </div>
            </div>
            <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handlesubmit}>
                <label htmlFor="productName">Product Name:</label>
                <input type="text"
                id='productName' 
                placeholder='enter product name'
                name='productName' 
                value={data.productName} 
                onChange={handleOnchange}
                className='p-2 bg-slate-100 border rounded'
                />
                <label htmlFor="brandName" className='mt-3'>Brand Name:</label>
                <input type="text"
                id='brandName' 
                placeholder='enter brand Name'
                name='brandName' 
                value={data.brandName} 
                onChange={handleOnchange}
                className='p-2 bg-slate-100 border rounded'
                 required/>
                <label htmlFor="category" className='mt-3'>Category:</label>
                <select required value={data.category}name="category" id="category" onChange={handleOnchange} className='p-2 bg-slate-100 border rounded'>
                <option value={""} >Select Product</option>
                    {
                    Productcategory.map((ele,index)=>{
                        return(
                        <option value={ele.value} key={ele.value+index}>{ele.label}</option>
                        )
                        
                    })
                    }
                </select>

                <label htmlFor="productImage" className='mt-3'>Product Image:</label>
                <label htmlFor='uploadImageInput'>
                <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                
                <div className='bg-slate-400 flex justify-center items-center flex-col gap-2'>
                    
                 <span className='text-4xl'><IoCloudUpload /></span>
                <p className='text-sm'>Upload Product Image</p>
                <input type='file' id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                </div>
                
                </div>
                </label>
                <div>
                {
                    data?.productImage[0] ? (
                      <div className='flex items-center gap-2'>{
                        data.productImage.map((ele,index)=>{
                        return(
                            <div className='relative group'>
                                <img src={ele} alt={ele} width={80} height={80} 
                            className='bg-slate-100 border cursor-pointer' 
                            onClick={()=>{
                                setopenfullscreen(true)
                                setfullscreenimg(ele)
                            }}/>
                            <div 
                            className='absolute bottom-0 right-0 p-1 text-white bg-red-500 rounded-full hidden group-hover:block cursor-pointer'
                            onClick={()=>handleremoveImage(index)}>
                            <TiDeleteOutline />  
                            </div>
                            </div>
                            
                        )
                      })
                    }
                      </div>
                        
                      
                    ):(
                        <p className='text-red-700 text-xs'> please upload product images</p>
                    )
                }
                    
                </div>

                
                <label htmlFor="price" className='mt-3'>Price</label>
                <input type="number"
                id='price' 
                placeholder='enter product  price'
                name='price' 
                value={data.price} 
                onChange={handleOnchange}
                className='p-2 bg-slate-100 border rounded'
                required/>
              
              <label htmlFor="selling" className='mt-3'>Selling Price</label>
                <input type="number"
                id='selling' 
                placeholder='enter product  selling'
                name='selling' 
                value={data.selling} 
                onChange={handleOnchange}
                className='p-2 bg-slate-100 border rounded'
                required/>


                <label htmlFor="discription" className='mt-3'>discription</label>
                <textarea 
                className='h-28 bg-slate-100 border resize-none'
                placeholder="Enter the descreption"
                rows={3} 
                onChange={handleOnchange}
                name='discription'
                value={data.discription}
                id='discription'>

                </textarea>

            <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:text-red-800'>update Product</button>
            </form>
            </div>

            {/* image full */}
        {
            openfullscreen &&  (<Imagebig onClose={()=>setopenfullscreen(false)} imgurl={fullscreenimg}/>)
        }
            

            
            </div>
  )
}

export default 
AdminEdit