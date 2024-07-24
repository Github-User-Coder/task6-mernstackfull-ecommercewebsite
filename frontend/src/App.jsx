import React, { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import summaryapi from "./Allapis";
import Context from "./context";
import { useDispatch } from "react-redux";
import { setuserdetails } from "./store/Userslice";
import './App.css'


function App() {
  const dispatch = useDispatch()
  const [cartproductcount,setcartproductcount]=useState(0)

  const fetchuserdetails= async()=>{
    const daataResponse = await fetch(summaryapi.current_user.url,{
      method:summaryapi.current_user.method,
      credentials: 'include',

    })
    const dataapi= await daataResponse.json()
    
    if(dataapi.success){
       dispatch(setuserdetails(dataapi.data))
    }
  }
  const fetchaddtocart=async()=>{
    const fetchdata= await fetch(summaryapi.productsincart.url,{
      method:summaryapi.productsincart.method,
      credentials:'include'
    })
    const datares= await fetchdata.json()
    setcartproductcount(datares?.data?.count)

  }

  useEffect(()=>{
    fetchuserdetails()
    fetchaddtocart()


  },[])

  return (
   
      <>
      <Context.Provider value={{
        fetchuserdetails,
        cartproductcount,
        fetchaddtocart

      }}>
      <ToastContainer 
      position='top-center'/>
      <Header/>
      <main className="min-h-[calc(100vh-120px)] pt-16">
      <Outlet/>
      </main>
      <Footer/>
      </Context.Provider>
      </>
   
  )
}

export default App
