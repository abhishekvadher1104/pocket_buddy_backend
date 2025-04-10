const ratingsSchema = require("../models/RatingModels");

const addRatings = async (req, res) => {
  const { ratings, userId, offerId, review } = req.body;
  console.log("received ", req.body.ratings);

  try {
    const existingRating = await ratingsSchema.findOne({ userId, offerId });
    if (existingRating)
      return res
        .status(400)
        .json({ message: "You have already rated this restaurant offer." });

    const newRating = await ratingsSchema.create({
      ratings,
      userId,
      offerId,
      review,
    });

    res.status(201).json({
      message: "rating added...",
      data: newRating,
    });
    console.log(ratings);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const getRatingsByUserIdAndOfferId = async (req, res) => {
  const { userId, offerId } = req.params;
  const fetchedRating = await ratingsSchema
    .findOne({ userId, offerId })
    .populate("userId");
  if (!fetchedRating) {
    res.status(404).json({
      message: "please give rating",
    });
  }
  res.status(200).json({
    message: "your ratings",
    data: fetchedRating,
  });
};
const getAllRatingsOfOffer = async (req, res) => {
  try {
    const ratings = await ratingsSchema.find({ offerId: req.params.id });
    if (!ratings) {
      res.status(404).json({
        message: "not ratings found.....!!!",
      });
    } else {
      res.status(200).json({
        message: "ratings found",
        data: ratings,
      });
    }
    console.log(ratings);
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  addRatings,
  getAllRatingsOfOffer,
  getRatingsByUserIdAndOfferId,
};
