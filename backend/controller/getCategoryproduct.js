const uploadproduct = require("../models/productmodle")

const getcategoryprojectcontroller=async(req,res)=>{
    try {
        const product = await uploadproduct.distinct("category")
        const productbycategory=[]
        for(const category of product){
            const products =await uploadproduct.findOne({category})
            if(products){
                productbycategory.push(products)
            }
        }

        res.json({
            message:"category products",
            data:productbycategory,
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
module.exports = getcategoryprojectcontroller