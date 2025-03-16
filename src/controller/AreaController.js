const areaModels = require("../models/AreaModels");

const addArea = async (req, res) => {
  try {
    const savedArea = await areaModels.create(req.body);

    res.status(201).json({
      message: "area saved succefully...",
      data: savedArea,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
const getAllArea = async (req, res) => {
  try {
    const getAreas = await areaModels.find().populate("cityId stateId");
    res.status(200).json({
      message: "area fetched successfully",
      data: getAreas,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
const getAreaByCityId = async (req, res) => {
  try {
    const areas = await areaModels.find({ cityId: req.params.cityId });
    res.status(200).json({
      message: "areas found",
      data: areas,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

module.exports = {
  addArea,
  getAllArea,
  getAreaByCityId
};
