import nodemailer from "nodemailer"
import Meetings from "../Models/Meetings";
export const sendEmail = async (req , res) => {

    const {name , email , date} = req.body;
    console.log({
        name ,
        email ,
        date
    });
    
    try {
        let meeting;
        meeting = new Meetings({ name, email, date });
        meeting = await meeting.save();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user:"helpindiagrow1@gmail.com",
                pass:"shet ozgv lfsc bsya"
            }
        });
        const mailOptions  = {
            from: 'helpindiagrow1@gmail.com',
            to: email,
            Suject:'Testing Mail',
            text: 'Name:'+  ' '  + name  + '\n' + 'Email:'  + ' ' + email + '\n' + 'Date:'+ ' ' +date + '\nThank you, your request has been successfully received\n'
        }
        transporter.sendMail(mailOptions,(error , info) => {
            if(error){
                console.log("Error",error)
            }else{
                console.log("Email sent");
                res.status(201).json({
                    status:201,
                    info
                })
            }
        })
    } 
    catch (error) {
        res.status(201).json({
            status:401,
            error
        })
    }
}