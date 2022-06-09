const express = require('express')
const router = express.Router()
const tourController = require('./../controllers/tourController')


// MIDDLEWARE
router.param('id', tourController.checkId)


// ROUTES, refactored way of coding the above routes
router.route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.createTour)
router.route('/:id')
    .get(tourController.getTour)
    .patch(tourController.updateTour)
    .delete(tourController.deleteTour)


module.exports = router