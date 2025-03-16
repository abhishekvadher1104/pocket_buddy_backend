const cityModel = require("../models/CityModels");

const addCity = async (req, res) => {
  try {
    const cityAdded = await cityModel.create(req.body);
    res.status(201).json({
      message: "city Added Successfully",
      data: cityAdded,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const getAllCities = async(req,res)=>{
  try {

    const cities = await cityModel.find().populate('stateId')
    
    res.status(200).json({
      message:"cities founded",
      data:cities
    })
  } catch (error) {
    res.status(500).json({
      message:error
    })
  }
}
const getCityByStateId = async (req, res) => {
  try {
    const cities = await cityModel.find({ stateId: req.params.stateId });
    res.status(200).json({
      message: "city found",
      data: cities,
    });
  } catch (err) {
    res.status(500).json({
      message: "city  not found",
    });
  }
};
module.exports = {
  addCity,getAllCities,getCityByStateId
}
