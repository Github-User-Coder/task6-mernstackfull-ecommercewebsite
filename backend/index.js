const express= require("express")
const cors= require('cors')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const connectdb=require('./config/db')
const router=require('./Routes')


const app=express()
app.use(cors({
    origin : process.env.FRONTEND_URI,
    credentials:true
}))
app.use(express.json())
app.use(cookieParser())
app.use("/api",router)


const port=process.env.PORT || 8080
connectdb().then(()=>{
    app.listen(port,()=>{
        console.log(`server running ${port}`)
    })

})
