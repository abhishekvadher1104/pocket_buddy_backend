const routes = require("express").Router()
const ratingController = require('../controller/RatingController')

routes.post("/addrating",ratingController.addRatings)
routes.get("/getallratingsofoffer/:offerId",ratingController.getAllRatingsOfOffer)
routes.get('/getratingsofuseridandofferid/:userId/:offerId',ratingController.getRatingsByUserIdAndOfferId)
routes.get('/getallratingofuser/:userId',ratingController.fetchAllRatingOfUser);
routes.get('/toprestro',ratingController.topRatedOffers);

module.exports = routes
