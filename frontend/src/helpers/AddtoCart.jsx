import summaryapi from "../Allapis"
import {toast} from 'react-toastify'

const addToCart =async(e,id)=>{
    e?.stopPropagation()
    e?.preventDefault()
    const response=await fetch(summaryapi.allcartproduct.url,{
        method:summaryapi.allcartproduct.method,
        credentials:'include',
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({
            productId : id
        })
    })
    const resdata = await response.json()
if(resdata.success){
    toast.success(resdata.message)
}
if(resdata.error){
    toast.error(resdata.message)
}

return resdata


}

export default addToCart