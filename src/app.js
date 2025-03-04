const express = require("express")
const app = express()
const PORT = 3000
const cors = require("cors")
const Razorpay = require('razorpay')
var nodemailer = require('nodemailer');

app.use(cors())
app.use(express.json())
app.get("/pay",(req,resp)=>{

    const amt =Number(req.query.amt)

    var instance = new Razorpay({ key_id: 'rzp_test_pv6FbtEGoD0n4P', key_secret: 'iladq0iIJ4h3mt2LyxAalTuK' })

    var options = {
        amount: amt*100,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        receipt: "order_rcptid_11"
      };
      instance.orders.create(options, function(err, order) {
        resp.send(order)
      });


})

app.post("/mail",(req,resp)=>{

  
  

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chintan.tops@gmail.com',
      pass: 'zotp msxt cvrk sgyz'
    }
  });


  var mailOptions = {
    from: 'chintan.tops@gmail.com',
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
     resp.send(error);
    } else {
      resp.send('Email sent: ' + info.response);
    }
  });

})




app.listen(PORT,()=>{
    console.log("server running on port : "+PORT);
})