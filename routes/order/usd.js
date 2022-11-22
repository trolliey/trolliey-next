const express = require("express");
const { requireUserSignIn } = require("../../middleware/require_auth");
const router = express.Router();
const Store = require("../../models/Store");
const Orders = require("../../models/Order");
const Products = require("../../models/Product");
const Order = require("../../models/Order");

// make rtgs payment
// /api/order/usd
// post request
router.post("/", requireUserSignIn, async (req, res, next) => {
  try {
    const { collect_my_order, method, paying_number, address, city, orderId } = req.body;
    const all_involved_stores = [];

    const newOrder = new Orders({
      ...req.body,
      // @ts-ignore
      user: req.user._id,
      collect_my_order: collect_my_order,
      stores_involved: [],
      method: 'USD',
      isPaid: false,
      paying_number: paying_number,
      address: address,
      city: city,
      orderId: orderId
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

    const order = await Order.save()

    return res
      .status(200)
      .send({ order: order._id, message: "order created successfully" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
