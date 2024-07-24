import React, { useEffect, useState } from 'react'
import { VscTriangleRight } from "react-icons/vsc";
import { VscTriangleLeft } from "react-icons/vsc";
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'


import image1mobile from '../assest/banner/img1_mobile.jpg'
import image2mobile from '../assest/banner/img2_mobile.webp'
import image3mobile from '../assest/banner/img3_mobile.jpg'
import image4mobile from '../assest/banner/img4_mobile.jpg'
import image5mobile from '../assest/banner/img5_mobile.png'

const SlidingBanner = () => {
    const [currentImage,setcurrentImage]=useState(0)
    const DestopImages=[
        image1,image2,image3,image4,image5
    ]
    const MobileImages=[
        image1mobile,image2mobile,image3mobile,image4mobile,image5mobile
    ]
    const nextImage=()=>{
        if(DestopImages.length-1 > currentImage){
            setcurrentImage(prev => prev + 1)
        }
        
    }

    const prevImage=()=>{
        if(currentImage!=0){
            setcurrentImage(prev => prev - 1)
        }
        
    }
    useEffect(()=>{
        const interval=setInterval(()=>{
            if(DestopImages.length-1 > currentImage){
                nextImage()
            }else{
                setcurrentImage(0)
            }

        },5000)
        return ()=>clearInterval(interval)
    },[currentImage])
  return (
    <div className='container mx-auto px-4 rounded '>
        <div className='h-60 md:h-72 w-full bg-slate-200 relative'>
            <div className='absolute z-10 h-full w-full md:flex items-center hidden'>
           <div className='flex justify-between w-full text-2xl'>
           <button onClick={prevImage} className='bg-white shadow-md rounded-full p-1'><VscTriangleLeft /></button> 
           <button onClick={nextImage} className='bg-white shadow-md rounded-full p-1'><VscTriangleRight /></button>
           </div>
            </div>

            {/* display version */}
           <div className='hippen md:flex h-full w-full overflow-hidden'>
           {
                DestopImages.map((img,ind)=>{
                    return(
                        <div className='w-full h-full min-w-full min-h-full transition-all' key={img} style={{transform:`translatex(-${currentImage *100}%)`}}>
           <img src={img} className='w-full h-full'/>
            </div>

                    )
                })
            }
           </div>
           {/* phone version */}
           <div className='flex h-full w-full overflow-hidden md:hidden'>
           {
                MobileImages.map((img,ind)=>{
                    return(
                        <div className='w-full h-full min-w-full min-h-full transition-all' key={img} style={{transform:`translatex(-${currentImage *100}%)`}}>
           <img src={img} className='w-full h-full object-cover'/>
            </div>

                    )
                })
            }
           </div>

           
        </div>
    </div>
  )
}

export default SlidingBanner