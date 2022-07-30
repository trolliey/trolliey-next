const express = require('express');
const { editUserInfo, delteUser, getSingleUser } = require('../../controllers/userController');
const upload = require('../../helpers/multer');
const { requireUserSignIn } = require('../../middleware/require_auth');
const router = express.Router()

/**
 * @swagger
 * /user/edit/{userId}:
 *    put:
 *      summary: edit user information
 *      description: returns the user that has been edited from the database
 *    parameters:
 *      - name : old_password
 *      - in: body
 *        description: the old password of the user 
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name: new_password
 *      - in: body
 *        description: the new password of the user
 *        required: true
 *        schema:
 *          type: string
 *          format: string
 *      - name : userId
 *      - in : path
 *        description: the user id of the user from the database
 *    responses:
 *      '200':
 *        description: User edited sucessfully
 *      '500':
 *        description: Failed to edit user
 */
router.put('/edit/:id',requireUserSignIn,upload.array('profile_picture'), editUserInfo)

// get single user
// /api/user/single/:id
// get request
router.get('/single/:id',getSingleUser)

/**
 * @swagger
 * /user/delete/{userId}:
 *    delete:
 *      summary: delete user using user id
 *      description: use to delete user info
 *    parameters:
 *      - name: userId
 *      - in: path
 *        description: the id of the user to be deleted
 *    responses:
 *      '200':
 *        description: User deleted sucessfully
 *      '500':
 *        description: Failed to delete user
 */
router.delete('/delete/:id', requireUserSignIn, delteUser)

module.exports = router