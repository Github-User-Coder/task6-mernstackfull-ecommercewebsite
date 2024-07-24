const usermodel = require("../models/userModels")

async function updateUser(req,res){
    try {
         const sessionUser= req.userId

        const{userId,email,name,role}=req.body
        const payload ={
            ...( email &&{email : email}),
            ...( name &&{name : name}),
            ...( role &&{role : role})

        }
        const user = await usermodel.findById(sessionUser)



        const update =await usermodel.findByIdAndUpdate(userId,payload)
        res.json({
            data:update,
            message:"user updated",
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
module.exports = updateUser