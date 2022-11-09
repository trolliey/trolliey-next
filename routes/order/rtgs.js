const express = require("express");
const { requireUserSignIn } = require("../../middleware/require_auth");
const router = express.Router();
const { Paynow } = require("paynow");

// Create instance of Paynow class
let paynow = new Paynow(
  process.env.PAYNOW_INTEGRATION_ID,
  process.env.PAYNOW_INTEGRATION_KEY
);

// Set return and result urls
paynow.resultUrl = "https://trolliey-backend.herokuapp.com/api/order/rtgs/result";
paynow.returnUrl = "https://trolliey-backend.herokuapp.com/api/order/rtgs/return";

// Set return and result urls
// paynow.resultUrl = "http://192.168.206.150:5000/api/order/rtgs/result";
// paynow.returnUrl = "http://192.168.206.150:5000/api/order/rtgs/return";

// regex for phone numbers
const phone_number_regex = /^(\\d{4}[- .]?)(\\d{3}[- .]?)(\\d{3})$/;
const phone_number_regex_2 =
  /^(\\+?\\d{3}[- .]?)(\\d{3}[- .]?)(\\d{3}[- .]?)(\\d{3})$/;

// make rtgs payment
// /api/order/usd
// post request
router.post("/payment", requireUserSignIn, async (req, res, next) => {
  try {
    const { collect_my_order, method, paying_number } = req.body;

    if (!method) {
      return res
        .status(500)
        .send({ message: "Please select a required method" });
    } else {
      //validate phone numbers if they gave the correct format
      // if(!phone_number_regex.test(paying_number) || !phone_number_regex_2.test(paying_number)){
      //   return res.status(500).send({message: 'Please enter a valid phone number'})
      // }

      // create a payment with the name of trolliet
      let payment = paynow.createPayment(
        "Invoice from Trolliey Retail",
        // @ts-ignore
        req.user.email
      );

      // add items to payment
      newOrder.orderItems.forEach((item) => {
        payment.add(item.title, item.price)
      })
    //   payment.add("item name", 1);

      const response = await paynow.sendMobile(payment, paying_number, method);
      if (response && response.success) {
        let instructions = response.instructions;
        let pollUrl = response.pollUrl;
        let status = await paynow.pollTransaction(pollUrl);
        if (status.status === "paid") {
          res.json("Yay! Transaction was paid for");
          console.log("succcessful transaction");
        } else if (status.status === "cancelled") {
          //   res.json("Why you no pay?");
          console.log("cancelled");
        }
      } else {
        console.log("Error", response.error);
        res.json({message: response.error});
      }
    }
  } catch (error) {
    next(error);
  }
});

// reuls
router.post("/result", (req, res) => {
  try {
    console.log("from result", req.body);
  } catch (error) {
    next(error);
  }
});

// reuls
router.post("/return", (req, res) => {
  try {
    console.log("from return ", req.body);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
