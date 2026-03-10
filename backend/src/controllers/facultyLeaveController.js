const FacultyLeave = require("../models/FacultyLeave");
const sendEmail = require("../utils/sendEmail");

const createLeaveRequest = async (req, res) => {
  try {
    const { fromDate, toDate, reason } = req.body;

    if (!fromDate || !toDate || !reason) {
      return res.status(400).json({
        message: "From date, to date, and reason are required",
      });
    }

    const leaveRequest = await FacultyLeave.create({
      faculty: req.user._id,
      fromDate,
      toDate,
      reason,
    });

    return res.status(201).json({
      message: "Leave request created successfully",
      leaveRequest,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to create leave request",
      error: error.message,
    });
  }
};

const getMyLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await FacultyLeave.find({
      faculty: req.user._id,
    })
      .populate("faculty", "name email role employeeId")
      .populate("reviewedBy", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "My leave requests fetched successfully",
      count: leaveRequests.length,
      leaveRequests,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch my leave requests",
      error: error.message,
    });
  }
};

const getAllLeaveRequests = async (req, res) => {
  try {
    const leaveRequests = await FacultyLeave.find()
      .populate("faculty", "name email role employeeId department")
      .populate("reviewedBy", "name email role")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      message: "All leave requests fetched successfully",
      count: leaveRequests.length,
      leaveRequests,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to fetch leave requests",
      error: error.message,
    });
  }
};
const updateLeaveRequestStatus=async(req,res)=>{
    try{
        const {status,rejectionReason}=req.body;
        if(!status || !["approved","rejected"].includes(status)){
            return res.status(400).json({message:"Status must be either approved or rejected"});
        }
        const leaveRequest=await FacultyLeave.findById(req.params.id).populate("faculty","name email");
        if(!leaveRequest){
            return res.status(404).json({message:"Leave Request not found"});

        }
        leaveRequest.status=status;
        leaveRequest.reviewedBy=req.user._id;
        leaveRequest.reviewedAt=new Date();
        if(leaveRequest.status=="approved"){
            leaveRequest.rejectionReason=null;
            await leaveRequest.save();
            await sendEmail({
                to:leaveRequest.faculty.email,
                subject:"Faculty Leave Request Approved",
                text:`Hello ${leaveRequest.faculty.name},your leave request from ${new Date(leaveRequest.fromDate).toLocaleString()} to ${new Date(leaveRequest.toDate).toLocaleString()} has been approved `,
            });
        }
        else if(leaveRequest.status=="rejected"){
            leaveRequest.rejectionReason=rejectionReason || "No reason provided";
            await leaveRequest.save();
            await sendEmail({
                to:leaveRequest.faculty.email,
                subject:"Faculty Leave Request Rejected",
                text:`Hello ${leaveRequest.faculty.name},your leave request from ${new Date(leaveRequest.fromDate).toLocaleString()} to ${new Date(leaveRequest.toDate).toLocaleString()} has been rejected.Reason: ${leaveRequest.rejectionReason} `,
            });

        }
        return res.status(200).json({message:`Leave Request ${status} successfully`,leaveRequest});
    }catch(error){
        return res.status(500).json({message:"Failed to update leave request status",error:error.message});
    }
};
module.exports={
    createLeaveRequest,
    getMyLeaveRequests,
    getAllLeaveRequests,
    updateLeaveRequestStatus
}