const router = require("express").Router();

const userController = require("../controller/UserController");

router.get("/users", userController.getAllUsers);
// router.post("/adduser", userController.addUser);
router.delete("/deleteUser/:id", userController.deleteUser);
router.get("/user/:id", userController.findUserByID);
router.post("/signup", userController.signup);
router.post("/login", userController.login);

module.exports = router;
