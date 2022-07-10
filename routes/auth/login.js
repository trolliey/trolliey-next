const express = require('express')
const router = express.Router()
const { loginUser } = require('../../controllers/authController')

/**
 * @TODO make emailVerified value in schema true once emails have been bought
 * @swagger
 * /auth/login:
 *    post:
 *      description: login user and created a token
 *    parameters:
 *      - name: email
 *        in: body
 *        description: email of the user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: password
 *        in: body
 *        description: password of user that will be encrypted in db
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *    responses:
 *      '200':
 *        description: Login successfully
 *      '500':
 *        description: Failed to login user
 */
router.post('/',loginUser)

module.exports = router