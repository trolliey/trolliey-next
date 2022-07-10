const express = require("express");
const {
  createAProduct,
  editAProduct,
  getAllProducts,
  deleteAProduct,
  getSingleProduct,
} = require("../../controllers/productController");
const { requireStoreSignIn } = require("../../middleware/require_auth");
const router = express.Router();
const upload = require("../../helpers/multer");

// create a product
// post request
// /api/product/create
router.post(
  "/create",
  requireStoreSignIn,
  upload.array("product_pictures"),
  createAProduct
);

// edit a product
// put request
// /api/product/edit/{productId}
router.put(
  "/edit/:id",
  requireStoreSignIn,
  upload.array("product_pictures"),
  editAProduct
);

// get single product
// get request
// /api/product/single/{productId}
router.get('/single/:id', getSingleProduct)

// get all products
// get request
// /api/product/all
router.get("/all", getAllProducts);

// delete a product
// delete request
// /api/product/delete/{productId}
router.delete("/delete/:id", requireStoreSignIn, deleteAProduct);

module.exports = router;
