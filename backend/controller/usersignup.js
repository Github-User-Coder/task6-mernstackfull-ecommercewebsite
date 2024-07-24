const usermodel = require("../models/userModels")
const becrypt=require('bcryptjs')

async function userSignupcontroller(req,res){
    try { 
        const{name ,email,password}=req.body
        
        const user =await usermodel.findOne({email})
            if(user){
                throw new Error("Email is already exist")

            }
        
        
        if(!name){
            throw new Error('please provide name')
        }

        if(!email){
            throw new Error('please provide email')
        }
        if(!password){
            throw new Error('please provide password')
        }
        const salt= becrypt.genSaltSync(10);
        const hashPassword= await becrypt.hashSync(password,salt);

        if(!hashPassword){
            throw new Error("some thing went wrong!!");
        }
        const payload={
            ...req.body,
            role:'GENERAL',
            password:hashPassword
        }
        const userData= new usermodel(payload)
        const saveuserdata= await userData.save();

        res.status(201).json({
            data:saveuserdata,
            success:true,
            error:false,
            message:"user created successfull"
        })




    } catch (error) {
        res.json({
            message:error.message || error,
            error:true,
            success:false,
        })
        
    }
}
module.exports = userSignupcontroller