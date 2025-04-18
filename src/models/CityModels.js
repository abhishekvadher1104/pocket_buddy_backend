const mongoose  = require('mongoose')
const Schema = mongoose.Schema;

const citySchema = new mongoose.Schema({
  name:{
    type:String,
    required:true,
    unique:true
  },
  stateId:{
    type:Schema.Types.ObjectId,
    ref:"State"
  }
})

module.exports = mongoose.model('City',citySchema)