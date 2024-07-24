import React, { useEffect, useState } from 'react'
import summaryapi from '../Allapis'
import { toast } from 'react-toastify'
import moment from 'moment'
import { FaUserEdit } from "react-icons/fa";
import Changeuserrole from '../components/Changeuserrole';

const Allusers = () => {
    const [allusers,setallusers]=useState([])
    const [closeicon,setcloseicon]=useState(false)

    const[updateuserdetails,setupdateuserdetails]=useState({
        email:"",
        name:"",
        role:"",
        _id:""
    })

 const fectchallusers =async()=>{
    const fetchdata = await fetch(summaryapi.AllUsers.url,{
        method:summaryapi.AllUsers.method,
        credentials:'include'
    })

    const dataResponse=await fetchdata.json()
    if(dataResponse.success){
        setallusers(dataResponse.data)
    }
    if(dataResponse.error){
        toast.error(dataResponse.message)
    }
    
 }
    useEffect(()=>{
        fectchallusers()

    },[])
  return (
    <div>
        <table className='w-full userTable'>
            <thead>
                <tr className='bg-black text-white'>
                <th>sl no</th>
                <th>Name</th>
                <th>emai</th>
                <th>Role</th>
                <th>Created Date</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                   allusers.map((ele,index)=>{
                    return(
                        <tr className=' px-12 border justify-center'  >
                            <td>{index+1}</td>
                            <td>{ele?.name}</td>
                            <td>{ele?.email}</td>
                            <td>{ele?.role}</td>
                            <td>{moment(ele?.createdAt).format('LL')}</td>
                            <td>
                                <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white '
                                onClick={()=>{
                                    setupdateuserdetails(ele)
                                    setcloseicon(true)

                                }}>
                                <FaUserEdit />
                                </button>
                            </td>
                        </tr>
                    )
                   })
                }
            </tbody>
        </table>
        {
            closeicon && (
                <Changeuserrole onClose={()=>setcloseicon(false)} 
                name={updateuserdetails.name}
                email={updateuserdetails.email}
                role={updateuserdetails.role}
                userId={updateuserdetails._id}
                callfunc={fectchallusers}
                />
            )
        }

        

    </div>
  )
}

export default Allusers