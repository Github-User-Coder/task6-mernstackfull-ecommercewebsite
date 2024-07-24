const uploadproduct = require("../models/productmodle")

const getProductdetailscontoller=async(req,res)=>{
    try {
        const { productid }=req.body
        
        const product= await uploadproduct.findById(productid)
        
        res.json({
            data:product,
            message:"product details",
            success:true,
            error:false
        })
        
    } catch (error) {
        res.status(400).json({
            message:error?.message || message,
            error:true,
            success:false
        })
        
    }
}
module.exports=getProductdetailscontoller