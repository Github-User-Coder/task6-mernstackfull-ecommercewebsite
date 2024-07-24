const cartmodel = require("../models/cartProduct")

const productsincartcontroller=async(req,res)=>{
    try {
        const currentuserid= req.userid
        const allproducts = await cartmodel.find({
            userid:currentuserid
        }).populate("productId")
        res.json({
            data:allproducts,
            message:"",
            success:true,
            error:false
        })
        
    } catch (error) {
        res.json({
            message: error.message || message,
            error:true,
            success:false
        })
        
    }
}
module.exports= productsincartcontroller