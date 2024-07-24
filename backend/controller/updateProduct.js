const uploadproductpermission = require("../helper/permission")
const uploadproduct = require("../models/productmodle")

async function updateProductcontroller(req,res){
    try {
        if(!uploadproductpermission(req.userid)){
            throw new error("permission denied")
        }
        const { _id, ...resBody}= req.body
           const updateProduct = await uploadproduct.findByIdAndUpdate(_id,resBody)
           res.json({
            message:"product update successfully",
            data:updateProduct,
            success:true,
            error:false
           })
    } catch (error) {
        res.status(400).json({
            message:error.message || message,
            error: true,
            success: false
        })
        
    }
}
module.exports = updateProductcontroller