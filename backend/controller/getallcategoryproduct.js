const uploadproduct = require("../models/productmodle")

const getcategorywiseproduct=async(req,res)=>{
        try {
            const {category}= req?.body 
            const product=await uploadproduct.find({category})
           

            res.json({
                data:product,
                message:"all category",
                success:true,
                error:false
            })
            
        } catch (error) {
            res.status(400).json({
                message: error.message || error,
                error:true,
                success:false
            })
        }
}
module.exports = getcategorywiseproduct