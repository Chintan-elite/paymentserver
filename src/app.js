const express = require("express")
const app = express()
const PORT = 3000
const cors = require("cors")
const Razorpay = require('razorpay')

app.use(cors())

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

app.listen(PORT,()=>{
    console.log("server running on port : "+PORT);
})