import mongoose from "mongoose";


const movieSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true, 
    },
    description:{
        type: String,
        required: true,
    },
    releaseDate:{
        type: Date,
        required: true,
    },
    posterURL:{
        type: String,
        required: true,
    },
    InstituteName:{
        type:String,
        required: true,
    },
    featured:{
        type:Boolean,
    },
    amountRaised:{
        type: Number,
    },
    totalAmount:{
        type: Number
    },
    fundRaiserLocation: {
        type:String
    },
    fundRaiserPinCode : {
        type: String
    },
    fundraiserName:{
        type:String
    },
    fundraiserContactEmail: {
        type:String
    },
    fundraiserContactPhone: {
        type:String
    },
    ratepercentage :{
        type:String
    },
    category : {
        type: String
    },
    admin: {
        type: mongoose.Types.ObjectId,
        ref: "Admin",
        required: true
    },
    bookings:
        [{type: Object ,
        ref: "Booking",
        seatNumber: Number
    }],
        admin:{
         type: mongoose.Types.ObjectId,
         ref: "Admin",
         required: true
        }
        
})

export default mongoose.model("Movie" , movieSchema);