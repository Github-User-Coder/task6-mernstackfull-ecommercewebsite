import React, { useState } from 'react'
import { RiEditFill } from "react-icons/ri";
import AdminEdit from './AdminEdit';
import displayINR from '../helpers/Displaycurrency';

const AdminProduct = ({
    data,
    fetchdata
}) => {
    const [editproduct,seteditproduct]=useState(false)
  return (
    <div className='bg-white p-4 rounded'>
<div className='w-40'>
      <div className='w-32 h-32 flex justify-center items-center'>
      <img src={data.productImage[0]} width={120} height={120} className='mx-auto object-fill h-full'/>
      </div>
            <h1 className='text-ellipsis line-clamp-2'>{data.productName}</h1>
            <div>
                <p className='font-semibold'>
                    {
                        displayINR(data.selling)
                    }
                  
                </p>
            <div className='w-fit ml-auto p-2 bg-green-200 hover:bg-gray-600 rounded-full hover:text-white cursor-pointer 'onClick={()=>seteditproduct(true)}>
            <RiEditFill />
            </div>
            </div>
         

            </div>
            {
                editproduct &&( <AdminEdit productdata={data} onClose={()=>seteditproduct(false)} fetchdata={fetchdata}/>)
            }
           
          </div>
  )
}

export default AdminProduct