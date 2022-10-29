const Store = require("../models/Store");
const fs = require("fs");
const cloudinary = require("../helpers/cloudinary");
const Product = require("../models/Product");
const slugify = require("../utils/slugify");
const User = require("../models/User");

// create a product
// post request
// /api/product/create
exports.createAProduct = async (req, res) => {
  try {
    const user_id = req.user._id;
    const user = await User.findOne({ _id: user_id });
    const store = await Store.findOne({ _id: user.store });
    // url to hold the image
    const urls = [];

    if (!user_id) {
      return res.status(403).send({ message: "Please login!" });
    }
    if (!user) {
      return res
        .status(403)
        .send({ message: "We could not find your account" });
    }

    if (!store) {
      return res.status(403).send({
        message:
          "We are having troubles verifying your store. Please contact support!",
      });
    }

    if (store.approved) {
      const {
        description,
        title,
        category,
        price,
        discount_price,
        brand,
        countInStock,
        status,
        sku,
        variants,
        currency,
        sub_category,
        time_to_delivery,
      } = req.body;

      if (!description) {
        return res.status(400).send({ message: "Please enter a description" });
      }
      if (!title) {
        return res.status(400).send({ message: "Please enter a title" });
      }
      if (!category) {
        return res.status(400).send({ message: "Please enter a category" });
      }
      if (!price) {
        return res.status(400).send({ message: "Please enter a price" });
      }
      if (!brand) {
        return res.status(400).send({ message: "Please enter a brand" });
      }
      if (!currency) {
        return res.status(400).send({ message: "Please specify a curency" });
      }
      if (!description) {
        return res.status(400).send({ message: "Please enter a description" });
      }

      // check if picture has been changed
      if (req.files.length > 0) {
        // upload images to cloudinary
        const uploader = async (path) =>
          cloudinary.upload(path, "Product-Images");
        const files = req.files;
        for (const file of files) {
          const { path } = file;
          try {
            const newPath = await uploader(path);
            urls.push(newPath);
            fs.unlinkSync(path);
            console.log("image uploaded");
          } catch (error) {
            res
              .status(500)
              .send({ message: `Error uploading images ${error}` });
          }
        }
      }

      const newProduct = new Product({
        title: title,
        slug: slugify(title),
        description: description,
        price: parseFloat(price),
        discount_price: discount_price ? parseFloat(discount_price) : 0,
        pictures: urls,
        brand: brand,
        countInStock: parseInt(countInStock),
        category: category,
        category_slug: slugify(category),
        variants: variants ? variants : [],
        store_id: store._id,
        sku: sku,
        status: status,
        currency_type: currency,
        sub_category: sub_category,
        time_to_deliver: time_to_delivery,
      });

      const saved_product = await newProduct.save();
      return res.status(200).send({
        message: "Product saved successfully",
        product_id: saved_product._id,
      });
    } else {
      return res
        .status(403)
        .send({ message: "Your store is not approved yet" });
    }
  } catch (error) {
    return res.status(500).send({ message: `error: - ${error}` });
  }
};

// edit a product
// put request
// /api/product/edit/{productId}
exports.editAProduct = async (req, res) => {
  try {
    const { id } = req.params; // the id of the product
    let product = await Product.findOne({ _id: id });
    // url to hold the image
    const urls = [];

    const {
      description,
      title,
      category,
      price,
      discount_price,
      brand,
      countInStock,
      status,
      sku,
      variants,
      currency,
      sub_category,
      time_to_delivery,
      currency_type,
    } = req.body;

    if (!description) {
      return res.status(400).send({ message: "Enter a description" });
    }
    if (!title) {
      return res.status(400).send({ message: "Enter a title" });
    }
    if (!category) {
      return res.status(400).send({ message: "Select a category" });
    }
    if (!discount_price) {
      return res.status(400).send({ message: "Enter a discount price" });
    }
    if (!brand) {
      return res.status(400).send({ message: "Enter a brand" });
    }
    if (!status) {
      return res.status(400).send({ message: "Please select a status" });
    }
    if (!currency_type) {
      return res.status(400).send({ message: "Please select a currency" });
    }

    // check if picture has been changed
    // if (req.body.product_pictures.length > 0) {
    //   // upload images to cloudinary
    //   const uploader = async (path) =>
    //     cloudinary.upload(path, "Product-Images");
    //   const files = req.body.product_pictures;
    //   for (const file of files) {
    //     const { path } = file;
    //     try {
    //       const newPath = await uploader(path);
    //       urls.push(newPath);
    //       fs.unlinkSync(path);
    //     } catch (error) {
    //       return res.status(500).send({ message: `Error uploading images ${error}` });
    //     }
    //   }
    //   console.log("image uploaded");
    // }

    product.title = title;
    product.description = description;
    product.slug = slugify(title);
    product.category = category;
    product.price = price;
    product.discount_price = discount_price;
    product.brand = brand;
    product.countInStock = countInStock;
    product.status = status;
    product.sku = sku;
    product.variants = variants;
    product.currency = currency;
    product.currency_type = currency_type;
    product.sub_category = sub_category;
    product.time_to_deliver = time_to_delivery;
    product.pictures = urls.length > 0 ? urls[0] : product.pictures;

    await product.save();
    return res.status(200).send({ message: "Product has been updated" });
  } catch (error) {
    return res.status(500).send({ message: `${error}` });
  }

  
};

// get single product
// get request
// /api/product/single/{productId}
exports.getSingleProduct = async (req, res, next) => {
  try {
    const {id} = req.params
    const product = await Product.findById(id);
    const store = await Store.findOne({_id: product.store_id})
    const store_info = {
      store_id: store._id,
      company_name: store.company_name,
      logo: store.logo,
      banner: store.banner
    }
    return res.status(200).send({product, store_info});
  } catch (error) {
    next(error)
  }
};

// get all products
// get request
// /api/product/all
exports.getAllProducts = async (req, res) => {
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
};

// delete a product
// delete request
// /api/product/delete/{productId}
exports.deleteAProduct = async (req, res) => {
  try {
    const user_id = req.user._id;
    const { id } = req.params; // the id of the product
    const store = await Store.findOne({ user: user_id });
    const product = await Product.findOne({ _id: id });
    if (!store) {
      return res.status(404).send({ message: "Store does not exist" });
    }
    // check if user is allowed to delte the account
    if (
      store.approved ||
      store._id === product.store_id.toString() ||
      req.user.role === "admin"
    ) {
      // delte the user and capture the error
      Product.findOneAndRemove({ _id: req.params.id }, (err) => {
        if (err) {
          return res.send({ message: `${error} ` });
        }
        return res.send({ message: "Product deleted successfully!" });
      });
    } else {
      res.status(403).send({ message: "You are not allowed" });
      return;
    }
  } catch (error) {
    return res.status(500).send({ message: `${error}` });
  }
};
