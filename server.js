const express = require ('express')
const app= express()
const path = require('path');
var nodemailer = require('nodemailer');
const port = process.env.PORT || 4000;
app.use(express.json())
require('dotenv').config()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 


app.post('/email-send', ( req , res ) => {
    const {emailTo, message}=req.body;
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD
        }
    });
      
      var mailOptions = {
        from: process.env.EMAIL,
        to: emailTo,
        subject: 'Sending Email using Node.js',
        text: message
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
            res.json({success:false})

        } else {
            console.log('Email sent: ' + info.response);
            res.json({success:true})

        }
    });
});
app.listen( port , () => console.log ( ` Example app listening on port ${port} ! ` ) );