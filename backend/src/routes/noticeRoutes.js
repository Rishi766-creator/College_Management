const {protect,authorizeRoles}=require("../middleware/authMiddleware");
const express=require("express");
const router=express.Router();
const {createNotice,getNotices}=require("../controllers/noticeController");
router.post("/",protect,authorizeRoles("admin"),createNotice);
router.get("/",protect,authorizeRoles("student","faculty","admin"),getNotices);
module.exports=router;