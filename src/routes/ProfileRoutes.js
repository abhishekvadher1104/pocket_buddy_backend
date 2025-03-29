const routes = require("express").Router();

const profileController = require("../controller/ProfileController");

routes.post("/addprofile", profileController.addProfileDetails);
routes.get("/getprofile/:userId", profileController.getProfileByUserId);
routes.put("/updateprofile/:userId", profileController.updateProfile);

module.exports = routes;
