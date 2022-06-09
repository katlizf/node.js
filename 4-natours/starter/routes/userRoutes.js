const express = require('express')
const router = express.Router()
const userController = require('./../controllers/userController')


// ROUTES, refactored way of coding the above routes
router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createUser)
router.route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)


module.exports = router