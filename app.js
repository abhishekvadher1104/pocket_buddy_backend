const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb://localhost:27017/Royal_learning_25").then(() => {
  console.log("database connected succefully...");
});

const userRoutes = require("./src/routes/UserRoutes");
app.use(userRoutes);

const stateRoutes = require("./src/routes/StateRoutes");
app.use("/state", stateRoutes);

const cityRoutes = require("./src/routes/CityRoutes");
app.use("/city", cityRoutes);

const areaRoutes = require("./src/routes/AreaRoutes");
app.use("/area", areaRoutes);

const offerRoutes = require("./src/routes/OfferRoutes");
app.use("/offer", offerRoutes);

const ratingRoutes = require("./src/routes/RatingRoutes");
app.use("/rating", ratingRoutes);

const profileRoutes = require("./src/routes/ProfileRoutes");
app.use("/profile", profileRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running on port number", PORT);
});
