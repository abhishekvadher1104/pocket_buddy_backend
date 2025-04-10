const routes = require("express").Router()
const ratingController = require('../controller/RatingController')

routes.post("/addrating",ratingController.addRatings)
routes.get("/getallratingsofoffer/:id",ratingController.getAllRatingsOfOffer)
routes.get('/getratingsofuseridandofferid/:userId/:offerId',ratingController.getRatingsByUserIdAndOfferId)

module.exports = routes


