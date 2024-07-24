const cartmodel = require("../models/cartProduct")

const deleteaddtocart =async(req,res)=>{
    try {
        const currentid=req.userid
        const addtocartproduct=req?.body?._id
        const deleteproduct =await cartmodel.deleteOne({_id :addtocartproduct})
        res.json({
            data:deleteproduct,
            message:"deleted from cart",
            error:false,
            success:true
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error:true,
            success:false
        })
        
    }

}
module.exports=deleteaddtocart