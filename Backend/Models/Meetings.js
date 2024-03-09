import mongoose from "mongoose";


const meetingSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Types.ObjectId,
        ref:"Movie",
    },
    name:{
        type: String,
        required:true
    },
    date:{
        type: Date,
        required:true
    },
    email:{
      type: String,
      required: true
    },
    // user:{
    //     type:mongoose.Types.ObjectId,
    //     ref:"User",
    //     required: true
    // }
})

export default mongoose.model("Meetings" , meetingSchema);