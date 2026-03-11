const Event=require("../models/Event");
const EventRequest=require("../models/EventRequest");
const createEvent=async(req,res)=>{
    try{
        const {title,description,eventDate,venue,audience,relatedRequest}=req.body;
        if(!title || !description || !eventDate || !venue || !audience ||audience.length===0){
            return res.status(400).json({message:"Title,decription,eventdate,venue, and audience are required"});
        }
        if(relatedRequest){
            const eventRequest=await EventRequest.findById(relatedRequest);
            if(!eventRequest){
                return res.status(404).json({message:"Related event request not found"});
            }
        };
        const event=await Event.create({
            title,
            description,
            eventDate,
            venue,
            audience,
            createdBy:req.user._id,
            relatedRequest:relatedRequest||null,

        });
        return res.status(201).json({
            message:"Event Created successfully",
            event
        });
    }catch(error){
        return res.status(500).json({message:"Failed to create Event",error:error.message});
    }
};
const getAllEvents=async(req,res)=>{
    try{
        const events=await Event.find().populate("createdBy", "name email role").populate("relatedRequest","title status requestedByRole").sort({eventDate:1});
        return res.status(200).json({message:"All events fetched successfully",count:events.length,events});
    }catch(error){
        return res.status(500).json({message:"Failed to fetch events",error:error.message});
    }

};
const getUpcomingEvents=async(req,res)=>{
    try{
        const today=new Date();
        let query={
            eventDate:{$gte:today},
        };
        if(req.user.role==="student"||req.user.role==="faculty"){
            query.audience=req.user.role;
        };
        const events=await Event.find(query).populate("createdBy","name email role").sort({eventDate:1});
        return res.status(200).json({message:"Upcoming events fetched successfully",count:events.length,events});
    }catch(error){
        return res.status(500).json({
            message:"Failed to fetch upcoming events",
            error:error.message,
        })
    }
};
const updateEvent=async(req,res)=>{
    try{
        const {title,description,eventDate,venue,audience}=req.body;
        const event=await Event.findById(req.params.id);
        if(!event){
            return res.status(404).json({message:"Event not found"});
        }
        if(title) event.title=title;
        if(description) event.description=description;
        if(eventDate) event.eventDate=eventDate;
        if(venue) event.venue=venue;
        if(audience) event.audience=audience;
        await event.save();
        return res.status(200).json({message:"Event updated successfully",event});
    }catch(error){
        return res.status(500).json({message:"Failed to update event",error:error.message});
    }
};
const deleteEvent=async (req,res)=>{
    try{
        const event=await Event.findById(req.params.id);
        if(!event){
            return res.status(404).json({message:"Event not found"});
        }
        await event.deleteOne();
        return res.status(200).json({message:"Event deleted successfully"});

    }catch(error){
        return res.status(200).json({message:"Failed to delete event",error:error.message});
    }
};
module.exports={
    createEvent,
    getAllEvents,
    getUpcomingEvents,
    updateEvent,
    deleteEvent
};