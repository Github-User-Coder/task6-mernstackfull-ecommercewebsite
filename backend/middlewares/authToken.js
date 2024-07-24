const jwt= require('jsonwebtoken')
async function authToken(req,res,next){
    try {
        
        const token = req.cookies?.token 
        
        if(!token){
            return res.json({
                message:"Please login",
                error:true,
                success:false
            })
        }
        jwt.verify(token,process.env.secret_key,function(error,decoded){
            if(error){
                console.log("error",error)
            }
            req.userid= decoded?._id
            next()

        })
        
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            data:[],
            error:true,
            success: false
        })
        
    }
}
module.exports= authToken;