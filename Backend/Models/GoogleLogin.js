import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GoogleuserSchema = new Schema({

    googleId: String,
    displayName: String,
    email:String,
    image:String,

},{timestamps:true});


export default mongoose.model("GoogleUser" , GoogleuserSchema);
