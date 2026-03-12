import exp from 'express'
import UserModel from '../models/UserModel.js'
const userApp=exp.Router()

// get all users (active only)
userApp.get('/users',async (req,res)=>{
    try {
        let users=await UserModel.find({status:true})
        res.status(200).json({success:true, message:"users fetched", payload:users})
    } catch (error) {
        res.status(500).json({success:false, message:"failed to fetch users", error:error.message})
    }
})

// get single user by id
userApp.get('/users/:id',async (req,res)=>{
    try {
        let id=req.params.id
        if(!id || id.length!==24){
            return res.status(400).json({success:false, message:"invalid user id"})
        }
        let user=await UserModel.findOne({_id:id,status:true})
        if(user){
            return res.status(200).json({success:true, message:"user found", payload:user})
        }
        return res.status(404).json({success:false, message:"user not found"})
    } catch (error) {
        res.status(500).json({success:false, message:"error fetching user", error:error.message})
    }
})

// create user
userApp.post('/users',async (req,res)=>{
    try {
        let userObj=req.body
        
        // validation
        if(!userObj.name || !userObj.email || !userObj.age || !userObj.phone || !userObj.DOB) {
            return res.status(400).json({success:false, message:"all fields are required"})
        }
        
        if(userObj.name.length < 3) {
            return res.status(400).json({success:false, message:"name must be at least 3 characters"})
        }
        
        if(userObj.phone.toString().length !== 10) {
            return res.status(400).json({success:false, message:"phone must be 10 digits"})
        }
        
        // check if email already exists
        const existingUser = await UserModel.findOne({email: userObj.email})
        if(existingUser) {
            return res.status(409).json({success:false, message:"email already exists"})
        }
        
        const userDoc=new UserModel(userObj)
        await userDoc.save()
        res.status(201).json({success:true, message:"user created", payload:userDoc})
    } catch (error) {
        if(error.code === 11000) {
            return res.status(409).json({success:false, message:"email already exists"})
        }
        res.status(500).json({success:false, message:"error creating user", error:error.message})
    }
})

// update user
userApp.put('/users/:id',async (req,res)=>{
    try {
        let id=req.params.id
        let updateObj=req.body
        
        if(!id || id.length!==24){
            return res.status(400).json({success:false, message:"invalid user id"})
        }
        
        if(!updateObj.name || !updateObj.email || !updateObj.age || !updateObj.phone || !updateObj.DOB) {
            return res.status(400).json({success:false, message:"all fields are required"})
        }
        
        if(updateObj.name.length < 3) {
            return res.status(400).json({success:false, message:"name must be at least 3 characters"})
        }
        
        if(updateObj.phone.toString().length !== 10) {
            return res.status(400).json({success:false, message:"phone must be 10 digits"})
        }
        
        let user=await UserModel.findOneAndUpdate({_id:id,status:true},updateObj,{returnDocument: 'after'})
        if(user){
            return res.status(200).json({success:true, message:"user updated", payload:user})
        }
        return res.status(404).json({success:false, message:"user not found"})
    } catch (error) {
        res.status(500).json({success:false, message:"error updating user", error:error.message})
    }
})

// soft delete user (deactivate)
userApp.delete('/users/:id',async (req,res)=>{
    try {
        let id=req.params.id
        if(!id || id.length!==24){
            return res.status(400).json({success:false, message:"invalid user id"})
        }
        let user=await UserModel.findOneAndUpdate({_id:id},{status:false},{returnDocument: 'after'})
        if(user){
            return res.status(200).json({success:true, message:"user deleted"})
        }
        return res.status(404).json({success:false, message:"user not found"})
    } catch (error) {
        res.status(500).json({success:false, message:"error deleting user", error:error.message})
    }
})

// activate/restore user
userApp.patch('/users/:id',async (req,res)=>{
    try {
        let id=req.params.id
        if(!id || id.length!==24){
            return res.status(400).json({success:false, message:"invalid user id"})
        }
        let user=await UserModel.findOneAndUpdate({_id:id},{status:true},{returnDocument: 'after'})
        if(user){
            return res.status(200).json({success:true, message:"user activated", payload:user})
        }
        return res.status(404).json({success:false, message:"user not found"})
    } catch (error) {
        res.status(500).json({success:false, message:"error activating user", error:error.message})
    }
})

// get all users including inactive
userApp.get('/all-users',async (req,res)=>{
    try {
        let users=await UserModel.find({})
        res.status(200).json({success:true, message:"all users fetched", payload:users})
    } catch (error) {
        res.status(500).json({success:false, message:"failed to fetch users", error:error.message})
    }
})

export default userApp