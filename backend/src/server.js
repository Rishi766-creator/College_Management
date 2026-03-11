const express=require("express");
const dotenv=require("dotenv");
const authRoutes=require("./routes/authRoutes");
const noticeRoutes=require("./routes/noticeRoutes");
const certificateRoutes=require("./routes/certificateRoutes");
const facultyLeaveRoutes=require("./routes/facultyLeaveRoutes");
const eventRequestRoutes = require("./routes/eventRequestRoutes");
const examRoutes=require("./routes/examRoutes");
const eventRoutes=require("./routes/eventRoutes");
const cors=require("cors");
const connectDB=require("./config/db");
dotenv.config();
connectDB();
const app=express();
app.use(cors());
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("College Management backend is running");
});
app.use("/api/auth",authRoutes);
app.use("/api/notices",noticeRoutes);
app.use("/api/certificates",certificateRoutes);
app.use("/api/faculty-leaves",facultyLeaveRoutes);
app.use("/api/event-requests", eventRequestRoutes);
app.use("/api/exams",examRoutes);
app.use("/api/events",eventRoutes);
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})