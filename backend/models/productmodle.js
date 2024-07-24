const mongoose=require('mongoose')


const uploadproductmodel= new mongoose.Schema({
    productName:String,
    brandName:String,
    category:String,
    productImage:[],
    discription:String,
    price:Number,
    selling:Number
},
{
    timestamps : true
})
const uploadproduct= mongoose.model("upload",uploadproductmodel);
module.exports= uploadproduct;