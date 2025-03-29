const routes = require("express").Router()
const ratingController = require('../controller/RatingController')

routes.post("/addrating",ratingController.addRatings)
routes.get("/getrating/:restroId",ratingController.getRatingsByRestroId)
routes.get("/getallrestroratings",ratingController.getAllRestroRating)

module.exports = routes


