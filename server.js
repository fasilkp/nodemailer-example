const express = require ('express')
const app= express()
const path = require('path');
var nodemailer = require('nodemailer');
const port = process.env.PORT || 4000;
app.use(express.json())
require('dotenv').config()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(__dirname));
app.get('/', ( req , res ) =>{
        res.sendFile(path.join(__dirname, '/index.html'));
} );
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
        html:`<h1 align="center">${message}</h1>`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
            res.send("<br><h1 align='center'>Message send failed</h1>")

        } else {
            console.log('Email sent: ' + info.response);
            res.send("<br><h1 align='center'>Message send Successfull</h1>")

        }
    });
});
app.listen( port , () => console.log ( ` Example app listening on port ${port} ! ` ) );