const router = require("express").Router();
const multer = require("multer");
const { upload } = require("../utils/CloudinaryUtils");
const userController = require("../controller/UserController");

router.get("/users", userController.getAllUsers);
router.get("/users/restaurantname", userController.getRestroName);
router.delete("/deleteUser/:id", userController.deleteUser);
router.get("/user/:id", userController.findUserByID);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.post("/user/forgotpassword", userController.forgotPassword);
router.post("/user/resetpassword", userController.resetPassword);
router.put(
  "/user/:userId",
  upload.single("profilePic"),
  userController.updateUserDetails
);
module.exports = router;
