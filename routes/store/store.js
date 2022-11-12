const express = require("express");
const {
  createAStore,
  editAStore,
  deleteAStore,
  getAStore,
  getAStoreProducts,
  getAllStores,
  approveAStore,
} = require("../../controllers/storeControllers");
const upload = require("../../helpers/multer");
const {
  requireUserSignIn,
  requireStoreSignIn,
  requireAdminSignIn,
} = require("../../middleware/require_auth");
const router = express.Router();

/**
 * @swagger
 * /store/create:
 *    post:
 *      summary: apply for a store
 *      description: apply for a store and wait for approval from admins
 *    parameters:
 *      - name: first_name
 *      - in: body
 *        description: the first name of user who aplplied to the store
 *      - name: last_name
 *      - in: body
 *        description: the last name of the user who applied to the store
 *    responses:
 *      '200':
 *        description: User deleted sucessfully
 *      '500':
 *        description: Failed to delete user
 */
router.post("/create", requireUserSignIn, createAStore);

// get store products
router.get('/products', requireStoreSignIn, getAStoreProducts )

/**
 * @swagger
 * /store/create/{storeId}:
 *    put:
 *      summary: edit store
 *      description: edit the details of the store for both the user and the admin
 *    parameters:
 *      - name: storeId
 *      - in: path
 *        description: the id of the store to be edited
 *      - name: last_name
 *      - in: body
 *        description: the last name of the user who applied to the store
 *    responses:
 *      '200':
 *        description: User deleted sucessfully
 *      '500':
 *        description: Failed to delete user
 */
router.put(
  "/edit/:id",
  requireStoreSignIn,
  upload.array("store_picture"),
  editAStore
);

/**
 * @swagger
 * /store/details/{storeId}:
 *    get:
 *      summary: get details of store
 *      description: get details of the store for the store owner ans the admin and the user
 *    parameters:
 *      - name: storeId
 *      - in: path
 *        description: the id of the store to be edited
 *    responses:
 *      '200':
 *        description: User deleted sucessfully
 *      '500':
 *        description: Failed to delete user
 */
router.get("/details", requireStoreSignIn, getAStore);

/**
 * @swagger
 * /store/delete/{storeId}:
 *    delete:
 *      summary: delete of store
 *      description: delete store, only for the admin and the store owner
 *    parameters:
 *      - name: storeId
 *      - in: path
 *        required: true
 *        description: the id of the store to be edited
 *      - name: last_name
 *      - in: body
 *        description: the last name of the user who applied to the store
 *    responses:
 *      '200':
 *        description: User deleted sucessfully
 *      '500':
 *        description: Failed to delete user
 */
router.delete("/delete/:id", requireStoreSignIn, deleteAStore);


// get all stores
//  get request
// /api/store/all
router.get('/all', getAllStores)


// put action on a store
//  put request
// /api/store/action
router.put('/action',requireAdminSignIn, approveAStore)

module.exports = router;
