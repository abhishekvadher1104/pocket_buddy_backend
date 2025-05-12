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

const offerRoutes = require("./src/routes/OfferRoutes");
app.use("/offer", offerRoutes);

const ratingRoutes = require("./src/routes/RatingRoutes");
app.use("/rating", ratingRoutes);

const wishRoutes = require("./src/routes/wishListRoutes");
app.use("/wishlist", wishRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("server is running on port number", PORT);
});
