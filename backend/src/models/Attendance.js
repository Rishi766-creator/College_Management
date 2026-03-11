const { default: mongoose } = require("mongoose");
const mongose=require("mongoose");
const attendanceSchema=new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    faculty:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    subject:{
        type:String,
        required:true,
        trim:true
    },
    date:{
        type:Date,
        required:true,
    },
    status:{
        type:String,
        enum:["present","absent"],
        required:true,
    },
    semester:{
        type:Number,
        require:true,
    },
    section:{
        type:String,
        required:true,
        trim:true
    },
    department:{
        type:String,
        requird:true,
        trim:true
    },

},{timestamps:true});
module.exports=mongoose.model("Attendance",attendanceSchema);
