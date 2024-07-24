const cartmodel = require("../models/cartProduct")

const countaddtocartcontroller=async(req,res)=>{
    try {
        const userId= req.userid
        const count= await cartmodel.countDocuments({
            userid:userId
        })
        res.json({
            data:{
                count:count
            },
            message:"ok",
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
module.exports = countaddtocartcontroller