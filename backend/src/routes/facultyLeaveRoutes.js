const express=require("express");
const router=express.Router();
const {createLeaveRequest,getMyLeaveRequests,getAllLeaveRequests,updateLeaveRequestStatus}=require("../controllers/facultyLeaveController");
const {protect,authorizeRoles}=require("../middleware/authMiddleware");
router.post("/",protect,authorizeRoles("faculty"),createLeaveRequest);
router.get("/my",protect,authorizeRoles("faculty"),getMyLeaveRequests);
router.get("/",protect,authorizeRoles("admin"),getAllLeaveRequests);
router.patch("/:id/status",protect,authorizeRoles("admin"),updateLeaveRequestStatus);
module.exports=router;