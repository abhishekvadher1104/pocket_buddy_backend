const routes = require("express").Router();
const {upload} = require('../utils/CloudinaryUtils')

const offerController = require("../controller/OfferController");

routes.post("/addoffer", offerController.addOffer);
routes.get("/getalloffers", offerController.getAllOffers);
routes.post("/addofferwithfile",upload.single('imageURL'), offerController.addOfferWithFile);
routes.get("/getofferbyuserid/:userId", offerController.getAllOffersByUserId);
routes.get('/getofferbyid/:id',offerController.getOfferByOfferId)

module.exports = routes;
