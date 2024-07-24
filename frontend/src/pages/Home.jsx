import React from 'react'
import Categoryproduct from '../components/Categoryproduct'
import SlidingBanner from '../components/SlidingBanner'
import Horizontalwiseproduct from '../components/Horizontalwiseproduct'
import VerticleProducts from '../components/VerticleProducts'

const Home = () => {
  return (
    <div>
      <Categoryproduct/>
      <SlidingBanner/>
      <Horizontalwiseproduct category={"airpode"} heading={'TOP airpods'}/>
      <Horizontalwiseproduct category={"earphone"} heading={"Popular's Earphones"}/>
      <VerticleProducts category={"mobile"} heading={"Best Mobile's"}/>
      <VerticleProducts category={"mouse"} heading={" Mouse"}/>
      <VerticleProducts category={"television"} heading={" Television"}/>
      <VerticleProducts category={"camera"} heading={" camera & Photography"}/>
      <VerticleProducts category={"processor"} heading={"high speed processor"}/>
      <VerticleProducts category={"speaker"} heading={"primium Bluetooth Speakers"}/>
      <VerticleProducts category={"refrigerator"} heading={"refrigerator"}/>
      <VerticleProducts category={"printer"} heading={"printers"}/>
      <VerticleProducts category={"trimmer"} heading={"Trimmers"}/>

      
    </div>
  )
}

export default Home