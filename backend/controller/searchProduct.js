const uploadproduct = require("../models/productmodle")

const searchProductcontroller=async(req,res)=>{
    try {
        const query = req.query.q

        const regex= new RegExp(query,'i','g')

        const product = await uploadproduct.find({
            "$or":[
                {
                    productName:regex
                },
                {
                    category:regex
                }
            ]
        })
        res.json({
            data:product,
            message:"search",
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
module.exports=searchProductcontroller