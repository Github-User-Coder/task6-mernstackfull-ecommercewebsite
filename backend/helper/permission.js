const usermodel = require("../models/userModels")

const uploadproductpermission= async(userId)=>{
    const user= await usermodel.findById(userId)
    if(user.role!='ADMIN'){
        return false
    }
    return true
}
module.exports=uploadproductpermission