import User from "../Models/User";
import bcrypt from 'bcryptjs';
import Bookings from "../Models/Bookings";

export const getAllusers = async(req , res, next) =>{

let users;
try {
users = await User.find();

} catch (error) {
    return next(err);
}
if(!users){
    return res.status(500).json({message: "Unknown Error found"})
}
return res.status(200).json({users});
}


export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;
    console.log(req.body);
    // Check if name, email, or password is undefined, null, or empty after trimming
    if (!name || name.trim() === "" && !email || email.trim() === "" && !password || password.trim() === "") {
        return res.status(422).json({ message: "Invalid Data" });
    }

    let user;
    const hashedPassword = bcrypt.hashSync(password);
    try {
        user = new User({ name, email, password:hashedPassword });
        user = await user.save();
    } catch (error) {
        return console.log(error, error.message);
    }

    if (!user) {
        return res.status(500).json({ message: "Unexpected error occurred" });
    }

    res.status(201).json({ id: user._id});
};
export const updateUser  = async(req , res , next) => {
    const id  = req.params.id;
    const { name, email, password } = req.body;
    console.log(req.body);
    // Check if name, email, or password is undefined, null, or empty after trimming
    if (!name || name.trim() === "" && !email || email.trim() === "" && !password || password.trim() === "") {
        return res.status(422).json({ message: "Invalid Data" });
    }

    let user ;
    const hashedPassword = bcrypt.hashSync(password);
    try {
        user = await User.findByIdAndUpdate(id, {name , email , password:hashedPassword})
    } catch (error) {
        return console.log(error.message);
    }
    if(!user){
        return res.status(500).json({message: "Something went wrong"});
    }
    res.status(200).json({message:"User Data Updated Successfully"})
}


export const deleteUser = async(req , res , next) => {
    const id = req.params.id;
    const { name, email, password } = req.body;
    let user;
    try {
        user = await User.findByIdAndDelete(id , {name , email , password});
    } catch (error) {
        return console.log(error.message);
    }
    if(!user){
        return res.status(500).json({message: "User not found"});
    }
    res.status(200).json({message:"User Deleted Successfully"})
}

export const userLogin = async(req, res , next) => {
    const {email , password} = req.body;
    let user;
    if (!email || email.trim() === "" && !password || password.trim() === "") {
        return res.status(422).json({ message: "Invalid Data" });
    }
    let existingUser;
    try {
        existingUser = await User.findOne({email })
    } catch (error) {
        return console.log(error.message);  
    }
    if(!existingUser){
        return res.status(404).json({message: "Unable to find this user"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswordCorrect) {
        return res.status(400).json({message: "Password is Incorrect"});
    }
    return res.status(201).json({message: "Login Successfull" , id:existingUser._id , name: existingUser.name});
}
export const getBookingsOfUser = async(req,res,next)=>{
    const id = req.params.id;
    let bookings;
    try {
      bookings = await Bookings.find({user:id});
  
    } catch (error) {
      return console.log(error);
    }
    if(!bookings){
      return res.status(500).json({message:"Unable to get user Bookings"});
    }
    res.status(200).json({message: "Fetched User Bookings" , bookings});
  }