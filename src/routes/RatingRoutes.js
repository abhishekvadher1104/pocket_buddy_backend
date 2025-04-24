const routes = require("express").Router()
const ratingController = require('../controller/RatingController')

routes.post("/addrating",ratingController.addRatings)
routes.get("/getallratingsofoffer/:offerId",ratingController.getAllRatingsOfOffer)
routes.get('/getratingsofuseridandofferid/:userId/:offerId',ratingController.getRatingsByUserIdAndOfferId)
routes.get('/getallratingofuser/:userId',ratingController.fetchAllRatingOfUser);

module.exports = routes
