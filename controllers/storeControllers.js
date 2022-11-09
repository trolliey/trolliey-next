const Store = require("../models/Store");
const User = require("../models/User");
const moment = require("moment");
const cloudinary = require("../helpers/cloudinary");
const fs = require("fs");
const Product = require("../models/Product");

// create a store.
// post request
// /api/store/create
exports.createAStore = async (req, res) => {
  try {
    const _user = req.user;

    const {
      first_name,
      last_name,
      email,
      phone_number,
      mobile_number,
      company_name,
      business_category,
      company_website,
      about,
      facebook,
      instagram,
      twitter,
      busines_owner_name,
      business_owner_email,
      number_of_uniqe_products,
      stock_handle,
      physical_store,
      physical_store_address,
      notification_type,
    } = req.body.values;
    const agreed = req.body.agreed;
    const brands = req.body.brands;

    // check if user agreed to terms and conditions
    if (!agreed) {
      return res.status(400).send({
        message: "All applicants must agree to our terms and conditions",
      });
    }

    if (!company_name) {
      return res.status(400).send({ message: "Your company needs a name" });
    }
    if (!phone_number) {
      return res
        .status(400)
        .send({ message: "Your company phone number is needed!" });
    }
    if (!email) {
      return res
        .status(400)
        .send({ message: "Your company phone number is needed!" });
    }

    // check if user alreadu has a store
    const store_exists = await Store.findOne({ user: _user._id });
    if (store_exists) {
      return res
        .status(422)
        .send({ message: "We allow only one store per account" });
    }

    // checking if the name is already taken
    const name_exists = await Store.findOne({ company_name: company_name });
    if (name_exists) {
      return res.status(400).send({
        message:
          "Name already in use. If the name belongs to you contact our support team",
      });
    }

    const newStore = new Store({
      first_name,
      last_name,
      email,
      phone_number,
      mobile_number,
      company_name,
      business_category,
      company_website,
      about,
      facebook,
      instagram,
      twitter,
      busines_owner_name,
      business_owner_email,
      number_of_uniqe_products,
      stock_handle,
      physical_store,
      physical_store_address,
      next_payment_date: moment().add(6, "months").calendar(),
      brands,
      user: _user._id,
    });

    const saved_store = await newStore.save();
    if (saved_store) {
      // give user the store address
      const user = await User.findOne({ _id: _user._id });
      user.store = saved_store._id;
      // save documents
      await user.save();
      return res.status(201).json({ message: "Store Created!" });
    }
    return res
      .status(500)
      .json({ error: "Error creating store, Try again later!" });
  } catch (error) {
    return res.status(500).send({ message: `${error} ` });
  }
};

// create a store.
// post request
// /api/store/products
exports.getAStoreProducts = async (req, res) => {
  try {
    const _user = req.user; // info of the store
    const user = await User.findOne({ _id: _user._id });

    try {
      // handling store schema
      let query = [
        {
          $lookup: {
            from: "stores",
            let: { store: "store" },
            pipeline: [{ $limit: 1 }],
            as: "creator",
          },
        },
        { $unwind: "$creator" },
      ];

      query.push({
        $match: {
          store_id: user.store,
        },
      });

      // handling search queries
      if (req.query.keyword && req.query.keyword != "") {
        query.push({
          //@ts-ignore
          $match: {
            $or: [
              { title: { $regex: req.query.keyword, $options: "i" } },
              { description: { $regex: req.query.keyword, $options: "i" } },
              {
                "creator.company_name": {
                  $regex: req.query.keyword,
                  $options: "i",
                },
              },
              { category: { $regex: req.query.keyword, $options: "i" } },
            ],
          },
        });
      }

      // category wise filtration // should send slug
      if (req.query.category) {
        query.push({
          //@ts-ignore
          $match: {
            category_slug: req.query.category,
          },
        });
      }

      let total = await Product.countDocuments(query);
      //@ts-ignore
      let page = req.query.page ? parseInt(req.query.page) : 1;
      //@ts-ignore
      let perPage = req.query.perPage ? parseInt(req.query.perPage) : 16;
      let skip = (page - 1) * perPage;

      query.push({
        //@ts-ignore
        $skip: skip,
      });
      query.push({
        //@ts-ignore
        $limit: perPage,
      });

      // exclude some fields
      query.push({
        //@ts-ignore
        $project: {
          "creator.orders": 0,
          "creator.stock_handle": 0,
          "creator.store_address": 0,
          "creator.total_amount": 0,
          "creator.amount_to_be_paid": 0,
          "creator.is_paid": 0,
          "creator.next_payment_date": 0,
          "creator.notification_type": 0,
          "creator.facebook": 0,
          "creator.instagram": 0,
          "creator.twitter": 0,
        },
      });

      // handling sort
      if (req.query.sortBy && req.query.sortOrder) {
        var sort = {};
        //@ts-ignore
        sort[req.query.sortBy] = req.query.sortOrder == "asc" ? 1 : -1;
        query.push({
          //@ts-ignore
          $sort: sort,
        });
      } else {
        query.push({
          //@ts-ignore
          $sort: { createdAt: -1 },
        });
      }

      let products = await Product.aggregate(query);

      return res.status(200).send({
        message: "Products fetched sucessfully",
        length: products.length,
        meta: {
          total: total,
          currentPage: page,
          perPage: perPage,
          totalPages: Math.ceil(total / perPage),
        },
        products: products,
      });
    } catch (error) {
      return res.status(500).send({ message: `${error}` });
    }
  } catch (error) {
    return res.status(500).send({ message: `${error}` });
  }
};

// edit a store.
// put request
// /api/store/edit/{storeId}
exports.editAStore = async (req, res) => {
  try {
    // urls to hold the image
    const urls = [];
    const { id } = req.params; // the store id
    const user_id = req.user._id; // the id of the logged in user
    const user = await User.findOne({ _id: user_id });
    const store = await Store.findOne({ _id: id });
    if (user.store === id || user.role === "admin") {
      const {
        first_name,
        last_name,
        email,
        phone_number,
        mobile_number,
        company_name,
        business_category,
        company_website,
        about,
        facebook,
        instagram,
        twitter,
        busines_owner_name,
        business_owner_email,
        number_of_uniqe_products,
        stock_handle,
        physical_store,
        physical_store_address,
        notification_type,
      } = req.body;

      if (req.files.length > 0) {
        // upload images to cloudinary
        const uploader = async (path) =>
          cloudinary.upload(path, "Store-Profiles");
        const files = req.files;
        for (const file of files) {
          const { path } = file;
          try {
            const newPath = await uploader(path);
            urls.push(newPath);
            fs.unlinkSync(path);
          } catch (error) {
            res
              .status(500)
              .send({ message: `Error uploading images ${error}` });
          }
        }
        console.log("image uploaded");
      }

      store.first_name = first_name;
      store.last_name = last_name;
      store.company_name = company_name;
      store.email = email;
      store.logo = urls.length > 0 ? urls[0] : store.logo;
      store.phone_number = phone_number;
      store.mobile_number = mobile_number;
      store.business_category = business_category;
      store.company_website = company_website;
      store.about = about;
      store.facebook = facebook;
      store.instagram = instagram;
      store.twitter = twitter;
      store.busines_owner_name = busines_owner_name;
      store.business_owner_email = business_owner_email;
      store.number_of_uniqe_products = number_of_uniqe_products;
      store.stock_handle = stock_handle;
      store.physical_store = physical_store;
      store.physical_store_address = physical_store_address;
      store.notification_type = notification_type;

      await store.save();
      return res.status(200).send({ message: "Store info has been updated" });
    } else {
      return res
        .status(403)
        .send({ message: "You not authorised to perfom that action" });
    }
    // res.send(`${user.store} --- ${id}`);
  } catch (error) {
    return res.status(500).send({ message: `${error} ` });
  }
};

// get a store and details
// get request
// /api/store/details
exports.getAStore = async (req, res) => {
  const { id } = req.params; // the store id
  const _user = req.user; // the id of the user who visited the store
  try {
    const store = await Store.findOne({ email: _user.email });
    if (store) {
      const number_of_products = await Product.countDocuments({
        store_id: store._id,
      });
      return res
        .status(200)
        .send({ store_info: store, number_of_products: number_of_products });
    }
    return res.status(404).send({ message: "Store was not found" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: `${error}` });
  }
};

// delete a store.
// delete request
// /api/store/delete/{storeId}
exports.deleteAStore = async (req, res) => {
  const { id } = req.params; // the id of the store
  const store = await Store.findOne({ _id: id });
  if (!store) {
    return res.status(404).send({ message: "Store does not exist" });
  }
  // check if user is allowed to delte the account
  if (req.user._id === store.user || req.user.role === "admin") {
    // delte the user and capture the error
    Store.findOneAndRemove({ _id: req.params.id }, (err) => {
      if (err) {
        return res.send({ message: `${error} ` });
      }
      return res.send({ message: "Account deleted successfully!" });
    });
  } else {
    res.status(403).send({ message: "You are not allowed" });
    return;
  }
};
