const express = require("express");
const { registerUser } = require("../../controllers/authController");
const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *    post:
 *      description: Use to insert or register a new user
 *    parameters:
 *      - email: email
 *        in: body
 *        description: email of the user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - password: password
 *        in: body
 *        description: password of user that will be encrypted in db
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - role: role
 *        in: body
 *        description: the role of the user, either admin, owner, user
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: User registered sucessfully
 *      '500':
 *        description: Failed to register user
 */
router.post("/", registerUser);

module.exports = router;
