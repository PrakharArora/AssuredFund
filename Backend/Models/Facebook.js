import mongoose from 'mongoose';

const FacebookSchema = new mongoose.Schema({
    facebookId: String,
    displayName: String,
    email: String,
    picture: String
}, { timestamps: true });

const Facebook = mongoose.model('Facebook', FacebookSchema);

export default Facebook;