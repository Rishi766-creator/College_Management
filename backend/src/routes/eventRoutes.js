const express=require("express");
const {
    createEvent,
    getAllEvents,
    getUpcomingEvents,
    updateEvent,
    deleteEvent
}=require("../controllers/eventController");
const {protect,authorizeRoles}=require("../middleware/authMiddleware");
const router=express.Router();
router.post("/",protect,authorizeRoles("admin"),createEvent);
router.get("/",protect,authorizeRoles("admin"),getAllEvents);
router.get("/upcoming",protect,authorizeRoles("student","faculty","admin"),getUpcomingEvents);
router.put("/:id",protect,authorizeRoles("admin"),updateEvent);
router.delete("/:id",protect,authorizeRoles("admin"),deleteEvent);
module.exports=router;