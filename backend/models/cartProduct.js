const mongoose=require('mongoose')


const Cartproductmodel= new mongoose.Schema({
productId:{
   ref:'upload',
   type : String ,
},
quantity: Number,
userid:String
},
{
    timestamps : true
})
const cartmodel= mongoose.model("AddtoCart",Cartproductmodel);
module.exports= cartmodel;