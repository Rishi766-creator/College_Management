const Notice=require("../models/Notice");
const createNotice=async (req,res)=>{
    try{
    const {title,description,audience}=req.body;
    if(!title || !description || !audience || audience.length==0){
        res.status(400).json({message:"Title,Description and Audience are required"});
    };
    const notice=await Notice.create({
        title,
        description,
        audience,
        createdBy:req.user._id
    });
    res.status(201).json({message:"Notice created successfully",notice});
    }catch(error){
        res.status(500).json({message:"Failed to create notice",error:error.message});

    }

};
const getNotices=async (req,res)=>{
    try{
        let query={};
        if(req.user.role==="student"||req.user.role==="faculty"){
            query.audience=req.user.role;
        }
        const notices=await Notice.find(
            query
        ).populate("createdBy","name email role").sort({createdAt:-1});
        res.status(200).json({message:"Notices fetched successfully",count:notices.length,notices});

    }
    catch(error){
        res.status(500).json({
            message:"Failed to fetch notices",
            error:error.message
        });
    }
};
module.exports={createNotice,getNotices};