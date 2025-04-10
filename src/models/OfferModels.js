const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ratingSchema = require('../models/RatingModels')

const offerSchema = new mongoose.Schema(
  {
    offer: {
      type: String,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    startDate: {
      type: Date,
      // required: true,
    },
    endDate: {
      type: Date,
      // required: true,
    },
    latitude: {
      type: Number,
      // required: true,
    },
    longitude: {
      type: Number,
      // required: true,
    },
    imageURL: {
      type: String,
    },
    foodType: {
      enum: [
        "gujarati",
        "punjabi",
        "chinese",
        "southindian",
        "pavbhaji",
        "italian",
      ],
      type: String,
      // required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "userModel",
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("offer", offerSchema);
