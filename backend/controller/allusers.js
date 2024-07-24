const usermodel = require("../models/userModels")

async function allUsers(req,res){
    try {
        const allusers = await usermodel.find()
        res.json({
            message: "All User",
            data:allusers,
            success:true,
            error:false
        })
    } catch (error) {
        res.json({
            message:error.message || error,
            error:true,
            success:false
        })
        
    }
}
module.exports = allUsers