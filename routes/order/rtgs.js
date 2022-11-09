const express = require("express");
const { requireUserSignIn } = require("../../middleware/require_auth");
const router = express.Router();
const { Paynow } = require("paynow")

// Create instance of Paynow class
let paynow = new Paynow(
  process.env.PAYNOW_INTEGRATION_ID,
  process.env.PAYNOW_INTEGRATION_KEY
);

// Set return and result urls
paynow.resultUrl = "https://trolliey-backend.herokuapp.com/api/rtgs/result";
paynow.returnUrl = "https://trolliey-backend.herokuapp.com/api/rtgs/return";

// regex for phone numbers
const phone_number_regex = /^(\\d{4}[- .]?)(\\d{3}[- .]?)(\\d{3})$/
const phone_number_regex_2 =
  /^(\\+?\\d{3}[- .]?)(\\d{3}[- .]?)(\\d{3}[- .]?)(\\d{3})$/

// make rtgs payment
// /api/order/usd
// post request
router.post("/payment", requireUserSignIn, async (req, res, next) => {
  try {

    const { collect_my_order, method, paying_number } = req.body

    if(!method){
        return res
        .status(500)
        .send({ message: 'Please select a required method' })
    }else{
         //validate phone numbers if they gave the correct format
        // if(!phone_number_regex.test(paying_number) || !phone_number_regex_2.test(paying_number)){
        //   return res.status(500).send({message: 'Please enter a valid phone number'})
        // }

        // create a payment with the name of trolliet
        let payment = paynow.createPayment(
            'Invoice from Trolliey Retail',
            // @ts-ignore
            req.user.email
          )

          // add items to payment
        // newOrder.orderItems.forEach((item: any) => {
        //   payment.add(item.title, item.price)
        // })
        payment.add('item name', 1)

        // initialise the payment
        paynow
          .sendMobile(payment, paying_number, method)
          .then(async function (response) {
            if (response.success) {
              // These are the instructions to show the user.
              // Instruction for how the user can make payment
              // let instructions = response.instructions // Get Payment instructions for the selected mobile money method
              let pollUrl = response.pollUrl

              // return instunction to user
              // res.status(200).send({
              //   message: 'Transaction in process ',
              //   response: response,
              // })

              var keepCalling = true
              setTimeout(function () {
                keepCalling = false
              }, 15000)

              while (keepCalling) {
                let status = await paynow.pollTransaction(pollUrl)
                console.log('error from initializer', status)
                // if (status.status) {
                //   console.log('we are here')
                //   return res.json({ message: 'Yay! Transaction was paid for' })
                // } else {
                //   console.log('error is here')
                //   return res.json({ error: 'Why you no pay?' })
                // }
              }

              // console.log(instructions)
            } else {
              // could not inititalise transaction
              console.log('error from initializer', response.error)
              return res.status(500).send({ message: response.error })
            }
          })
          .catch((ex) => {
            // send error message to client
            console.log('Your application has broken an axle', ex)
            return res
              .status(500)
              .send({ message: 'Could not instantiate transation.Try again' })
          })
    }

  } catch (error) {
    next(error);
  }
});

// reuls
router.post('/result', (req, res)=>{
    try {
        console.log('from result', req.body)
    } catch (error) {
        next(error)
    }
})

// reuls
router.post('/return', (req, res)=>{
    try {
        console.log('from return ', req.body)
    } catch (error) {
        next(error)
    }
})

module.exports = router;
