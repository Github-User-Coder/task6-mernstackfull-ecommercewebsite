const uploadproduct = require("../models/productmodle")

const gellallProductscontroller=async(req,res)=>{
    try {
         const getProducts= await uploadproduct.find().sort({ createdAt : -1 })
         res.json({
            message:"all product",
            success:true,
            error:false,
            data:getProducts
         })
    } catch (error) {
        res.jon({
            message: error.message || error,
            error:true,
            success:false
        })
        
    }
}
module.exports=gellallProductscontroller