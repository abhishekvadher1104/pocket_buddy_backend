const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const offerSchema = new mongoose.Schema(
  {
    restroName: {
      type: String,
      required: true,
    },
    offer: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    imageURL:{
      type:String
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
      required: true,
    },
    areaId: {
      type: Schema.Types.ObjectId,
      ref: "area",
    },
    cityId: {
      type: Schema.Types.ObjectId,
      ref: "City",
    },
    stateId: {
      type: Schema.Types.ObjectId,
      ref: "State",
    },
    userId:{
      type:Schema.Types.ObjectId,
      ref:"userModel"
    }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("offer", offerSchema);
