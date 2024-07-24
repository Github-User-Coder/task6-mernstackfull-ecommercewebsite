const Mongoose = require("mongoose")
const dotenv= require("dotenv")


async function connectdb(){
    try {

        Mongoose.connect(process.env.MONGO_urI)
        console.log("mongo db connected")
    } catch (error) {
        console.log(error)
    
    }
}
module.exports = connectdb;