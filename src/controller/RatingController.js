const ratingsSchema = require("../models/RatingModels");

const addRatings = async (req, res) => {
  const { rating, userId, id, review } = req.body;
  console.log("received ", req.body.rating);

  try {
    const existingRating = await ratingsSchema.findOne({ userId, offerId: id });

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.review = review;
      const updatedRating = await existingRating.save();

      return res.status(200).json({
        message: "Rating updated successfully",
        data: updatedRating,
      });
    }

    const newRating = await ratingsSchema.create({
      rating,
      userId,
      offerId: id,
      review,
    });

    res.status(201).json({
      message: "Rating added successfully",
      data: newRating,
    });
  } catch (error) {
    console.error("Error adding/updating rating:", error);
    res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

const mongoose = require("mongoose");
const getRatingsByUserIdAndOfferId = async (req, res) => {
  const { userId, offerId } = req.params;

  try {
    const fetchedRating = await ratingsSchema
      .findOne({
        userId: new mongoose.Types.ObjectId(userId),
        offerId: new mongoose.Types.ObjectId(offerId),
      })
      .populate("userId");

    if (!fetchedRating) {
      return res.status(404).json({
        message: "please give rating",
      });
    }

    return res.status(200).json({
      message: "your ratings",
      data: fetchedRating,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

const fetchAllRatingOfUser = async (req, res) => {
  try {
    const getAllRatingsOfUser = await ratingsSchema
      .find({
        userId: req.params.userId,
      })
      .populate("offerId")
      .populate("userId");

    if (!getAllRatingsOfUser || getAllRatingsOfUser.length === 0) {
      return res.status(404).json({ message: "Ratings not found!" });
    }

    res.status(200).json({
      message: "Ratings given by you...",
      data: getAllRatingsOfUser,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server Error",
    });
  }
};

const getAllRatingsOfOffer = async (req, res) => {
  try {
    const ratings = await ratingsSchema
      .find({ offerId: req.params.offerId })
      .populate("offerId")
      .populate("userId");
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
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

const topRatedOffers = async (req, res) => {
  try {
    const averages = await ratingsSchema.aggregate([
      {
        $group: {
          _id: "$offerId",
          averageRating: { $avg: "$rating" },
        },
      },
      {
        $match: {
          averageRating: { $gte: 4 },
        },
      },
    ]);

    const topOfferIds = averages.map((item) => item._id);

    const offers = await ratingsSchema
      .find({ offerId: { $in: topOfferIds } })
      .populate({
        path: "offerId",
        select: "offer description imageURL startDate endDate", 
      })
      .populate("userId");

    res.status(200).json({
      message: "Found top rated offers",
      data: [{ averages, offers }],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};



module.exports = {
  addRatings,
  getAllRatingsOfOffer,
  getRatingsByUserIdAndOfferId,
  fetchAllRatingOfUser,
  topRatedOffers
};
