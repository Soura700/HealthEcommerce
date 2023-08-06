
// const nodemailer = require("nodemailer");

// const sendMail = async (req,res)=>{


//     let transporter = nodemailer.createTransport({
//         service:'Gmail',
//         auth: {
//             user: 'sourabose2004@gmail.com',
//             pass: 'uzixjeiuaawureeq'
//         }
//     });
//     // res.send("I am sending mail");

//     let info = await transporter.sendMail({
//         from: "sourabose2004@gmail.com",
//         to:"sourabose2004@gmail.com",
//         subject:"Hello",
//         text:"Hello guys",
//     });
    
//     // console.log(info.messageId);
//     // res.send(info);
// }



const nodemailer = require("nodemailer");


const sendMail = async (sendermail,text)=>{


    let transporter = nodemailer.createTransport({
        service:'Gmail',
        auth: {
            user: 'sourabose2004@gmail.com',
            pass: 'uzixjeiuaawureeq'
        }
    });
    // res.send("I am sending mail");

    let info = await transporter.sendMail({
        from: sendermail,
        to:"sourabose2004@gmail.com",
        subject:"Password Reset Link",
        text:text,
    });

    
    // console.log(info.messageId);
    // res.send(info);
}


module.exports = sendMail;