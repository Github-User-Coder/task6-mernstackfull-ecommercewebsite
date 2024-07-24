const cartmodel = require("../models/cartProduct")

const addtocartcontroller =async(req,res)=>{
    try {
        const {productId}=req?.body
        const currentuserId= req.userid
        const isproductisavailable = await cartmodel.findOne({ productId })
        if(isproductisavailable){
             return res.json({
                message:"Product already exist in Cart",
                success:false,
                error:true
             })
        }
        const payload={
            productId:productId,
            quantity: 1,
            userid:currentuserId
        }
        const newproductisavailable = new cartmodel(payload)
        const saveProduct= await newproductisavailable.save()

        return res.json({
            data:saveProduct,
            message:"product added to Cart",
            success:true,
            error:false
            
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error:true,
            success:false
        })
        
    }

}
module.exports = addtocartcontroller