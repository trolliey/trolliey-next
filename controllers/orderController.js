const Order = require("../models/Order");
const Store = require("../models/Store");
const Products = require("../models/Product");
const User = require("../models/User");

// create an order
// post request
// /api/order/create
exports.createAnOrder = async (req, res) => {
  try {
    const { collect_my_order, method, paying_number } = req.body;

    if (!method) {
      return res
        .status(500)
        .send({ message: "Please select a required method" });
    }
    const all_involved_stores = [];

    const newOrder = new Order({
      ...req.body,
      // @ts-ignore
      user: req.user._id,
      collect_my_order: collect_my_order,
      stores_involved: [],
      method: method,
      paying_number: paying_number,
      status: "pending",
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

    newOrder.stores_involved = all_involved_stores;
    const order = await newOrder.save();
    //editing the reports schema
    // for (let i = 0; i < all_involved_stores.length; i++) {
    //   await Report.findOneAndUpdate(
    //     { store: all_involved_stores[i] },
    //     { $push: { pending_orders: order._id } }
    //   );
    // }
    return res
      .status(200)
      .send({ order: order._id, message: "order created successfully" });
  } catch (error) {
    return res.status(500).send({ message: `${error}` });
  }
};

// get store ordes
exports.getStoreOrders = async (req, res, next) => {
  try {
   
    const _user = req.user;
    const user = await User.findOne({ _id: _user._id });
    const store = await Store.findOne({ _id: user.store });
    if (store) {
      const orders = store.orders
      return res.status(200).send({message: 'Orders Found', orders})
    }
    return res.status(400).send({ message: "Store no longer exists" });
  } catch (error) {
    next(error);
  }
};

// get an order
// get request
// /api/order/single/{orderId}
exports.getASingleOrder = async (req, res) => {
  console.log("get a single order");
};

// edit an order
// put request
// /api/order/edit/{orderId}
exports.editAnOrder = async (req, res) => {
  console.log("edit a single order");
};

// delete an order
// delete request
// /api/order/single/{orderId}
exports.deleteAnOrder = async (req, res) => {
  console.log("get a single order");
};
