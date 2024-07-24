const uploadproductpermission = require("../helper/permission")
const uploadproduct = require("../models/productmodle")

async function Uploadproductcontroller(req,res){
    try {
        const sessionuserid= req.userid
        if(!uploadproductpermission(sessionuserid)){
            throw new error("permission denied")
        }
        const uploadproducts= new uploadproduct(req.body)
        const saveuploadproducts= await uploadproducts.save()

        res.status(200).json({
            message:"product uploads are successfully saved",
            success:true,
            error:false,
            data:saveuploadproducts
        })
    } catch (error) {
        res.status(400).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
}

module.exports=Uploadproductcontroller