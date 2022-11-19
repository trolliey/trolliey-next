const express = require("express");
const { requireUserSignIn } = require("../../middleware/require_auth");
const router = express.Router();
const Store = require("../../models/Store");
const Orders = require("../../models/Order");
const Products = require("../../models/Product");
var paypal = require("paypal-rest-sdk");

// configure paypal sdk
paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// make rtgs payment
// /api/order/usd
// post request
router.post("/", requireUserSignIn, async (req, res, next) => {
  try {
    const { collect_my_order, method, paying_number, address, city } = req.body;
    const all_involved_stores = [];

    const newOrder = new Orders({
      ...req.body,
      // @ts-ignore
      user: req.user._id,
      collect_my_order: collect_my_order,
      stores_involved: [],
      method: method,
      isPaid: false,
      paying_number: paying_number,
      address: address,
      city: city,
    });

    // decrement quantity of product
    for (let i = 0; i < newOrder.orderItems.length; i++) {
      await Products.findOneAndUpdate(
        { _id: newOrder.orderItems[i]._id },
        { $inc: { countInStock: -1 } }
      );
    }

    // create an array of all involved stores
    for (let i = 0; i < newOrder.orderItems.length; i++) {
      if (all_involved_stores.indexOf(newOrder.orderItems[i].store_id) == -1) {
        all_involved_stores.push(newOrder.orderItems[i].store_id);
      }
    }

    // increment number of times product was bought
    for (let i = 0; i < newOrder.orderItems.length; i++) {
      await Products.findOneAndUpdate(
        { _id: newOrder.orderItems[i]._id },
        { $inc: { times_bought: 1 } }
      );
    }

    // editing the store schema to increse its orders
    for (let i = 0; i < newOrder.orderItems.length; i++) {
      await Store.findOneAndUpdate(
        { _id: newOrder.orderItems[i].store_id },
        {
          $push: {
            orders: {
              order_id: newOrder._id,
              items: newOrder.orderItems.filter(
                (item) => item.store_id === newOrder.orderItems[i].store_id
              ),
              status: "pending",
              createdAt: Date.now(),
            },
          },
        }
      );
    }

    return res
      .status(200)
      .send({ order: order._id, message: "order created successfully" });
  } catch (error) {
    next(error);
  }
});

router.get("/success", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "25.00",
        },
      },
    ],
  };

  // Obtains the transaction details from paypal
  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      //When error occurs when due to non-existent transaction, throw an error else log the transaction details in the console then send a Success string reposponse to the user.
      if (error) {
        console.log(error.response);
        throw error;
      } else {
        console.log(JSON.stringify(payment));
        return res.send("Success");
      }
    }
  );
});

router.get("/cancel", (req, res) => res.send("Cancelled"));

module.exports = router;
