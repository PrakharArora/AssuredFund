import mongoose from "mongoose";

const Schema = mongoose.Schema;
const adminSchema = new Schema({
      email: {
        type: String,
        unique: true,
        required: true,
      },
      password: {
        type: String,
        mindLength: 6,
      },
      addedMovies: [{
        type: mongoose.Types.ObjectId,
        ref:"Movies"
      }]
})

export default mongoose.model("Admin" , adminSchema);