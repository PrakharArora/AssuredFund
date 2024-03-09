import Admin from '../Models/Admin';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const addAdmin = async(req , res , next) => {
    const {email , password} = req.body;
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({email})
    } catch (error) {
        return console.log(error.message);
    }
    if(existingAdmin){
        return res.status(400).json({messgae: "Admin already exist"})
    }
    let admin;
    const hashpassword = bcrypt.hashSync(password);
    try {
        admin = new Admin({email , password: hashpassword});
        admin = await admin.save();
    } catch (error) {
        console.log(500).json({message:"Error Saving Admin Data"});
    }
    return res.status(201).json({message: "Admin Details Saved" , admin});
}


export const adminLogin = async(req, res , next) => {
    const {email , password} = req.body;
    let admin;
    if (!email || email.trim() === "" && !password || password.trim() === "") {
        return res.status(422).json({ message: "Invalid Data" });
    }
    let existingAdmin;
    try {
        existingAdmin = await Admin.findOne({email })
    } catch (error) {
        return console.log(error.message);  
    }
    if(!existingAdmin){
        return res.status(404).json({message: "Unable to find this user"});
    }
    const isPasswordCorrect = bcrypt.compareSync(password, existingAdmin.password);
    if(!isPasswordCorrect) {
        return res.status(400).json({message: "Password is Incorrect"});
    }

    const token = jwt.sign({id: existingAdmin._id} , "MYSECRECTKEY",{
        expiresIn: "7d",

    });
    return res.status(201).json({message: "Admin Login Successfull" , token,id:existingAdmin._id});
}

export const allAdmins = async(req, res, next) => {
    let admins;
    try{
        admins = await Admin.find();
    }
    catch(error){
       return next(error);
    }
    if(!admins){
        return res.status(500).json({messgae: "Admins not found"});
    }
    return res.status(200).json({messgae: "admins found" , admins});

}