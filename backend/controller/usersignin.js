const usermodel = require("../models/userModels")
const becrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

async function userSignincontroller(req,res){
    try {
        const{email , password}=req.body
        if(!email){
            throw new Error("please provide email")

        }
        if(!password){
            throw new Error("please provide password")
            
        }

        const user= await usermodel.findOne({email})
        if(!user){
           throw new error("user not found") 
        }
        const checkpassword= await becrypt.compare(password,user.password)
        if(checkpassword){
           const tokendata={
            _id: user._id,
            email: user.email
           }
           const token= await jwt.sign(tokendata,process.env.secret_key,{ expiresIn:60 * 60 * 8});

           const tokenoption={
            httpOnly : true,
            secure : true
           }
           res.cookie("token",token,tokenoption).json({
            message: "login successfully",
            data:token,
            success:true,
            error:false

           })

        }else{
            throw new Error("please check your password")
        }
        
    } catch (error) {

       res.json({
        message:error.message || error,
        error:true,
        success:false
       }) 
        
    }
}

module.exports= userSignincontroller