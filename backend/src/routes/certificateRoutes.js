const {createCertificateRequest,
    getMyCertificateRequests,
    getAllCertificateRequests,
    updateCertificateRequestStatus}=require("../controllers/certificateController");
const {protect,authorizeRoles}=require("../middleware/authMiddleware");
const express=require("express");
const router=express.Router();
router.post("/",protect,authorizeRoles("student"),createCertificateRequest);
router.get("/my",protect,authorizeRoles("student"),getMyCertificateRequests);
router.get("/",protect,authorizeRoles("admin"),getAllCertificateRequests);
router.patch("/:id/status",protect,authorizeRoles("admin"),updateCertificateRequestStatus);
module.exports=router;