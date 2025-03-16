const stateModel = require("../models/StateModels");

const addState = async (req, res) => {
  try {
    const stateAdded = await stateModel.create(req.body);

    res.status(201).json({
      message: "State Added...",
      data: stateAdded,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
const getAllStates = async (req, res) => {
  try {
    const states = await stateModel.find();
    res.json({
      message: "states fetched successfully..",
      data: states,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

module.exports = {
  addState,
  getAllStates,
};
