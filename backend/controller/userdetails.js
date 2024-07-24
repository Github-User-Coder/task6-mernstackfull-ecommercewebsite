const usermodel = require("../models/userModels")


async function usrerDetailscontroller(req,res){
    try {
        const user = await usermodel.findById(req.userid)
        res.json({
            data:user,
            error:false,
            success:true,
            message:"user login details"
        })
        
    } catch (error) {
        res.status(400).json({
            message:error.message ||error,
            error:true,
            success:false
        })
        
    }
}
module.exports = usrerDetailscontroller;