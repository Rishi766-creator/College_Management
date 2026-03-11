const express=require("express");
const router=express.Router();
const {protect,authorizeRoles}=require("../middleware/authMiddleware");
const {
    createExam,
        getAllExams,
        getUpcomingExams,
        updateExam,
        deleteExam
    
}=require("../controllers/examController");
router.post("/",protect,authorizeRoles("admin"),createExam);
router.get("/",protect,authorizeRoles("admin"),getAllExams);
router.get("/upcoming",protect,authorizeRoles("admin","student","faculty"),getUpcomingExams);
router.put("/:id",protect,authorizeRoles("admin"),updateExam);
router.delete("/:id",protect,authorizeRoles("admin"),deleteExam);
module.exports=router;
