const cartmodel = require("../models/cartProduct")

const updateAddcartcontroller=async(req,res)=>{
       try {
          const currentis= req.userid
          const addToproduct = req?.body?._id
          const qty= req.body.quantity
          const updateProduct= await cartmodel.updateOne({_id:addToproduct},{
          ...(qty &&{quantity : qty })
          })
          res.json({
            data:updateProduct,
            message:"updated",
            error:false,
            success:true
          })
       } catch (error) {
         res.json({
            message:error.message || error,
            error: true,
            success:false
         })
       }
}
module.exports=updateAddcartcontroller