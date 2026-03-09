const express=require("express");
const dotenv=require("dotenv");
const authRoutes=require("./routes/authRoutes");
const noticeRoutes=require("./routes/noticeRoutes");
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
const PORT=process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})