const nodemailer = require("nodemailer")

const contactus = (req,res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS
        }
      });
    
      var mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `Portfolio - Message from ${req.body.email}`,
        text: `Name : ${req.body.name}`+"\n\n"+req.body.message
      };
    
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
         res.status(400).json({
            message:error
         })
        } else {
            res.status(200).json({
                message:"email sent"
             })
        }
      });
    }
    
module.exports={
    contactus
}      