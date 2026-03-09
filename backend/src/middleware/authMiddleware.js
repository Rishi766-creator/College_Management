const jwt=require("jsonwebtoken");
const User=require("../models/User");
const protect=async(req,res,next)=>{
    try{
        let token;
        const authHeader=req.headers.authorization;
        if(authHeader && authHeader.startsWith("Bearer ")){
            token=authHeader.split(" ")[1];
        }
        if(!token){
            return res.status(401).json({message:"Not authorized,no token provided"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        const user=await User.findById(decoded.id).select("-password");
        if(!user){
            return res.status(401).json({message:"User not found"});
        }
        req.user=user;
        next();
    }catch(error){
        return res.status(401).json({message:"Invalid token",error:error.message});
    }

}
const authorizeRoles=(...roles)=>{
    return (req,res,next)=>{
        if(!req.user){
            return res.status(401).json({message:"Not authorized"});
        }
        if(!roles.includes(req.user.role)){
            return res.status(403).json({message:"Access denied"});

        }
        next();
    };
};
module.exports={
    protect,authorizeRoles
};