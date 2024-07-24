import React, { useContext, useEffect, useState } from 'react'
import summaryapi from '../Allapis'
import Context from '../context'
import displayINR from '../helpers/Displaycurrency'
import { MdDeleteOutline } from "react-icons/md";
import { json } from 'react-router-dom';

const Cart = () => {
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(false)

  const context = useContext(Context)
  const loadingCart = new Array(context.cartproductcount).fill(null)

  const fetchdata = async () => {
   
    const response = await fetch(summaryapi.productsincardview.url, {
      method: summaryapi.productsincardview.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json"
      },

    })
    const datares = await response.json()
    if (datares.success) {
      setdata(datares?.data)
    }
    
  }
  const handleLoading =async()=>{
   
    await fetchdata()
  } 
  useEffect(() => {
    setloading(true)
    handleLoading()
    setloading(false)
  }, [])
 const updatecartproductqty=async(id,qty)=>{
  const response = await fetch(summaryapi.updateproductcart.url,{
    method:summaryapi.updateproductcart.method,
    credentials:'include',
    headers:{
      "content-type":"application/json"
    },
    body: JSON.stringify({
      _id:id,
      quantity: qty+1
    })

  })
  const dataresponse = await response.json()
  if(dataresponse.success){
    fetchdata()
  }

 }
 const decreaseqty=async(id,qty)=>{
  if(qty >=2){
    const response = await fetch(summaryapi.updateproductcart.url,{
      method:summaryapi.updateproductcart.method,
      credentials:'include',
      headers:{
        "content-type":"application/json"
      },
      body: JSON.stringify({
        _id:id,
        quantity: qty-1
      })
  
    })
    const dataresponse = await response.json()
    if(dataresponse.success){
      fetchdata()
    }
  }
}
const deleteaddcartproduct = async(id)=>{
  const fetchres = await fetch(summaryapi.deletecartproduct.url,{
    method:summaryapi.deletecartproduct.method,
    credentials:'include',
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify({
      _id : id
    })
  })
  const resdata= await fetchres.json()

  if(resdata.success){
    fetchdata()
    context.fetchaddtocart()
  }
}
const totalqty= data.reduce((prevvalue,currentvalue)=>prevvalue + currentvalue.quantity,0)
const totalPrice= data.reduce((prev,cur)=>prev+(cur.quantity *cur?.productId?.selling),0)
  return (
    <div className='container mx-auto'>
      <div className='text-center text-lg my-3'>
        {
          data?.length === 0 && !loading && (
            <p className='bg-white py-4'>you have not added product to cart</p>

          )

        }
      </div>
      <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>
        <div className='w-full max-w-3xl'>
          {
            loading ? (
              loadingCart?.map((ele,ind)=> {
                return (
                  <div key={ele+"Add to Cart Loading"+ind} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>

                  </div>
                )
              })

            ) : (
              data?.map((product,index)=>{
              return(
                <div key={product?._id + "Add to Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                    <div className='w-32 h-32 bg-slate-200'>
                      <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply'/>
                      </div>
                      <div className='px-4 py-2 relative'>
                        {/* delete product */}
                        <div className='absolute right-0 text-red-600 rounded-full hover:bg-red-600 hover:text-white p-2 cursor-pointer'
                        onClick={()=>deleteaddcartproduct(product?._id)}>
                        <MdDeleteOutline />

                        </div>
                        <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.productName}</h2>
                        <p className='capitalize text-slate-500'>{product?.productId.category}</p>
                        <div className='flex items-center justify-between'>
                        <p className='text-red-600 font-medium text-lg'>{displayINR(product?.productId?.selling)}</p>
                        <p className='text-slate-600 font-semibold text-lg'>{displayINR(product?.productId?.selling  * product?.quantity) }</p>
                        </div>
                        <div className='flex items-center gap-3 mt-1'>
                          <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'

                          onClick={()=>decreaseqty(product?._id,product?.quantity)}>-</button>
                          <span>{product?.quantity}</span>
                          <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded'
                          onClick={()=>updatecartproductqty(product?._id,product?.quantity)}>+</button>
                        </div>
                      </div>

                   
                </div>
              )

              })
            )
          }
        </div>


        <div className='mt-5 lg:mt-0 w-full max-w-sm'>
          {
            loading ? (
              <div className='h-36 bg-slate-200 border-slate-300 animate-pulse'>
               
              </div>
            ) :
              (
                <div className='h-36 bg-white'>
                  <h2 className='text-white bg-red-600 px-4 py-1'>Summary</h2>
                  <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                    <p>Quantity</p>
                    <p>{totalqty}</p>

                  </div>
                  <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
                    <p>total Price</p>
                    <p>{displayINR(totalPrice)}</p>
                  </div>
                  <button className='bg-blue-600  p-2 text-white w-full cursor-pointer'>Payment</button>
                </div>
              )
          }

        </div>
      </div>



    </div>
  )
}

export default Cart