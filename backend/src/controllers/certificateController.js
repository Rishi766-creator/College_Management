const CertificateRequest=require("../models/CertificateRequest");
const User=require("../models/User");
const sendEmail=require("../utils/sendEmail");
const createCertificateRequest=async (req,res)=>{
    try{
    const {certificateType,reason}=req.body;
    if(!certificateType || !reason){
        return res.status(400).json({message:"Certificate type and reason are required"});
    }
    const request=await CertificateRequest.create({
        student:req.user._id,
        certificateType,
        reason,
    });
    return res.status(201).json({message:"Certificate Request created successfully"});
    }catch(error){
        return res.status(500).json({message:"Failed to create certificate request",error:error.message});
    }


};
const getMyCertificateRequests=async (req,res)=>{
    try{
        const requests=await CertificateRequest.find({
            student:req.user._id
        }).populate("student","name email role").sort({createdAt:-1});
        return res.status(200).json({message:"My certficate request fetched successfully",count:requests.length,requests});

    }catch(error){
        return res.status(500).json({message:"Failed to fetch my certificates requests",error:error.message});
    }
}
const getAllCertificateRequests=async(req,res)=>{
    try{
        const requests=await CertificateRequest.find().populate("student","name email role").sort({createdAt:-1});
        return res.status(200).json({message:"All Certificate Requests fetched successfully",count:requests.length,requests});

    }catch(error){
        return res.status(500).json({message:"Failed to fetch certificate requests",error:error.message});
    }
};
const updateCertificateRequestStatus=async(req,res)=>{
    try{
        const {status,collectionOffice,collectionDate,rejectionReason}=req.body;
        if(!status || !["approved","rejected"].includes(status)){
            return res.status(400).json({message:"Status must be either approved or rejected"});
        }
        const request=await CertificateRequest.findById(req.params.id).populate("student","name email ");
        if(!request){
            return res.status(404).json({message:"Certificate request not found"});
        }
        request.status=status;
        request.reviewedBy=req.user._id;
        request.reviewedAt=new Date();
        if(status=="approved"){
            if(!collectionOffice || !collectionDate){
                return res.status(400).json({message:"Collection Office and Collection dates are required for approval"});
            }
        
        request.collectionOffice=collectionOffice;
        request.collectionDate=collectionDate;
        request.rejectionReason=null;

        await request.save();
        await sendEmail({
            to:request.student.email,
            subject:"Certificate Request Approved",
            text:`Hello ${request.student.name},your ${request.certificateType} request has been approved.Please collect it from ${collectionOffice} on ${new Date(collectionDate).toLocaleString()}`
        });
        };
        if(status=="rejected"){
            request.rejectionReason=rejectionReason||"No reason provided";
            request.collectionOffice=null;
            request.collectionDate=null;
            await request.save();
            await sendEmail({
                to:request.student.email,
                subject:"Certificate Request Rejected",
                text:`Hello ${request.student.name},your ${request.certificateType} request has been rejected.Reason:${request.rejectionReason}`,
            });
        }
        return res.status(200).json({message:`Certificate request ${status} successfully`});
    }

    catch(error){
        return res.status(500).json({message:"Failed to update certificate request status",error:error.message});
    }
};
module.exports={createCertificateRequest,getMyCertificateRequests,getAllCertificateRequests,updateCertificateRequestStatus};