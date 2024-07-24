// const {default: summaryapi}  = require("../Allapis")

import summaryapi from "../Allapis"

const fetchallcategoryproducts=async(category)=>{
         const response= await fetch(summaryapi.getallcategory.url,{
            method:summaryapi.getallcategory.method,
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                category:category
            })
         })
         const resdata= await response.json()
         return resdata
}
export default fetchallcategoryproducts