const routes = require("express").Router();

const offerController = require("../controller/OfferController");

routes.post("/addoffer", offerController.addOffer);
routes.get("/getalloffers", offerController.getAllOffers);
routes.post("/addofferwithfile", offerController.addOfferWithFile);
routes.get("/getofferbyuserid/:userId", offerController.getAllOffersByUserId);
routes.get('/getofferbyid/:id',offerController.getOfferByOfferId)

module.exports = routes;
