import exp from 'express'
import mongoose from 'mongoose'
import { config } from 'dotenv'
import userApp from './APIs/UserApi.js'
import cors from 'cors'
config()
const app=exp()
app.use(cors({
    origin:"http://localhost:5173"
}))
const port=process.env.port || 4000
const connectDB= async ()=>{
    try{
        await mongoose.connect(process.env.db_url)
        console.log("DB connected")
        app.listen(port,()=>{
            console.log("server started on port",port)
        })
    }
    catch(e){
        console.log("failed to connect db:",e.message)
        process.exit(1)
    }    
}
connectDB()
app.use(exp.json())
app.use('/user-api',userApp)


//error handling middleware
app.use((err,req,res,next)=>{
   if(err.name==="ValidationError"){
    return res.status(400).json({message:"validation failed"})
   }
   if(err.name==="CastError"){
    return res.status(400).json({message:"invalid id"})
   }
    if(err.code===11000){
        return res.status(409).json({message:"duplicate key error"})
    }
    res.status(500).json({message:"internal server error"})
})