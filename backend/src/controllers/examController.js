const Exam=require("../models/Exam");
const createExam=async(req,res)=>{
    try{
        const {
            subject,
            examDate,
            startTime,
            endTime,
            venue,
            semester,
            section,
            department,
        }=req.body;
        if(!subject||!examDate||!startTime||!endTime||!venue||!semester||!section||!department){
            return res.status(400).json({message:"All required exam fields must be provided"});

        };
        const exam=await Exam.create({
            subject,
            examDate,
            startTime,
            endTime,
            venue,
            semester,
            section,
            department,
            createdBy:req.user._id,
        });
        return res.status(201).json({message:"Exam scheduled successfully",exam});
    }catch{
        res.status(500).json({message:"Failed to schedule exam",error:error.message});
    }
};
const getAllExams=async(req,res)=>{
    try{
        const exams=await Exam.find().populate("createdBy","name email role").sort({examDate:1});
        return res.status(200).json({message:"All exams fetched successfully",count:exams.length,exams});
        
    }catch(error){
        return res.status(500).json({message:"Failed to fetch exams",error:error.message});
    }

};
const getUpcomingExams=async(req,res)=>{
    try{
        const today=new Date();
        const query={
            examDate:{$gte:today},
        };
        if(req.user.role==="student"){
            if(req.user.semester){
                query.semester=req.user.semester;
            }
            
            
            if(req.user.department){
                query.department=req.user.department;

            }
            if(req.user.section){
                query.$or=[{section:req.user.section},{section:null}];
            }
        }
        const exams=await Exam.find(query).populate("createdBy" ,"name email role").sort({examDate:1});
        return res.status(200).json({message:"Upcoming Exams fetched successfully",count:exams.length,exams});

    }catch(error){
        return res.status(500).json({messae:"Failed to fetch upcoming exams",error:error.message}); 
    }
};
const updateExam=async(req,res)=>{
    try{
        const {
            subject,
            examDate,
            startTime,
            endTime,
            venue,
            semester,
            section,
            department
        }=req.body;
        const exam=await Exam.findById(req.params.id);
        if(!exam){
            return res.status(404).json({message:"Exam not found"});
        }
        if(subject) exam.subject=subject;
        if(examDate) exam.examDate=examDate;
        if(startTime) exam.startTime=startTime;
        if(endTime) exam.endTime=endTime;
        if(venue) exam.venue=venue;
        if(semester) exam.semester=semester;
        if(section!==undefined) exam.section=section;
        if(department) exam.department=department;
        await exam.save();
        return res.status(200).json({message:"Exam updated successfully",exam});
    }catch(error){
        return res.status(500).json({message:"Failed to update exam",error:error.message});
    }
};
const deleteExam=async(req,res)=>{
    try{
        const exam=await Exam.findById(req.params.id);
        if(!exam){
            return res.status(404).json({message:"Exam not found"});
        };
        await exam.deleteOne();
        return res.status(200).json({message:"Exam deleted successfully"});
    }catch(error){
        return res.status(500).json({message:"Failed to delete exam",error:error.message});
    }
};
module.exports={
    createExam,
    getAllExams,
    getUpcomingExams,
    updateExam,
    deleteExam

};