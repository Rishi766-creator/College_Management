const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const generateToken=(userId)=>{
    return jwt.sign({id:userId},process.env.JWT_SECRET,{expiresIn:"7d"});
};
const registerUser=async (req,res)=>{
    try{
        const {
            name,
            email,
            password,
            role,
            department,
            semester,
            section,
            parentEmail,
            employeeId,
            studentId,
        }=req.body;
        if(!name || !email || !password || !role){
            return res.status(400).json({message:"Please provide all required fields"});
        }
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            role,
            department,
            semester,
            section,
            parentEmail,
            employeeId,
            studentId,
            
        });
        res.status(201).json({message:"User registered successfully",
            token:generateToken(user._id),
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role,
            }

        });
    }catch(error){
        return res.status(500).json({message:"Registration failed",error:error.message});
    }
};
const loginUser=async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(400).json({message:"PLease provide email and password"});
        };
        const user=await User.findOne({email});
        if(!user){
            return res.status(401).json({message:"Invalid credentials"});
        }
        const isPasswordMatch=await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(401).json({message:"Invalid credentials"});
        };
        res.status(200).json({
            message:"Login successful",
            token:generateToken(user._id),
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
                role:user.role
            }
        })
    }catch(error){
        res.status(500).json({message:"Login failed",
            error:error.message,
        })
    }
};
module.exports={registerUser,loginUser};