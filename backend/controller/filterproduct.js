const uploadproduct = require("../models/productmodle")

const filterproductcontroller=async(req,res)=>{
    try {
        const categorylist= req?.body?.category || []
        

        const product= await uploadproduct.find({
            category :{
                "$in": categorylist
            }
        })

        res.json({
            data:product,
            message:"category product",
            error:false,
            success:true
        })

    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success:false
        })
        
    }
}
module.exports = filterproductcontroller